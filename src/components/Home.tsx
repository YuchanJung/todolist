import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  allToDosState,
  dateState,
  IAllToDos,
  isDarkState,
  ISDARK_KEY,
  returnDateKey,
  TODOS_KEY,
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
  margin-left: 15px;
`;

const Body = styled.div``;

function updateAllToDos(savedAllToDos: string, dateKey: number) {
  const tempAllToDos: IAllToDos = { ...JSON.parse(savedAllToDos) };
  if (!tempAllToDos[dateKey]) {
    const newAllToDos: IAllToDos = {
      ...tempAllToDos,
      [dateKey]: { toDos: [] },
    };
    localStorage.setItem(TODOS_KEY, JSON.stringify(newAllToDos));
    return newAllToDos;
  }
  return tempAllToDos;
}

function Home() {
  const [allToDos, setAllToDos] = useRecoilState(allToDosState);
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const date = useRecoilValue(dateState);
  const dateKey = returnDateKey(date);
  const toDosByDate = allToDos[dateKey];
  console.log(dateKey);
  useEffect(() => {
    // first rendering
    const savedAllToDos = localStorage.getItem(TODOS_KEY);
    const savedIsDark = localStorage.getItem(ISDARK_KEY);
    if (savedAllToDos) {
      setAllToDos(() => updateAllToDos(savedAllToDos, dateKey));
    } else localStorage.setItem(TODOS_KEY, JSON.stringify(allToDos));
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
        <Title>{toDosByDate ? toDosByDate.toDos.length : 0} Tasks</Title>
        <DarkModeButton />
      </Header>
      {/*<SelectCategory />*/}
      <Body>
        <SelectDate />
        <CreateToDo />
        {toDosByDate && <ToDoList />}
      </Body>
    </Container>
  );
}

export default Home;
