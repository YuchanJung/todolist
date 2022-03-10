import { useRecoilValue } from "recoil";
import { toDosState } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDosState);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
          // <ToDo text={toDo.text} id={toDo.id} category={toDo.category}/>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
