import React from 'react';
import {CharacterEnriched} from "../../interfaces/character";
import {Footer} from "./components/Footer";
import {Card} from "./components/Card";
import {useCharactersPage} from "./hooks/useCharactersPage";
import {AllEpisodesModal} from "./components/AllEpisodesModal";

export const CharactersPage = () => {
  const {
    state,
    loadNewData,
    onSelectCharacter,
    closeModal
  } = useCharactersPage();

  return <div className={'main-card'}>
    <div className={'cards-container scroll-shadows'}>
      {state.isPageLoading ? 'Loading...' :
        <div className="row">
          {Array.isArray(state.characters) && state.characters.map((character: CharacterEnriched) => {
            return <div className="col-6" key={character.id}>
              <Card character={character} onSelectCharacter={onSelectCharacter}/>
            </div>
          })}
        </div>
      }
    </div>

    {state.selectedCharacter?.id && <AllEpisodesModal selectedCharacter={state.selectedCharacter} closeModal={closeModal}/>}

    <Footer
      prev={state.pagination.prev}
      next={state.pagination.next}
      loadNewData={loadNewData}
      isPageLoading={state.isPageLoading}
    />
  </div>;
};
