import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDosState } from "../atom";

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
    const onValid = ({ toDo }: IForm) => {
      setToDos((prev) => [
        { text: toDo, id: Date.now(), category: "TO_DO" },
        ...prev,
      ]);
      setValue("toDo", "");
    };
    return (
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: "Todo is required",
            minLength: { value: 5, message: "Todo is too short" },
            validate: {
              noHello: (value) =>
                !value.includes("hello") || "No hello allowed",
              noHi: (value) => !value.includes("hi") || "No hi allowed",
            },
          })}
          placeholder="Write a to do"
        />
        <span>{errors.toDo?.message}</span>
        <button>Add</button>
      </form>
    );
}

export default CreateToDo;