import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { IToDo, toDosDateSelector, toDosState } from "../atom";
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
          index,
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
  const toDosByDate = useRecoilValue(toDosDateSelector);
  const [toDos, setToDos] = useRecoilState(toDosState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      const ToDosByDateCopy = [...toDosByDate];
      const ToDo = returnTargetToDo(toDosByDate, draggableId);
      ToDosByDateCopy.splice(source.index, 1);
      ToDosByDateCopy.splice(destination.index, 0, ToDo);
      return changeToDosIndex(ToDosByDateCopy, toDosCopy);
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ToDoList">
        {(provided) => (
          <Contents ref={provided.innerRef} {...provided.droppableProps}>
            {toDosByDate.map((toDo) => (
              <DraggableToDo key={toDo.id} {...toDo} />
            ))}
          </Contents>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ToDoList;
