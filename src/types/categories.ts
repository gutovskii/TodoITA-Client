import { Category } from "../models/categoryModel";

export type CreateCategoryData = Pick<Category, 'title'>
export type UpdateCategoryData = Pick<Category, 'title'>