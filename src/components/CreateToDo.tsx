import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDosState } from "../atom";

const ToDoInputter = styled.input`
  width: 40vh;
  height: 25px;
  border-radius: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm<IForm>();
    const setToDos = useSetRecoilState(toDosState);
    const category = useRecoilValue(categoryState);
    const onValid = ({ toDo }: IForm) => {
      setToDos((prev) => [{ text: toDo, id: Date.now(), category }, ...prev]);
      setValue("toDo", "");
    };
    return (
      <InputContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <ToDoInputter
            {...register("toDo", {
              required: "Contents are required",
              minLength: { value: 5, message: "Contents are too short" },
            })}
            placeholder={`Write a ${category.toLowerCase()}`}
          />
          {/* <span>{errors.toDo?.message}</span> */}
          <button>Add</button>
        </form>
      </InputContainer>
    );
}

export default CreateToDo;