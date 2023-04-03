import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import {
  speciesTranslations,
  speciesColors,
  genderTranslations,
  typeTranslations,
  statusTranslations,
} from "./../../constants/character";
import { FaHeart, FaMapMarkedAlt, FaRegHeart, FaSpinner } from "react-icons/fa";
import { IoMdPlanet } from "react-icons/io";
import { BsGenderTrans } from "react-icons/bs";
import { GiAbstract023, GiCrenulatedShield } from "react-icons/gi";

import { Character } from "../../components/CharacterItem";
import { useParams } from "react-router-dom";
import "./styles.css";

/**
 * Componente que renderiza a página de detalhes de um personagem.
 * @returns {ReactElement} Elemento React que representa a página de detalhes do personagem.
 * */
function CharacterDetail(): ReactElement {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character>();
  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  /**
   * Busca as informações do personagem a partir do seu id.
   * @param {number} id - Id do personagem.
   * */
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  /**
   * Atualiza a lista de favoritos do usuário no localStorage.
   * */
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Adiciona ou remove o personagem da lista de favoritos do usuário.
   * @param {number} id - Id do personagem.
   * */
  function handleFavorite(id: number) {
    const index = favorites.findIndex((favoriteId) => favoriteId === id);
    if (index >= 0) {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, id]);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

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
                  <GiCrenulatedShield
                    size={25}
                    color={`var(--color-text-complement)`}
                  />
                  <strong>Status: </strong>
                  <p>{statusTranslations[character.status]}</p>
                </div>
                <hr />
                <div>
                  <BsGenderTrans
                    size={25}
                    color={`var(--color-text-complement)`}
                  />
                  <strong>Gênero: </strong>
                  <p>{genderTranslations[character.gender]}</p>
                </div>
                <hr />
                <div>
                  <GiAbstract023
                    size={25}
                    color={`var(--color-text-complement)`}
                  />
                  <strong>Subespécie: </strong>
                  <p>{typeTranslations[character.type]}</p>
                </div>
                <hr />
                <div>
                  <IoMdPlanet
                    size={25}
                    color={`var(--color-text-complement)`}
                  />
                  <strong>Origem: </strong>
                  <p>
                    {character.origin.name === "unknown"
                      ? "Indeterminado(a)"
                      : character.origin.name}
                  </p>
                </div>
                <hr />
                <div>
                  <FaMapMarkedAlt
                    size={25}
                    color={`var(--color-text-complement)`}
                  />
                  <strong>Última localização:</strong>
                  <p>{character.location.name}</p>
                </div>
                <hr />
              </div>
              <button
                title={`Adicione ${character.name} aos favoritos!`}
                className="button-detail-favorite"
                type="button"
                onClick={() => handleFavorite(character.id)}
              >
                {favorites.includes(character.id) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </article>
          ) : (
            <div className="loading-container">
              <FaSpinner className="spinner" />
            </div>
          )}
        </main>
      </PageHeader>
    </div>
  );
}

export default CharacterDetail;
