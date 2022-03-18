import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDosState } from "../atom";

const InputContainer = styled.div`
  width: 90%;
  height: 50px;
  span {
    font-size: 12px;
  }
`;

const ToDoForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
`;

const ToDoInput = styled.input`
  width: 90%;
  height: 30px;
  font-size: 15px;
  background-color: transparent;
  border-width: 0 0 2px;
  border-color: ${(props) => props.theme.textColor};
  margin-right: 7px;
  :focus {
      outline: none;
  }
`;

const CreateButton = styled.button`
  width: 30px;
  height: 30px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  border-color: ${(props) => props.theme.textColor};

  &:after {
    width: 18px;
    height: 4px;
    left: 4px;
    top: 11px;
  }

  &:before {
    width: 4px;
    height: 18px;
    left: 11px;
    top: 4px;
  }
  position: relative;

  &:after,
  &:before {
    content: "";
    position: absolute;
    background: ${(props) => props.theme.textColor};
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
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
      setToDos((prev) => [{ text: toDo, id: Date.now(), category, checked: false }, ...prev]);
      setValue("toDo", "");
    };
    return (
      <InputContainer>
        <ToDoForm onSubmit={handleSubmit(onValid)}>
          <ToDoInput
            {...register("toDo", {
              required: "Contents are required",
              minLength: { value: 5, message: "Contents are too short" },
            })}
            placeholder={`Write a ${category.toLowerCase()}`}
          />
          <CreateButton />
        </ToDoForm>
        <span>{errors.toDo?.message}</span>
      </InputContainer>
    );
}

export default CreateToDo;