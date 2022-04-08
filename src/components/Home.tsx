import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  dateState,
  isDarkState,
  ISDARK_KEY,
  ITotalToDos,
  returnDateKey,
  TODOS_KEY,
  totalToDosState,
} from "../atom";
import CreateToDo from "./CreateToDo";
import DarkModeButton from "./DarkModeButton";
import SelectDate from "./SelectDate";
import ToDoList from "./ToDoList";

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
  margin-left : 15px;
`;

const Body = styled.div``;

function Home() {
  const savedToDos = localStorage.getItem(TODOS_KEY);
  const savedIsDark = localStorage.getItem(ISDARK_KEY);
  const [totalToDos, setTotalToDos] = useRecoilState(totalToDosState);
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const date = useRecoilValue(dateState);
  const dateKey = returnDateKey(date);
  if (!totalToDos[dateKey]) {
    setTotalToDos((prev) => {
      const totalToDos: ITotalToDos = { ...prev, [dateKey]: { toDos: [] } };
      localStorage.setItem(TODOS_KEY, JSON.stringify(totalToDos));
      return totalToDos;
    });
  }
  useEffect(() => {
    if (savedToDos && savedToDos !== JSON.stringify(totalToDos)) {
      setTotalToDos(JSON.parse(savedToDos));
    } // have to change the logic..
    if (savedIsDark) setIsDark(JSON.parse(savedIsDark));
    else localStorage.setItem(ISDARK_KEY, JSON.stringify(isDark));
  }, []);
  /* 
  error handling => I think these codes should run only once. (without useEffect hook)
  This issue affects onChange function in ToDo.tsx .
  Can I use useEffect hook? 
  link : https://github.com/facebookexperimental/Recoil/issues/12
  */
  // const toDosByCat = useRecoilValue(toDosCatSelector);
  return (
    <Container>
      <Header>
        <Title>{totalToDos[dateKey].toDos.length} Tasks</Title>
        <DarkModeButton />
      </Header>
      {/*<SelectCategory />*/}
      <Body>
        <SelectDate />
        <CreateToDo />
        <ToDoList />
      </Body>
    </Container>
  );
}

export default Home;
