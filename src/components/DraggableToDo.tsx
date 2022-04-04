import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDosState, TODOS_KEY } from "../atom";

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


function deletedToDos(oldToDos: IToDo[], targetIndex: number) {
  const ToDosFilter = oldToDos.filter((toDo, index) => index !== targetIndex);
  const ToDosIndexing = ToDosFilter.map((toDo, index) => {
    const newToDo: IToDo = {
      text: toDo.text,
      id: toDo.id,
      category: toDo.category,
      checked: toDo.checked,
      date: toDo.date,
      index,
    };
    return newToDo;
  })
  console.log(ToDosIndexing);
  return ToDosIndexing;
}

function addedToDos(oldToDos: IToDo[], newToDo: IToDo, targetIndex: number) {
  return [
    ...oldToDos.slice(0, targetIndex),
    newToDo,
    ...oldToDos.slice(targetIndex + 1),
  ];
}

function DraggableToDo({ text, id, category, checked, date, index}: IToDo) {
  const setToDos = useSetRecoilState(toDosState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((td) => td.id === id);
      let newToDos = [];
      if (name === "DELETE") {
        newToDos = deletedToDos(oldToDos, targetIndex);
      } else {
        const newToDo = {
          text,
          id,
          category: name as Categories,
          checked,
          date,
          index
        };
        newToDos = addedToDos(oldToDos, newToDo, targetIndex);
      }
      localStorage.setItem(TODOS_KEY, JSON.stringify(newToDos));
      return newToDos;
    });
  };
  const onChange = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((td) => td.id === id);
      const newToDo = { text, id, category, checked: !checked, date, index };
      const newToDos = addedToDos(oldToDos, newToDo, targetIndex);
      localStorage.setItem(TODOS_KEY, JSON.stringify(newToDos));
      return newToDos;
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
          <DeleteButton name="DELETE" onClick={onClick}>
            Delete
          </DeleteButton>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default DraggableToDo;
