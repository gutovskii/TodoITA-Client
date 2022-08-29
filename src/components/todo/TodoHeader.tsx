import { Button } from "antd";
import { useCreateItemModal } from "../../hooks/useCreateItemModal";
import { useAppStore } from "../../stores/appStore";
import { CreateItemModal } from "../modals/items/CreateItemModal";

export const TodoHeader = () => {
    const [appState, appActions] = useAppStore();
    const { createItemModalVisible, showCreateItemModal, cancelCreateItemModal } = useCreateItemModal();

    return (
        <div className="info-action-block">
            <h2>{appState.category.title}</h2>
            { appState.category.title && 
                <>
                    <Button type="primary" onClick={showCreateItemModal}>Add</Button>
                    <CreateItemModal 
                        visible={createItemModalVisible}
                        onCancel={cancelCreateItemModal}
                    />
                </>
            } 
        </div>
    )
}