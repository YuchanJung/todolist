import { motion, Variants } from "framer-motion";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  allToDosState,
  dateState,
  IAllToDos,
  isDarkState,
  ISDARK_KEY,
  returnDateKey,
  showingSettingPageState,
  showingCreatePageState,
  TODOS_KEY,
} from "../../atom";
import BarsIcon from "../Icons/BarsIcon";
import SelectDate from "./SelectDate";
import ToDoList from "./ToDoList";

const Wrapper = styled(motion.div)`
  width: 380px;
  min-width: 380px;
  height: 500px;
  background-color: ${(props) => props.theme.background.home};
`;

const Header = styled.header`
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px 5px 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-left: 15px;
`;

const SettingButton = styled.button`
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

const ContentsTitle = styled.div``;

const CreateButton = styled(motion.button)`
  position: absolute;
  bottom: -30px;
  width: 120px;
  height: 30px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.background.checkBox};
  font-size: 16px;
`;

const wrapperVariants: Variants = {
  animate: (showingCreatePage: boolean) => ({
    scale: showingCreatePage ? 0.93 : 1,
    borderRadius: showingCreatePage ? 15 : 0,
    transition: {
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
  const [showingCreatePage, setShowingCreatePage] = useRecoilState(
    showingCreatePageState
  );
  const setShowingSettingPage = useSetRecoilState(showingSettingPageState);
  const date = useRecoilValue(dateState);
  const dateKey = returnDateKey(date);
  const toDosByDate = allToDos[dateKey];
  const toggleCreatePage = () => setShowingCreatePage((prev) => !prev);
  const toggleSettingPage = () => setShowingSettingPage((prev) => !prev);
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
      variants={wrapperVariants}
      custom={showingCreatePage}
      animate="animate"
    >
      <Header>
        <Title>{toDosByDate ? toDosByDate.toDos.length : 0} Tasks</Title>
        <SettingButton onClick={toggleSettingPage}>
          <BarsIcon />
        </SettingButton>
      </Header>
      {/*<SelectCategory />*/}
      <Contents>
        <SelectDate />
        {toDosByDate && <ToDoList />}
        <CreateButton onClick={toggleCreatePage}>New Task</CreateButton>
      </Contents>
    </Wrapper>
  );
}

export default Home;
