import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categories, categoryState, toDosSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoContainer = styled.div`
  display: flex;
  div {
    text-align: center;
    width: 250px;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDosSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as categories);
  };
  console.log(category);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TO_DO">ToDo</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
