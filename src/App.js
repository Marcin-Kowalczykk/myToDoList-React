import React, { Fragment, useState } from "react";

import styled from "styled-components";
import GlobalStyle from "./GlobalStyled";

import TopBar from "./components/TopBar";
import Form from "./components/Form";
import Filter from "./components/Filter";
import ListOfElements from "./components/ListOfElements/ListOfElements";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.h1`
  color: #0000007a;
  font-family: "Big Shoulders Stencil Display", cursive;
  margin: 0 0;
`;

function App() {
  const exampleListElements = [
    {
      id: "1",
      name: "Marcin",
      surname: "Kowalczyk",
      title: "zrobić pranie",
      instruction: `      - płyn jakiś tam
      - 30 stopni
      - 4 program
      - kolorowe rzeczy`,
      date: new Date(2021, 4, 17),
      label: 1,
    },
    {
      id: "2",
      name: "Zuzanna",
      surname: "Czerniej",
      title: "zakupy",
      instruction: `zara:
      -koszulki
      -spodnie
vans: 
      -buty`,
      date: new Date(2019, 4, 17),
      label: 2,
    },
    {
      id: "3",
      name: "Kamil",
      surname: "Kowalski",
      title: "Praca dyplomowa",
      instruction: "2 rozdziały ",
      date: new Date(2020, 4, 17),
      label: 3,
    },
  ];
  const [formListElements, setFormListElements] = useState(exampleListElements);

  const clickAdd = (formInput) => {
    const newObject = {
      ...formInput,
      id: Math.random().toString(),
    };
    setFormListElements((previous) => {
      return [newObject, ...previous];
    });
  };

  const deleteListElem = (elementId) => {
    setFormListElements((previous) => {
      const newObject = previous.filter((element) => element.id !== elementId);
      return newObject;
    });
  };

  const deleteAllListElements = () => {
    setFormListElements([]);
  };

  const [inputFilterByPersonalValue, setInputFilterByPersonalValue] =
    useState("");
  const [inputFilterByTitleValue, setInputFilterByTitleValue] = useState("");
  const [inputFilterByDateValue, setInputFilterByDateValue] = useState("");

  const filterByPersonal = (event) => {
    setInputFilterByPersonalValue(event.target.value);
  };
  const filterByTitle = (event) => {
    setInputFilterByTitleValue(event.target.value);
  };
  const filterByDate = (event) => {
    setInputFilterByDateValue(event.target.value);
  };
  const filteredArrayByPersonal = formListElements.filter(
    (element) =>
      element.name
        .toLowerCase()
        .includes(inputFilterByPersonalValue.toLowerCase()) ||
      element.surname
        .toLowerCase()
        .includes(inputFilterByPersonalValue.toLowerCase())
  );
  const filteredArrayByTitle = formListElements.filter((element) =>
    element.title.toLowerCase().includes(inputFilterByTitleValue.toLowerCase())
  );
  const filteredArrayByDate = formListElements.filter((element) =>
    element.date
      .getFullYear()
      .toString()
      .toLowerCase()
      .includes(inputFilterByDateValue.toLowerCase())
  );

  let newArray;

  if (inputFilterByPersonalValue.length > 0) {
    newArray = filteredArrayByPersonal;
  } else if (inputFilterByTitleValue.length > 0) {
    newArray = filteredArrayByTitle;
  } else {
    newArray = filteredArrayByDate;
  }

  let content = (
    <ListOfElements onDeleteListElem={deleteListElem} listElements={newArray} />
  );

  if (formListElements.length === 0) {
    content = <p>No tasks found, please click Add new task</p>;
  }

  return (
    <Fragment>
      <GlobalStyle />
      <Wrapper>
        <TopBar onDeleteAllListElements={deleteAllListElements} />
        <Header>To Do Manager</Header>
        <Form onClickAdd={clickAdd} />
        <Filter
          onFilterByPersonal={filterByPersonal}
          onFilterByTitle={filterByTitle}
          onFilterByDate={filterByDate}
        />
        {content}
      </Wrapper>
    </Fragment>
  );
}

export default App;

// instrukcja
