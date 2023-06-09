import React, { useState } from "react";
import {
  speciesTranslations,
  speciesColors,
} from "./../../constants/character";
import {
  FaHeart,
  FaRegHeart,
  FaRegSmile,
  FaSkull,
  FaMapMarkedAlt,
  FaRegQuestionCircle,
} from "react-icons/fa";
import "./styles.css";
import { Link } from "react-router-dom";

// Define a interface Character que é usada no componente CharacterItem.
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// Define a interface CharacterItemProps que define as propriedades que o componente CharacterItem recebe.
interface CharacterItemProps {
  character: Character; // objeto Character que será renderizado.
  onFavorite: (id: number) => void; // função callback que é chamada quando o usuário clica no botão de favoritos.
  isFavorite: boolean; // valor booleano que indica se o personagem é favorito ou não.
}

// Define o componente CharacterItem que recebe as props definidas em CharacterItemProps.
const CharacterItem: React.FC<CharacterItemProps> = ({
  character,
  isFavorite,
  onFavorite,
}: CharacterItemProps) => {
  // Função que recebe o status do personagem e retorna o ícone correspondente.
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Alive":
        return (
          <FaRegSmile
            title={`${character.name} está vivo(a)!`}
            color="green"
            size={25}
          />
        );
      case "Dead":
        return (
          <FaSkull
            title={`${character.name} está morto(a)!`}
            color="red"
            size={25}
          />
        );
      default:
        return (
          <FaRegQuestionCircle
            title={`Não se sabe o status de vida de ${character.name}!`}
            color="gray"
            size={25}
          />
        );
    }
  };

  // Renderiza o componente CharacterItem na tela.
  return (
    <article className="character-item">
      <Link to={`/personagem/${character.id}`}>
        <header>
          <img src={character.image} alt={character.name} />
          <div>
            <strong>{character.name}</strong>
            <span style={{ color: speciesColors[character.species] }}>
              {speciesTranslations[character.species]}
            </span>
          </div>
        </header>
        <div className="character-location">
          <FaMapMarkedAlt size={25} color={`var(--color-text-base)`} />
          <p>Última localização: {character.location.name}.</p>
        </div>
        <div className="character-status">
          {getStatusIcon(character.status)}
        </div>
      </Link>
      <button
        title={`Adicione ${character.name} aos favoritos!`}
        className="button-favorite"
        type="button"
        onClick={() => onFavorite(character.id)}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </article>
  );
};

export default CharacterItem;
