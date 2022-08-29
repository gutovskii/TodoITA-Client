import { Item } from "./itemModel";

export interface Category {
    id: number;
    title: string;
    todoItems?: Item[];
}