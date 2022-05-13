import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  allToDosState,
  categoryState,
  dateState,
  IAllToDos,
  IToDo,
  returnDateKey,
  TODOS_KEY,
} from "../../atom";

const Wrapper = styled.div`
  width: 90%;
  height: 50px;
  position: relative;
  span {
    position: absolute;
    font-size: 13px;
    right: 45px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px;
`;

const Input = styled.input`
  width: 85%;
  height: 30px;
  font-size: 15px;
  background-color: transparent;
  border-width: 0 0 2px;
  border-color: ${(props) => props.theme.text.basic};
  margin: 0px 8px 0px 12px;
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  border: 2px solid ${(props) => props.theme.text.basic};
  background-color: transparent;
  margin-right: 8px;

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
    background: ${(props) => props.theme.text.basic};
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
  const setAllToDos = useSetRecoilState(allToDosState);
  const category = useRecoilValue(categoryState);
  const date = useRecoilValue(dateState);
  const dateKey = returnDateKey(date);
  const onValid = ({ toDo }: IForm) => {
    setAllToDos((prevAllToDos) => {
      const oldToDos = prevAllToDos[dateKey].toDos;
      const newToDos: IToDo[] = [
        ...oldToDos,
        {
          task: {
            title: toDo,
            details: toDo,
          },
          id: Date.now(),
          category,
          checked: false,
          date,
        },
      ];
      const newAllToDos: IAllToDos = {
        ...prevAllToDos,
        [dateKey]: { toDos: newToDos },
      };
      localStorage.setItem(TODOS_KEY, JSON.stringify(newAllToDos));
      return newAllToDos;
    });
    setValue("toDo", "");
    // useRecoilState 사용 후 lacalStorage.setItem(TODOS_KEY, toDos); 하면 prev todos가 저장됨. why?
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("toDo", {
            required: "Contents are required",
            minLength: { value: 5, message: "Contents are too short" },
          })}
          placeholder={`Write a ${category.toLowerCase()}`}
        />
        <Button />
      </Form>
      <span>{errors.toDo?.message}</span>
    </Wrapper>
  );
}

export default CreateToDo;
