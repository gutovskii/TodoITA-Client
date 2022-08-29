import { Action, createHook, createStore } from "react-sweet-state";
import { CategoriesApi } from "../api/categoriesApi";
import { ItemsApi } from "../api/itemsApi";
import { Category } from "../models/categoryModel";
import { Item } from "../models/itemModel";
import { CreateCategoryData, UpdateCategoryData } from "../types/categories";
import { CreateItemData, UpdateItemData } from "../types/items";

type State = {
    loading: boolean,
    editingCategory: Category,
    editingItem: Item,
    category: Category
    categories: Category[],
};
type Actions = typeof actions;

const initialState: State = {
    loading: false,
    editingCategory: { id: 0, title: '' },
    editingItem: { id: 0, text: '', description: '', isDone: false, todoCategoryId: 0 },
    category: { id: 0, title: '', todoItems: [] },
    categories: [],
}

const categoriesApi = new CategoriesApi();
const itemsApi = new ItemsApi();

const actions = {
    getCategories: (): Action<State> =>
        async ({ setState, getState }) => {
            const categories = await categoriesApi.getCategories();
            setState({
                categories: categories.data
            });
        },
    
    getCategory: (id: number): Action<State> =>
        async ({ setState, getState }) => {
            setState({ loading: true });
            const category = await categoriesApi.getCategory(id);
            setState({
                loading: false,
                category: category.data
            });
        },
    
    createCategory: (data: CreateCategoryData): Action<State> =>
        async ({ setState, getState }) => {
            const response = await categoriesApi.createCategory(data);
            let modifiedCategories = [...getState().categories];
            modifiedCategories = modifiedCategories.concat(response.data);
            if (response.status === 201) {
                setState({
                    category: {
                        id: response.data.id,
                        title: response.data.title,
                        todoItems: []
                    },
                    categories: modifiedCategories
                });
            }
        },
    
    updateCategory: (id: number, data: UpdateCategoryData): Action<State> => 
        async ({ setState, getState }) => {
            const response = await categoriesApi.updateCategory(id, data);
            if (response.status === 200) {
                const modifiedCategories = [...getState().categories];
                const idxToUpdate = modifiedCategories.findIndex(category => category.id === id);
                modifiedCategories[idxToUpdate] = response.data;
                setState({
                    categories: modifiedCategories
                });
                if (id === getState().category.id) {
                    setState({
                        category: {
                            id: response.data.id,
                            title: response.data.title,
                            todoItems: [...getState().category.todoItems!]
                        }
                    });
                }
            }
        },

    deleteCategory: (id: number): Action<State> =>
        async ({ setState, getState }) => {
            const response = await categoriesApi.deleteCategory(id);
            if (response.status === 200) {
                const modifiedCategories = [...getState().categories];
                const idx = modifiedCategories.findIndex(category => category.id === id);
                modifiedCategories.splice(idx, 1);
                setState({
                    categories: modifiedCategories
                });
                if (id === getState().category.id) {
                    setState({
                        category: {
                            id: 0,
                            title: '',
                            todoItems: []
                        }
                    });
                }
            }
        },
    
    createItem: (itemToCreate: CreateItemData): Action<State> =>
        async ({ setState, getState, dispatch }) => {
            setState({ loading: true });
            itemToCreate.todoCategoryId = getState().category.id;
            const response = await itemsApi.createItem(itemToCreate);
            let modifiedTodoItems = [...getState().category.todoItems!];
            modifiedTodoItems = modifiedTodoItems?.concat(response.data);
            if (response.status === 201) {
                setState({
                    loading: false,
                    category: {
                        ...getState().category,
                        todoItems: modifiedTodoItems
                    }
                });
                dispatch(actions.getCategory(getState().category.id));
            }
        },

    updateItem: (id: number, itemToUpdate: UpdateItemData): Action<State> =>
        async ({ setState, getState, dispatch }) => {
            const response = await itemsApi.updateItem(id, itemToUpdate);
            if (response.status === 200) {
                const modifiedTodoItems = [...getState().category.todoItems!];
                const idxToUpdate = modifiedTodoItems?.findIndex(item => item.id === id);
                modifiedTodoItems![idxToUpdate!] = response.data;
                setState({
                    category: {
                        ...getState().category,
                        todoItems: modifiedTodoItems
                    }
                });
                dispatch(actions.getCategory(getState().category.id));
            }
        },

    updateItemReadiness: (id: number, isDone: boolean): Action<State> => 
        async ({ setState, getState, dispatch }) => {
            const response = await itemsApi.updateItemPatch(id, isDone);
            if (response.status === 200) {
                const modifiedTodoItems = [...getState().category.todoItems!];
                const idxToUpdate = getState().category.todoItems?.findIndex(item => item.id === id)!;
                modifiedTodoItems![idxToUpdate] = response.data;
                setState({
                    category: {
                        ...getState().category,
                        todoItems: modifiedTodoItems
                    }
                })
                dispatch(actions.getCategory(getState().category.id));
            }
        },

    deleteItem: (id: number): Action<State> => 
        async ({ setState, getState }) => {
            const response = await itemsApi.deleteItem(id);
            if (response.status === 200) {
                const modifiedTodoItems = [...getState().category.todoItems!];
                const idx = modifiedTodoItems?.findIndex(item => item.id === id);
                modifiedTodoItems?.splice(idx!, 1);
                setState({
                    category: {
                        ...getState().category,
                        todoItems: modifiedTodoItems
                    }
                });
            }
        }    
}

const Store = createStore<State, Actions>({
    initialState,
    actions
});

export const useAppStore = createHook(Store);