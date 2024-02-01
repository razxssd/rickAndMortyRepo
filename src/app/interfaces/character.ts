import {Location as OriginalLocation} from '../interfaces/location'
import {Episode as OriginalEpisode} from '../interfaces/episode'

export interface CharacterInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Location {
  name: string;
  url: string;
}

export interface Episode {
  [index: number]: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: Episode[];
  url: string;
  created: string;
}

export interface CharacterEnriched extends Character {
  location: OriginalLocation | Location
  episode: OriginalEpisode[] | Episode[]
}
