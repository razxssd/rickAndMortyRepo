import React from 'react';
import {CharacterEnriched} from "../../../interfaces/character";
import {Episode} from "../../../interfaces/episode";

interface AllEpisodesModal {
  selectedCharacter: CharacterEnriched
  closeModal: () => void
}

export const AllEpisodesModal: React.FC<AllEpisodesModal> = ({selectedCharacter, closeModal}) => {
  return <div className={'dialog-wrapper'}>
    <div className={'dialog-container'}>
      <div className={'dialog-header'}>
        <div className={'dialog-x'} onClick={closeModal}>X</div>
      </div>

      <div className={'dialog-content'}>
        <h5>Episodes: </h5>
        <div className={'dialog-content-episodes'}>
          {
            selectedCharacter.episode.map(episode => {
              const _episode = episode as Episode
              return <a className={'ml-1'} href={_episode.url} target={'_blank'}>{`${_episode?.name}`}</a>
            })
          }
        </div>
      </div>
    </div>
  </div>
    ;
};
