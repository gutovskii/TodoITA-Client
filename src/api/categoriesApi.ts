import axios from "axios";
import { Category } from "../models/categoryModel";
import { CreateCategoryData, UpdateCategoryData } from "../types/categories";

const instance = axios.create({
    baseURL: 'https://localhost:44367/categories'
});

export class CategoriesApi {
    async getCategories() {
        return await instance.get<Category[]>('/');
    }

    async getCategory(id: number) {
        return await instance.get<Category>(`/${id}`);
    }

    async createCategory(data: CreateCategoryData) {
        return await instance.post<Category>('/', data);
    }

    async updateCategory(id: number, data: UpdateCategoryData) {
        return await instance.put<Category>(`/${id}`, data);
    }

    async deleteCategory(id: number) {
        return await instance.delete<null>(`/${id}`);
    }
}