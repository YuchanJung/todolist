import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDosSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import SelectCategory from "./SelectCategory";
import ToDo from "./ToDo";

const Container = styled.div`
  max-width: 420px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 45px;
  margin: 15px 0px;
`

const Body = styled.div`
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.cardBgColor};
`;

function WholeList() {
  const toDos = useRecoilValue(toDosSelector);
  console.log(toDos);
  return (
    <Container>
      <Header>
        <Title>To Do List</Title>
        <CreateToDo />
      </Header>
      <hr />
      <SelectCategory />
      <Body>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Body>
    </Container>
  );
}

export default WholeList;
