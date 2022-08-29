import { Item } from "../models/itemModel";

export type CreateItemData = Pick<Item, 'text' | 'description' | 'isDone' | 'todoCategoryId'>
export type UpdateItemData = Pick<Item, 'text' | 'description' | 'isDone'>