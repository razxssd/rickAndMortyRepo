import axios, { AxiosResponse} from "axios";
import {ENDPOINT} from "../../../core/const";
import {CharacterResponse} from "../../../interfaces";

/**
 * Fetches character data from the Rick and Morty API.
 *
 * @param {Object} props - The properties for the API request.
 * @param {string} [props.url=ENDPOINT.GET_CHARACTERS] - The URL for the API request. Defaults to the characters' endpoint.
 * @returns {Promise<CharacterResponse>} - A Promise that resolves to the character data response from the API.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const getCharacters = async (props: {url?: string} = {} ): Promise<CharacterResponse> => {
  const {url = ENDPOINT.GET_CHARACTERS} = props
  try {
    const response: AxiosResponse<CharacterResponse> = await axios.get(url)

    return response.data
  } catch (error) {
    console.error("Something went wrong on 'getCharacters': ", error)
  }
}

/**
 * Fetches all data of a specified type (episodes or locations) from the Rick and Morty API.
 *
 * @template T - The type of data to be returned (e.g., EpisodeInfo or LocationInfo).
 * @template R - The raw response type received from the API.
 * @param {'episodes' | 'locations'} type - The type of data to fetch (episodes or locations).
 * @returns {Promise<T[]>} - A Promise that resolves to an array of data of the specified type.
 * @throws {Error} - Throws an error if the API request fails.
 */
export const getAll= async <T, R>(type: 'episodes' | 'locations'): Promise<T[]> => {
  try {
    const url = type === 'episodes' ? ENDPOINT.GET_EPISODES : ENDPOINT.GET_LOCATIONS
    let responseData: T[] = []
    const response: AxiosResponse<R> = await axios.get(url)
    responseData = [...responseData, ...response.data.results]

    if (response.data.info.pages > 1) {
      let requests = []
      for (let index=1; index<response.data.info.pages; index++) {
        requests = [...requests, axios.get<AxiosResponse<R>>(`${url}?page=${index + 1}`)]
      }

      const responses: AxiosResponse<R>[]  = await Promise.all(requests)
      let resultsFromResponses: T[] = []
      responses.forEach((res: AxiosResponse<R>) => {
        resultsFromResponses = [...resultsFromResponses, ...res.data.results]
      })
      responseData = [...responseData, ...resultsFromResponses]
    }

    return responseData
  } catch (error) {
    console.error("Something went wrong on 'getCharacters': ", error)
  }
}