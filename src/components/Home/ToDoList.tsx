import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  allToDosState,
  dateState,
  IAllToDos,
  returnDateKey,
  TODOS_KEY,
} from "../../atom";
import DraggableToDo from "./DraggableToDo";

const ToDoBoard = styled.div`
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
    
function ToDoList() { 
  const [allToDos, setAllToDos] = useRecoilState(allToDosState);
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
      const newAllToDos: IAllToDos = { ...prevAllToDos, [dateKey]: { toDos: toDosCopy } };
      localStorage.setItem(TODOS_KEY, JSON.stringify(newAllToDos));
      return newAllToDos;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ToDoList">
        {(provided) => (
          <ToDoBoard ref={provided.innerRef} {...provided.droppableProps}>
            {toDosByDate.map((toDo, index) => (
              <DraggableToDo key={toDo.id} toDo={toDo} index={index} />
            ))}
          </ToDoBoard>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ToDoList;
