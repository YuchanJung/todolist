import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  isDarkState,
  ISDARK_KEY,
  toDosSelector,
  toDosState,
  TODOS_KEY,
} from "../atom";
import CreateToDo from "./CreateToDo";
import DarkModeButton from "./DarkModeButton";
import SelectCategory from "./SelectCategory";
import ToDo from "./ToDo";

const Container = styled.div`
  width: 380px;
  height: 500px;
  border-radius: 35px;
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: -2px 4px 20px 6px ${(props) => props.theme.cardShadowColor};
`;

const Header = styled.header`
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
`;

const Title = styled.h1`
  font-family: "Roboto Slab", serif;
  font-size: 42px;
  margin: 15px 0px;
  padding: 0px 10px;
`;

const Body = styled.div``;

const Contents = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function WholeList() {
  const savedToDos = localStorage.getItem(TODOS_KEY);
  const savedIsDark = localStorage.getItem(ISDARK_KEY);
  const [toDos, setToDos] = useRecoilState(toDosState);
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  useEffect(() => {
    if (savedToDos && savedToDos !== JSON.stringify(toDos)) {
      setToDos(JSON.parse(savedToDos));
    }
    if (savedIsDark) setIsDark(JSON.parse(savedIsDark));
    else localStorage.setItem(ISDARK_KEY, JSON.stringify(isDark));
  }, []);
  /* 
  error handling => I think these codes should run only once. (without useEffect hook)
  This issue affects onChange function in ToDo.tsx .
  Can I use useEffect hook? 
  link : https://github.com/facebookexperimental/Recoil/issues/12
  */
  const toDosByCat = useRecoilValue(toDosSelector);
  return (
    <Container>
      <Header>
        <Title>{toDosByCat.length} Tasks</Title>
        <DarkModeButton />
      </Header>
      <SelectCategory />
      <Body>
        <CreateToDo />
        <Contents>
          {toDosByCat.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </Contents>
      </Body>
    </Container>
  );
}

export default WholeList;
