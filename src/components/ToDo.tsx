import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDosState } from "../atom";

const ToDoContainer = styled.div`
  width: 90%;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDosState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as Categories };
      // console.log(newToDo) -> error handling
      return name !== "DELETE"
        ? [
            ...oldToDos.slice(0, targetIndex),
            newToDo,
            ...oldToDos.slice(targetIndex + 1),
          ]
        : [
            ...oldToDos.slice(0, targetIndex),
            ...oldToDos.slice(targetIndex + 1),
          ];
    });
  };
  return (
    <ToDoContainer>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button name="DELETE" onClick={onClick}>
        Delete
      </button>
    </ToDoContainer>
  );
}

export default ToDo;