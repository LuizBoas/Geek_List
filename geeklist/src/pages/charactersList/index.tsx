import React, { ReactElement, useState, useEffect, useRef } from "react";
import PageHeader from "../../components/PageHeader";
import CharacterItem, { Character } from "../../components/CharacterItem";

import "./styles.css";
import Input from "../../components/Input";
import Select from "../../components/Select";
import axios from "axios";

/**
 * Componente que exibe os detalhes de um personagem da série Rick and Morty.
 */
function CharactersList(): ReactElement {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [typeSearch, setTypeSearch] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Salva os personagens favoritos no localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Obtém uma lista de personagens da API do Rick and Morty e adiciona-os ao estado dos personagens
  useEffect(() => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character?page=${page}&${typeSearch}=${filter}`
      )
      .then((response) => {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...response.data.results,
        ]);
      })
      .catch((error) => console.log(error));
  }, [page, filter, typeSearch]);

  // Detecta quando o usuário chega ao final da lista e carrega mais personagens da API
  useEffect(() => {
    const handleScroll = () => {
      if (
        bottomRef.current &&
        window.innerHeight + window.scrollY >= bottomRef.current.offsetTop
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Limpa a lista de personagens e redefine a página atual quando o filtro de pesquisa é alterado
  useEffect(() => {
    setCharacters([]);
    setPage(1);
  }, [filter, typeSearch]);

  // Altera o valor do estado do filtro quando o usuário digita no campo de pesquisa
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  // Altera o valor do estado dos favoritos quando o usuário clica no botão de favoritos de um personagem
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
    <div id="character-container" className="container">
      <PageHeader title="Conheça os personagens complexos e multifacetados de Rick and Morty!">
        <form
          id="search-characters"
          onSubmit={(event) => event.preventDefault()}
        >
          <Select
            placeholder="Selecione uma opção pra filtrar os persornagens"
            name="select"
            value={typeSearch}
            onChange={(e) => {
              if (e.target.value === "favorite") {
                setShowFavorites(true);
              } else {
                setShowFavorites(false);
              }
              setTypeSearch(e.target.value);
              setFilter("");
            }}
            options={[
              { value: "name", label: "Nome" },
              { value: "species", label: "Espécie" },
              { value: "status", label: "Status de vida" },
              { value: "location", label: "Localização" },
              { value: "favorite", label: "Favoritos" },
            ]}
          />
          {typeSearch === "name" && (
            <Input
              id="search-characters-input"
              name="name"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Pesquise pelo nome do personagem"
            />
          )}
          {typeSearch === "species" && (
            <Input
              id="search-characters-input"
              name="name"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Pesquise pela espécie do personagem"
            />
          )}
          {typeSearch === "status" && (
            <Select
              placeholder="Selecione uma opçao de status do personagem"
              name="select"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              options={[
                { label: "Personagem está vivo(a)", value: "Alive" },
                { label: "Personagem está morto(a)", value: "Dead" },
                {
                  label: "Status de vida desconhecido",
                  value: "unknown",
                },
              ]}
            />
          )}
          {typeSearch === "location" && (
            <Input
              id="search-characters-input"
              name="name"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Pesquise pelo localização do personagem"
            />
          )}
        </form>
      </PageHeader>

      <main>
        {showFavorites &&
          characters
            .filter((character) => favorites.includes(character.id))
            .map((character) => (
              <CharacterItem
                key={character.id}
                character={character}
                onFavorite={handleFavorite}
                isFavorite={favorites.includes(character.id)}
              />
            ))}
        {!showFavorites &&
          characters.map((characters: Character) => {
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
