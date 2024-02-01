import {CharacterEnriched} from "../../../interfaces/character";
import {Location} from "../../../interfaces/location";
import {Episode} from "../../../interfaces/episode";

export interface Pagination {
  next?: string | null
  prev?: string | null
}

export interface CharacterPageState {
  characters: CharacterEnriched[]
  locations: Location[]
  episodes: Episode[]
  selectedCharacter: null | CharacterEnriched
  pagination: Pagination
  isPageLoading: boolean
}