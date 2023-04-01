import React from "react";

import "./styles.css";

export interface Character {
  id: number;
  name: string;
  image: string;
  bio?: string;
  cost?: number;
  subject?: string;
}

interface CharacterItemProps {
  character: Character;
}

const CharacterItem: React.FC<CharacterItemProps> = ({
  character,
}: CharacterItemProps) => {
  return (
    <article className="teacher-item">
      <header>
        <img src={character.image} alt={character.name} />
        <div>
          <strong>{character.name}</strong>
          <span>SSSSSS</span>
        </div>
      </header>
      <p>SSSSS</p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ SSSSSS</strong>
        </p>
      </footer>
    </article>
  );
};

export default CharacterItem;
