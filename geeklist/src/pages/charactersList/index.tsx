import React, { ReactElement, useState, useEffect, useRef } from "react";
import PageHeader from "../../components/PageHeader";
import CharacterItem, { Character } from "../../components/CharacterItem";

import "./styles.css";
import Input from "../../components/Input";
import Select from "../../components/Select";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

function CharactersList(): ReactElement {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [favorites, setFavorites] = useState<number[]>([]);
  // const [typeSearch, setTypeSerch] = useState

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${filter}`
      )
      .then((response) => {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.data.results,
        ]);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page, filter]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        bottomRef.current &&
        window.innerHeight + window.scrollY >= bottomRef.current.offsetTop
      ) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setCharacters([]);
    setPage(1);
  }, [filter]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  function handleFavorite(id: number) {
    const index = favorites.findIndex((favoriteId) => favoriteId === id);
    if (index >= 0) {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, id]);
    }
  }

  return (
    <div id="character-container" className="container">
      <PageHeader title="Conheça os personagens complexos e multifacetados de Rick and Morty!">
        <form
          id="search-characters"
          onSubmit={(event) => event.preventDefault()}
        >
          {/* <Select
						name="select"
						// value={subject}
						// onChange={e => {
						// 	setSubject(e.target.value);
						// }}
						options={[
							{ value: 'Artes', label: 'Artes' },
							{ value: 'Biologia', label: 'Biologia' },
							{ value: 'Ciências', label: 'Ciências' },
							{ value: 'Educação Física', label: 'Educação Física' },
							{ value: 'Física', label: 'Física' },
							{ value: 'Geografia', label: 'Geografia' },
							{ value: 'Química', label: 'Química' },
							{ value: 'História', label: 'História' },
							{ value: 'Matemática', label: 'Matemática' },
							{ value: 'Português', label: 'Português' },
							{ value: 'Inglês', label: 'Inglês' },
						]}
					/> */}
          <Input
            id="search-characters-input"
            name="name"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Pesquise pelo nome do personagem"
          />
        </form>
      </PageHeader>

      <main>
        {characters.map((characters: Character) => {
          return (
            <CharacterItem
              key={characters.id}
              character={characters}
              onFavorite={handleFavorite}
              isFavorite={favorites.includes(characters.id)}
            />
          );
        })}
        <div ref={bottomRef} />
      </main>
    </div>
  );
}

export default CharactersList;
