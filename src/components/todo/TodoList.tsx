import { List, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useUpdateItemModal } from "../../hooks/useUpdateItemModal";
import { useAppStore } from "../../stores/appStore";
import { UpdateItemModal } from "../modals/items/UpdateItemModal";

export const TodoList = () => {
    const [appState, appActions] = useAppStore();
    const { updateItemModalVisible, showUpdateItemModal, cancelUpdateItemModal } = useUpdateItemModal();

    return (
        <>
            <UpdateItemModal 
                visible={updateItemModalVisible}
                onCancel={cancelUpdateItemModal}
            />
            <List style={{ overflowY: 'auto' }}
                className="demo-loadmore-list"
                loading={appState.loading}
                dataSource={appState.category.todoItems}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                checked={item.isDone}
                                onClick={() => item.isDone = !item.isDone}
                                onChange={() => appActions.updateItemReadiness(item.id, !item.isDone)}
                            />,
                            <a 
                                key="list-loadmore-edit"
                                onClick={() => showUpdateItemModal(item)}
                            >edit</a>,
                            <a 
                                key="list-loadmore-edit"
                                onClick={() => appActions.deleteItem(item.id)}
                            >delete</a>
                        ]}
                    >
                        <List.Item.Meta
                            title={<p>{item.text}</p>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}