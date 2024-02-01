import {Character, CharacterInfo} from "./character";
import {Episode} from "./episode";

export interface CharacterResponse {
  info: CharacterInfo;
  results: Character[];
}

export interface LocationResponse {
  info: CharacterInfo;
  results: Location[];
}

export interface EpisodeResponse {
  info: CharacterInfo;
  results: Episode[];
}
