import { AnimatePresence, motion, Variants } from "framer-motion";
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
  showingBarState,
  TODOS_KEY,
} from "../../atom";
import Bars from "../icons/Bars";
import CreateToDo from "./CreateToDo";
import SelectDate from "./SelectDate";
import Setting from "../Setting/Setting";
import ToDoList from "./ToDoList";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerWrapper = styled.div`
  width: 380px;
  height: 500px;
  border-radius: 35px;
  box-shadow: -2px 4px 20px 6px ${(props) => props.theme.cardShadowColor};
  overflow: hidden;
`;

const Wrapper = styled(motion.div)`
  width: 380px;
  height: 500px;
  border-radius: 35px;
  background-color: ${(props) => props.theme.cardBgColor};
  float: left;
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
  font-size: 36px;
  margin-left: 15px;
`;

const Contents = styled.div``;

const wrapperVariants: Variants = {
  animate: (showingBar: boolean) => ({
    x: showingBar ? -300 : 0,
    borderTopRightRadius: showingBar ? 0 : 35,
    borderBottomRightRadius: showingBar ? 0 : 35,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  }),
};

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
  const showingBar = useRecoilValue(showingBarState);
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
  error handling => link : https://github.com/facebookexperimental/Recoil/issues/12
  */
  // const toDosByCat = useRecoilValue(toDosCatSelector);
  return (
    <Container>
      <BiggerWrapper>
        <Wrapper
          custom={showingBar}
          variants={wrapperVariants}
          animate="animate"
        >
          <Header>
            <Title>{toDosByDate ? toDosByDate.toDos.length : 0} Tasks</Title>
            <Bars />
          </Header>
          {/*<SelectCategory />*/}
          <Contents>
            <SelectDate />
            <CreateToDo />
            {toDosByDate && <ToDoList />}
          </Contents>
        </Wrapper>
        <AnimatePresence>{showingBar && <Setting />}</AnimatePresence>
      </BiggerWrapper>
    </Container>
  );
}

export default Home;