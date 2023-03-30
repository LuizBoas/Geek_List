import React, { ReactElement, useState, FormEvent, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import CharacterItem, { Character } from "../../components/characterItem";

import "./styles.css";
import Input from "../../components/Input";
import Select from "../../components/Select";
import axios from "axios";

function CharactersList(): ReactElement {
  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Personagens de Rick and Morty">
        <form id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            // onChange={(e) => {
            //   setSubject(e.target.value);
            // }}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "Química", label: "Química" },
              { value: "História", label: "História" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "Inglês", label: "Inglês" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da Semana"
            value={weekDay}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            name="time"
            label="Hora"
            type="time"
            value={time}
            // onChange={(e) => {
            //   setTime(e.target.value);
            // }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        console.log(character)
        {characters.map((characters: Character) => {
          return <CharacterItem key={characters.id} character={characters} />;
        })}
      </main>
    </div>
  );
}

export default CharactersList;
