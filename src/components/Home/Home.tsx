import { motion, Variants } from "framer-motion";
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
  isBarsClickedState,
  TODOS_KEY,
} from "../../atom";
import BarsIcon from "../icons/BarsIcon";
import CreateToDo from "./CreateToDo";
import SelectDate from "./SelectDate";
import ToDoList from "./ToDoList";

const Wrapper = styled(motion.div)`
  width: 380px;
  min-width: 380px;
  height: 500px;
  background-color: ${(props) => props.theme.homeBgColor};
`;

const wrapperVariants: Variants = {
  animate: (showingBar: boolean) => ({
    borderTopRightRadius: showingBar ? 0 : 35,
    borderBottomRightRadius: showingBar ? 0 : 35,
    transition: {
      duration: 0.3,
    },
  }),
};

const Header = styled.header`
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-left: 15px;
`;

const BarsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const Contents = styled.div`
  width: 100%;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

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
  const [isBarsClicked, setIsBarsClicked] = useRecoilState(isBarsClickedState);
  const date = useRecoilValue(dateState);
  const dateKey = returnDateKey(date);
  const toDosByDate = allToDos[dateKey];
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
  error handling => link : https://github.com/facebookexperimental/Recoil/issues/12
  */
  // const toDosByCat = useRecoilValue(toDosCatSelector);
  return (
    <Wrapper
      custom={isBarsClicked}
      variants={wrapperVariants}
      animate="animate"
    >
      <Header>
        <Title>{toDosByDate ? toDosByDate.toDos.length : 0} Tasks</Title>
        <BarsButton onClick={() => setIsBarsClicked((prev) => !prev)}>
          <BarsIcon />
        </BarsButton>
      </Header>
      {/*<SelectCategory />*/}
      <Contents>
        <SelectDate />
        <CreateToDo />
        {toDosByDate && <ToDoList />}
      </Contents>
    </Wrapper>
  );
}

export default Home;
