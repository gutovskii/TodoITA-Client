import axios from "axios";
import { Item } from "../models/itemModel";
import { CreateItemData, UpdateItemData } from "../types/items";

const instance = axios.create({
    baseURL: 'https://localhost:44367/items'
});

export class ItemsApi {
    async createItem(data: CreateItemData) {
        return await instance.post<Item>('/', data);
    }

    async updateItem(id: number, data: UpdateItemData) {
        return await instance.put<Item>(`/${id}`, data);
    }

    async updateItemPatch(id: number, isDone: boolean) {
        return await instance.patch(`/${id}`, [{
            op: 'add',
            path: '/isDone',
            value: isDone
        }]);
    }

    async deleteItem(id: number) {
        return await instance.delete<null>(`/${id}`);
    } 
}