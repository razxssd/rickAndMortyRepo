import {CharacterPageState} from "./interfaces";
import {CharacterEnriched} from "../../interfaces/character";
import {Location} from "../../interfaces/location";
import {Episode} from "../../interfaces/episode";

/**
 * Initial state for the character page.
 */
export const initialState: CharacterPageState = {
  characters: [],
  locations: [],
  episodes: [],
  selectedCharacter: null,
  pagination: {
    next: '',
    prev: ''
  },
  isPageLoading: true
}

/**
 * Adds locations to an array of enriched characters based on location IDs.
 *
 * @param {Object} params - The parameters object.
 * @param {Location[]} params.locations - An array of locations to search for.
 * @param {CharacterEnriched[]} params.characters - An array of enriched characters to update.
 * @returns {CharacterEnriched[]} - An array of characters with locations added.
 */
export const addLocationToCharacters = ({locations = [], characters = []}: {
  location: Location[],
  characters: CharacterEnriched[]
}) => {
  return characters.map(character => {
    const originUrlSplit = character.location.url.split('/')
    const locationId = originUrlSplit[originUrlSplit.length - 1]
    const characterLocation = locations.find(location => location.id.toString() === locationId.toString());
    return {
      ...character,
      location: characterLocation ? characterLocation : character.location
    }
  })
}

/**
 * Adds episodes to characters based on character appearances in episodes.
 *
 * @param {Object} params - Parameters for the function.
 * @param {Episode[]} params.episodes - The array of episodes.
 * @param {CharacterEnriched[]} params.characters - The array of characters.
 * @returns {CharacterEnriched[]} - An array of characters with added episodes.
 */
export const addEpisodesToCharacters = ({episodes = [], characters = []}: {
  episodes: Episode[],
  characters: CharacterEnriched[]
}) => {
  return characters.map(character => {
    const episodesWhereTheCharacterAppear = episodes.filter(episode => {
      // Compose an array with the id of the episode characters
      const episodeCharactersIds = episode.characters.map(epCharacter => {
        const epCharacterUrlSplit = epCharacter.split('/')
        return epCharacterUrlSplit[epCharacterUrlSplit.length - 1]
      })
      return episodeCharactersIds.includes(character.id.toString())
    })


    return {
      ...character,
      episode: episodesWhereTheCharacterAppear && episodesWhereTheCharacterAppear.length > 0 ?
        episodesWhereTheCharacterAppear :
        character.episode
    }
  })
}

/**
 * Creates a new function that combines two functions by piping the result of the first function into the second function.
 */
export const pipedReduced = (f, g) => (arg) => g(f(arg));
/**
 * Combines multiple functions into a single function by piping the result of each function into the next one.
 *
 * @template T, U
 * @param {...((arg: T) => U)} fns - Functions to be combined.
 * @returns {(arg: T) => U} - A new function that pipes the result of each function into the next one.
 */
export const pipe = (...fns) => fns.reduce(pipedReduced);