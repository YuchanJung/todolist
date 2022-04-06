import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  dateState,
  IToDo,
  returnDateKey,
  TODOS_KEY,
  totalToDosState,
} from "../atom";
import DraggableToDo from "./DraggableToDo";

const Contents = styled.div`
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

function returnTargetToDo(toDosByDate: IToDo[], draggableId: string) {
  const targetIndex = toDosByDate.findIndex(
    (toDo) => toDo.id === Number(draggableId)
  );
  return toDosByDate[targetIndex];
}

function changeToDosIndex(newToDos: IToDo[], oldToDos: IToDo[]) {
  const returnToDos = oldToDos.map((toDo) => {
    let newToDo: IToDo = toDo;
    newToDos.forEach((toDoDate, index) => {
      if (toDoDate.id === toDo.id) {
        newToDo = {
          text: toDo.text,
          id: toDo.id,
          category: toDo.category,
          checked: toDo.checked,
          date: toDo.date,
        };
        console.log(index);
      }
    });
    return newToDo;
  });
  console.log(returnToDos);
  return returnToDos;
}

function ToDoList() {
  const [totalToDos, setTotalToDos] = useRecoilState(totalToDosState);
  const date = useRecoilValue(dateState);
  const dateKey = returnDateKey(date);
  const toDosByDate = totalToDos[dateKey].toDos;
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) {
      console.log("hello");
      return;
    }
    setTotalToDos((prevTotal) => {
      const toDosCopy = [...prevTotal[dateKey].toDos];
      const targetToDo = returnTargetToDo(toDosCopy, draggableId);
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination.index, 0, targetToDo); 
      // returnTargetToDo를 바로 넣을 시 error. (Uncaught TypeError: Cannot read properties of undefined (reading 'id')) why?
      const curTotal = { ...prevTotal, [dateKey]: { toDos: toDosCopy } };
      localStorage.setItem(TODOS_KEY, JSON.stringify(curTotal));
      return curTotal;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ToDoList">
        {(provided) => (
          <Contents ref={provided.innerRef} {...provided.droppableProps}>
            {toDosByDate.map((toDo, index) => (
              <DraggableToDo key={toDo.id} toDo={toDo} index={index} />
            ))}
          </Contents>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ToDoList;
