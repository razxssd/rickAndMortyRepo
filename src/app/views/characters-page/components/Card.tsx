import React, {memo} from 'react';
import {CharacterEnriched} from "../../../interfaces/character";
import {Location as OriginalLocation} from "../../../interfaces/location";
import {Episode} from "../../../interfaces/episode";

interface CardProps {
  character: CharacterEnriched
}

const MAX_EPISODES_TO_DISPLAY = 3

/**
 * Functional component representing a character card.
 *
 * @component
 * @name Card
 * @category Components
 * @param {Object} props - React component props.
 * @param {CharacterEnriched} props.character - The character information.
 * @param {(character: CharacterEnriched) => void} props.onSelectCharacter - Callback function triggered when the character is selected.
 * @returns {JSX.Element} JSX element representing the character card.
 */
export const Card: React.FC<CardProps> = memo(({character, onSelectCharacter}: {
  character: CharacterEnriched,
  onSelectCharacter: (character: CharacterEnriched) => void
}) => {
  const location = character.location as OriginalLocation
  const episodes = character.episode.slice(0, MAX_EPISODES_TO_DISPLAY)

  return <div className={'card'}>
    <div className="card-content">
      <div className="card-image">
        <img src={character.image} alt='character image'/>
      </div>
      <div className="card-detail">
        <div className="section">
          <a className={'card-title'} href={character.url}>
            <h2>{character.name}</h2>
          </a>
          <span className="status"><span
            className={character.status.toLowerCase()}/> {`${character.status} - ${character.species}`}</span>
        </div>

        <div className="section">
          <span className="text-gray">Last known location:</span>
          <a href={character.location.url} rel="noopener noreferrer" target="_blank">
            {`${character.location.name}${location?.dimension ? ` - ${location.dimension} ` : ''}`}
          </a>
          {Array.isArray(location?.residents) && location.residents.length > 0 &&
            <a href={character.location.url} rel="noopener noreferrer" target="_blank">
              {`${location.residents.length} Residents`}
            </a>}
        </div>

        {
          Array.isArray(character.episode) && character.episode.length > 0 &&
          <div className="section">
            <span className="text-gray">Seen in:</span>
            <div className={'episode-container'}>
              {episodes.map((episode: Episode, index) =>
                <>
                  {episode.name &&
                    <a className={index > 0 ? 'ml-1' : ''} href="https://rickandmortyapi.com/api/episode/28"
                       target="_blank">
                      {episode.name}
                    </a>}
                </>)}
              {character.episode.length > MAX_EPISODES_TO_DISPLAY &&
                <button className={'see-all-button ml-1'} onClick={() => onSelectCharacter(character)}>See all</button>}
            </div>
          </div>
        }
      </div>
    </div>
  </div>;
});
