import { useState } from "react";
import { Item } from "../models/itemModel";
import { useAppStore } from "../stores/appStore";

export const useUpdateItemModal = () => {
    const [appState, appActions] = useAppStore();
    const [updateItemModalVisible, setUpdateItemModalVisible] = useState<boolean>(false);

    const showUpdateItemModal = (item: Item) => {
        appState.editingItem = item;
        setUpdateItemModalVisible(true);
    }
    const cancelUpdateItemModal = () => setUpdateItemModalVisible(false);

    return { updateItemModalVisible, showUpdateItemModal, cancelUpdateItemModal } 
}