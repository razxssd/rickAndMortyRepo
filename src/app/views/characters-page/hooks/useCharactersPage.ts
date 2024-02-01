import {useEffect, useState} from "react";
import {CharacterPageState} from "../interfaces";
import {addEpisodesToCharacters, addLocationToCharacters, initialState, pipe} from "../utils";
import {Location} from "../../../interfaces/location";
import {getAll, getCharacters} from "../services";
import {EpisodeResponse, LocationResponse} from "../../../interfaces";
import {Episode} from "../../../interfaces/episode";
import {TIMEOUT_LOADER_INTERVAL} from "../../../core/const";
import {CharacterEnriched} from "../../../interfaces/character";

export const useCharactersPage = () => {
  const [state, setState] = useState<CharacterPageState>(initialState);
  let loaderTimeout;

  /**
   * Fetches locations, episodes, and characters, processes them, and updates the component state.
   *
   */
  useEffect(() => {
    (async () => {
      const locations: Location[] = await getAll<Location, LocationResponse>('locations')
      const episodes: Episode[] = await getAll<Episode, EpisodeResponse>('episodes')
      const response = await getCharacters()

      const responseMapped = pipe(
        addLocationToCharacters,
        (res) => addEpisodesToCharacters({episodes, characters: res})
      )({locations, characters: response.results})

      setState((state) => ({
        ...state,
        characters: responseMapped,
        pagination: {next: response?.info?.next, prev: response?.info?.prev},
        isPageLoading: false,
        locations: locations,
        episodes: episodes
      }))
    })()
  }, [])

  /**
   * Loads new data based on the provided URL, updates the component state, and applies additional processing.
   *
   */
  const loadNewData = async (url?: string | null) => {
    if (!url) {
      return;
    }
    setState((state) => ({
      ...state,
      isPageLoading: true
    }))
    const response = await getCharacters({url: url});
    const responseMapped = pipe(
      addLocationToCharacters,
      (res) => addEpisodesToCharacters({episodes: state.episodes, characters: res})
    )({locations: state.locations, characters: response.results})

    if (loaderTimeout) {
      clearTimeout(loaderTimeout)
    }
    loaderTimeout = setTimeout(() => {
      setState((state) => ({
        ...state,
        characters: responseMapped,
        pagination: {next: response?.info?.next, prev: response?.info?.prev},
        isPageLoading: false
      }))
    }, TIMEOUT_LOADER_INTERVAL)

  }

  const onSelectCharacter = (character: CharacterEnriched) => {
    setState((_state) => ({
      ..._state,
      selectedCharacter: character
    }))
  }

  const closeModal = () => {
    setState((_state) => ({
      ..._state,
      selectedCharacter: null
    }))
  }

  return {
    state,
    loadNewData,
    onSelectCharacter,
    closeModal
  }
}