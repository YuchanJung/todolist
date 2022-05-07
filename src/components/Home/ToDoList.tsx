import { AnimatePresence, motion, Variants } from "framer-motion";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  allToDosState,
  dateState,
  IAllToDos,
  isBackState,
  returnDateKey,
  TODOS_KEY,
} from "../../atom";
import ToDo from "./ToDo";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 240px;
  position: absolute;
  top: 90px;
`;

const ToDoBoard = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.textColor};
    border-radius: 10px;
  }
`;

const wrapperVariants: Variants = {
  initial: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
  }),
  animate: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
  }),
};

function ToDoList() {
  const [allToDos, setAllToDos] = useRecoilState(allToDosState);
  const isBack = useRecoilValue(isBackState);
  const date = useRecoilValue(dateState);
  const dateKey = returnDateKey(date);
  const toDosByDate = allToDos[dateKey].toDos;
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setAllToDos((prevAllToDos) => {
      const toDosCopy = [...prevAllToDos[dateKey].toDos];
      const targetToDo = toDosCopy[source.index];
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination.index, 0, targetToDo);
      // returnTargetToDo를 바로 넣을 시 error. (Uncaught TypeError: Cannot read properties of undefined (reading 'id')) why?
      const newAllToDos: IAllToDos = {
        ...prevAllToDos,
        [dateKey]: { toDos: toDosCopy },
      };
      localStorage.setItem(TODOS_KEY, JSON.stringify(newAllToDos));
      return newAllToDos;
    });
  };
  console.log(isBack);
  return (
    <AnimatePresence custom={isBack}>
      <Wrapper
        key={dateKey}
        custom={isBack}
        variants={wrapperVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="ToDoList">
            {(provided) => (
              <ToDoBoard ref={provided.innerRef} {...provided.droppableProps}>
                {toDosByDate.map((toDo, index) => (
                  <ToDo key={toDo.id} toDo={toDo} index={index} />
                ))}
                {provided.placeholder}
              </ToDoBoard>
            )}
          </Droppable>
        </DragDropContext>
      </Wrapper>
    </AnimatePresence>
  );
}

export default ToDoList;
