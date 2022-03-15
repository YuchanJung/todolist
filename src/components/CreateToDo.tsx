import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDosState } from "../atom";

const InputContainer = styled.div`
  width: 90%;
  height: 50px;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
    input {
      width: 90%;
      height: 30px;
      font-size: 15px;
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      border-radius: 15px;
      border-color: transparent;
      margin-right: 7px;
    }
  }
  span {
    font-size: 12px;
  }
`;

const CreateBtn = styled.button`
  width: 30px;
  height: 30px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  border-color: transparent;

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
    background: ${(props) => props.theme.bgColor};
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
      setToDos((prev) => [{ text: toDo, id: Date.now(), category }, ...prev]);
      setValue("toDo", "");
    };
    return (
      <InputContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("toDo", {
              required: "Contents are required",
              minLength: { value: 5, message: "Contents are too short" },
            })}
            placeholder={`Write a ${category.toLowerCase()}`}
          />
          <CreateBtn />
        </form>
        <span>{errors.toDo?.message}</span>
      </InputContainer>
    );
}

export default CreateToDo;