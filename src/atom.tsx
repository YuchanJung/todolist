import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}
  
export const toDosState = atom<IToDo[]>({
  key: "toDos",
  default: [],
});

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDosSelector = selector({
  key: "toDosSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});