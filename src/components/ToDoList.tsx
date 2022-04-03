import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDosDateSelector } from "../atom";
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

function ToDoList() {
  const toDosByDate = useRecoilValue(toDosDateSelector);
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ToDoList">
        {(provided) => (
          <Contents ref={provided.innerRef} {...provided.droppableProps}>
            {toDosByDate.map((toDo, index) => (
              <DraggableToDo key={toDo.id} {...toDo} />
            ))}
          </Contents>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ToDoList;
