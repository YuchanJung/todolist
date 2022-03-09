import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  todo: string;
  password: string;
  pwConfirmation: string;
  email: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>({
    defaultValues: {
      email: "~@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password !== data.pwConfirmation) {
      setError(
        "pwConfirmation",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    else {
        setValue("todo", "");
    }
  };
  /*
    const [toDo, setToDo] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
          currentTarget: { value },
        } = event;
        setToDo(value);
    };b 
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(toDo);
    }
    */
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("todo", {
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
        <span>{errors?.todo?.message}</span>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors.email?.message}</span>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password is too short" },
          })}
          placeholder="Password"
        />
        <span>{errors.password?.message}</span>
        <input
          {...register("pwConfirmation", {
            required: "Password Confirmation is required",
            minLength: {
              value: 8,
              message: "Password Confirmation is too short",
            },
          })}
          placeholder="password confirmation"
        />
        <span>{errors.pwConfirmation?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
