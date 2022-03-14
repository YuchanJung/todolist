import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDosState } from "../atom";

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
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: "Contents are required",
            minLength: { value: 5, message: "Contents are too short" },
          })}
          placeholder={`Write a ${category.toLowerCase()}`}
        />
        <span>{errors.toDo?.message}</span>
        <button>Add</button>
      </form>
    );
}

export default CreateToDo;