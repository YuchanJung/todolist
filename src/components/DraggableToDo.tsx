import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  dateState,
  IToDo,
  ITotalToDos,
  returnDateKey,
  TODOS_KEY,
  totalToDosState,
} from "../atom";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 90%;
  min-height: 40px;
  font-size: 24px;
  padding: 5px 10px;
  margin: 4px;
  label {
    display: inline-block;
    margin-left: 7px;
  }
`;

const Input = styled.input`
  margin-right: 10px;
  :checked + label {
    color: ${(props) => props.theme.cardShadowColor}; // have to change
    text-decoration: line-through;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  width: 65px;
  height: 30px;
  border-radius: 15px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.textColor};
`;

interface IDraggableToDoProps {
  toDo: IToDo;
  index: number;
}

function deletedToDos(oldToDos: IToDo[], targetIndex: number) {
  return [
    ...oldToDos.slice(0, targetIndex),
    ...oldToDos.slice(targetIndex + 1),
  ];
}

// for changing checked or categories
function addedToDos(oldToDos: IToDo[], newToDo: IToDo, targetIndex: number) {
  return [
    ...oldToDos.slice(0, targetIndex),
    newToDo,
    ...oldToDos.slice(targetIndex + 1),
  ];
}

function DraggableToDo({ toDo, index }: IDraggableToDoProps) {
  const { text, id, category, checked, date } = toDo;
  const setTotalToDos = useSetRecoilState(totalToDosState);
  const dateKey = returnDateKey(useRecoilValue(dateState));
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    /* 
    const {
      currentTarget: { name },
    } = event;
    */
    setTotalToDos((prevTotal) => {
      const oldToDos = prevTotal[dateKey].toDos;
      const targetIndex = oldToDos.findIndex((td) => td.id === id);
      const newToDos = deletedToDos(oldToDos, targetIndex);
      const curTotal: ITotalToDos = {
        ...prevTotal,
        [dateKey]: { toDos: newToDos },
      };
      localStorage.setItem(TODOS_KEY, JSON.stringify(curTotal));
      return curTotal;
    });
  };
  const onChange = () => {
    setTotalToDos((prevTotal) => {
      const oldToDos = prevTotal[dateKey].toDos;
      const targetIndex = oldToDos.findIndex((td) => td.id === id);
      const newToDo = { text, id, category, checked: !checked, date };
      const newToDos = addedToDos(oldToDos, newToDo, targetIndex);
      const curTotal: ITotalToDos = {
        ...prevTotal,
        [dateKey]: { toDos: newToDos },
      };
      localStorage.setItem(TODOS_KEY, JSON.stringify(curTotal));
      return curTotal;
    });
  };
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            id={id.toString()}
          />
          <label htmlFor={id.toString()}>{text}</label>
          <DeleteButton name="DELETE" onClick={onDelete}>
            Delete
          </DeleteButton>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default DraggableToDo;
