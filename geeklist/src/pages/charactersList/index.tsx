import React, {
  ReactElement,
  useState,
  FormEvent,
  useEffect,
  useRef,
} from "react";
import PageHeader from "../../components/PageHeader";
import CharacterItem, { Character } from "../../components/CharacterItem";

import "./styles.css";
import Input from "../../components/Input";
import Select from "../../components/Select";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

function CharactersList(): ReactElement {
  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

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

  return (
    <div id="page-characters-list" className="container">
      <PageHeader title="Conheça os personagens complexos e multifacetados de Rick and Morty!">
        <form
          id="search-characters"
          onSubmit={(event) => event.preventDefault()}
        >
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
          return <CharacterItem key={characters.id} character={characters} />;
        })}
        {loading && (
          <div className="loading-container">
            <FaSpinner className="spinner" />
          </div>
        )}
        <div ref={bottomRef} />
      </main>
    </div>
  );
}

export default CharactersList;
