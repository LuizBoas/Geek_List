import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import {
  speciesTranslations,
  speciesColors,
} from "./../../constants/character";
import {
  FaRegSmile,
  FaSkull,
  FaMapMarkedAlt,
  FaRegQuestionCircle,
} from "react-icons/fa";

import { Character } from "../../components/CharacterItem";
import { useParams } from "react-router-dom";
import "./styles.css";

function CharacterDetail(): ReactElement {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {}, [id]);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Alive":
        return (
          <FaRegSmile
            title={character ? `${character.name} está vivo(a)!` : "Carregando"}
            color="green"
            size={25}
          />
        );
      case "Dead":
        return (
          <FaSkull
            title={
              character ? `${character.name} está morto(a)!` : "Carregando"
            }
            color="red"
            size={25}
          />
        );
      default:
        return (
          <FaRegQuestionCircle
            title={
              character
                ? `Não se sabe o status de vida de ${character.name}!`
                : "Carregando"
            }
            color="gray"
            size={25}
          />
        );
    }
  };

  return (
    <div id="character-detail" className="container">
      <PageHeader title="">
        <main>
          {character ? (
            <article className="character-detail-container">
              <header>
                <img src={character.image} alt={character.name} />
                <div>
                  <strong className="character-detail-strong">
                    {character.name}
                  </strong>
                  <span style={{ color: speciesColors[character.species] }}>
                    {speciesTranslations[character.species]}
                  </span>
                </div>
              </header>
              <div className="character-detail-location">
                <FaMapMarkedAlt size={25} color={`var(--color-text-base)`} />
                <p>Última localização: {character.location.name}.</p>
              </div>
              <p>origem{character.origin.name}</p>
              <p>{character.origin.url}</p>
              <p>{character.type}</p>
              <p>{character.gender}</p>
              <p>{character.episode}</p>
              <div className="character-status">
                {getStatusIcon(character.status)}
              </div>
            </article>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      </PageHeader>
    </div>
  );
}

export default CharacterDetail;
