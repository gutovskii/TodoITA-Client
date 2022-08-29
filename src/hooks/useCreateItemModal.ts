import { useState } from "react"

export const useCreateItemModal = () => {
    const [createItemModalVisible, setCreateItemModalVisible] = useState<boolean>(false);

    const showCreateItemModal = () => setCreateItemModalVisible(true);
    const cancelCreateItemModal = () => setCreateItemModalVisible(false);

    return { createItemModalVisible, showCreateItemModal, cancelCreateItemModal }
}