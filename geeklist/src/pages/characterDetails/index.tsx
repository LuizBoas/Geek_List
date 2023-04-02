import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import {
  speciesTranslations,
  speciesColors,
  genderTranslations,
  typeTranslations,
  statusTranslations,
} from "./../../constants/character";
import {
  FaRegSmile,
  FaSkull,
  FaMapMarkedAlt,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { IoMdPlanet } from "react-icons/io";
import { BsGenderTrans } from "react-icons/bs";
import { GiAbstract023, GiCrenulatedShield } from "react-icons/gi";

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
              <div className="character-detail-description">
                <div>
                  <GiCrenulatedShield size={25} color={`var(--color-text-complement)`} />
                  <strong>Status: </strong>
                  <p>{statusTranslations[character.status]}</p>
                </div>
                <hr />
                <div>
                  <BsGenderTrans size={25} color={`var(--color-text-complement)`} />
                  <strong>Gênero: </strong>
                  <p>{genderTranslations[character.gender]}</p>
                </div>
                <hr />
                <div>
                  <GiAbstract023 size={25} color={`var(--color-text-complement)`} />
                  <strong>Subespécie: </strong>
                  <p>{typeTranslations[character.type]}</p>
                </div>
                <hr />
                <div>
                  <IoMdPlanet size={25} color={`var(--color-text-complement)`} />
                  <strong>Origem: </strong>
                  <p>{character.origin.name==="unknown"?"Indeterminado(a)":character.origin.name}</p>
                </div>
                <hr />
                <div>
                  <FaMapMarkedAlt size={25} color={`var(--color-text-complement)`} />
                  <strong>Última localização:</strong>
                  <p>{character.location.name}</p>
                </div>
                <hr />
                
                
                
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
