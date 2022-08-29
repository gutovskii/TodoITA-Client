import { useState } from "react"
import { Category } from "../models/categoryModel";
import { useAppStore } from "../stores/appStore";

export const useUpdateCategoryModal = () => {
    const [appState, appActions] = useAppStore();
    const [updateCategoryModalVisible, setUpdateCategoryModalVisible] = useState<boolean>(false);

    const showUpdateCategoryModal = (category: Category) => {
        appState.editingCategory = category;
        setUpdateCategoryModalVisible(true);
    }
    const cancelUpdateCategoryModal = () => setUpdateCategoryModalVisible(false);

    return { updateCategoryModalVisible, showUpdateCategoryModal, cancelUpdateCategoryModal } 
}