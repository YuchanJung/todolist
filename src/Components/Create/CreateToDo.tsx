import { AnimatePresence, motion, Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { allToDosState, categoryState, dateState, IAllToDos, IToDo, returnDateKey, showingCreatePageState, TODOS_KEY } from "../../atom";
import ArrowIcon from "../Icons/ArrowIcon";

const PREV = "left";

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 30px;
  width: 380px;
  min-width: 380px;
  height: 470px;
  border-radius: 15px;
  padding: 10px 25px;
  background-color: ${(props) => props.theme.background.createToDo};
`;

const Header = styled.header`
  width: 100%;
  height: 12%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PrevButton = styled.button`
  width: 30px;
  height: 30px;
`;

const Form = styled.form`
  height: 280px;
  display: flex;
  flex-direction: column;
  margin: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  span {
    position: absolute;
    font-size: 16px;
    bottom: 10px;
    right: 3px;
  }
`;

const Label = styled.label`
  width: 100px;
  font-size: 18px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 40px;
  font-size: 20px;
  background-color: transparent;
  border-width: 0 0 2px;
  border-color: ${(props) => props.theme.text.basic};
  color: ${(props) => props.theme.text.basic};
  margin-bottom: 30px;
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 50px;
  height: 30px;
  background-color: white;
`;

const wrapperVariants: Variants = {
  hidden: {
    y: 470,
  },
  visible: {
    y: 0,
  },
};

interface IForm {
  title: string;
  details: string;
}

function CreateToDo() {
  const [showingCreatePage, setShowingCreatePage] = useRecoilState(
    showingCreatePageState
  );
  const toggleClicked = () => {
    setShowingCreatePage((prev) => !prev);
  };
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
  const onValid = ({ title, details }: IForm) => {
    setAllToDos((prevAllToDos) => {
      const oldToDos = prevAllToDos[dateKey].toDos;
      const newToDos: IToDo[] = [
        ...oldToDos,
        {
          task: {
            title,
            details,
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
    setValue("title", "");
    setValue("details", "");
    setShowingCreatePage((prev) => !prev);
    // useRecoilState 사용 후 lacalStorage.setItem(TODOS_KEY, toDos); 하면 prev todos가 저장됨. why?
  };
  return (
    <AnimatePresence>
      {showingCreatePage && (
        <Wrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ type: "tween", duration: 0.3 }}
        >
          <Header>
            <PrevButton onClick={toggleClicked}>
              <ArrowIcon direction={PREV} className="backHome" />
            </PrevButton>
          </Header>
          <Form onSubmit={handleSubmit(onValid)}>
            <InputWrapper>
              <Label>Title</Label>
              <Input
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 5, message: "title is too short" },
                })}
                placeholder="Write a title of todo"
              />
              <span>{errors.title?.message}</span>
            </InputWrapper>
            <InputWrapper>
              <Label>Details</Label>
              <Input
                {...register("details", {
                  required: "Details are required",
                  minLength: { value: 10, message: "details are too short" },
                })}
                placeholder="Write details of todo"
              />
              <span>{errors.details?.message}</span>
            </InputWrapper>
            <Button />
          </Form>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default CreateToDo;
