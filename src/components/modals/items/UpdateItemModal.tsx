import { Checkbox, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { useAppStore } from "../../../stores/appStore";
import { UpdateItemData } from "../../../types/items";

interface UpdateItemModalProps {
    visible: boolean;
    onCancel: () => void;
}

export const UpdateItemModal: React.FC<UpdateItemModalProps> = ({
    visible, onCancel
}) => {
    const [appState, appActions] = useAppStore();
    const [updateItemForm] = Form.useForm<UpdateItemData>();

    useEffect(() => {
        if (visible) {
            updateItemForm
                .setFieldsValue({
                    text: appState.editingItem.text,
                    description: appState.editingItem.description,
                    isDone: appState.editingItem.isDone
                });
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            title="Edit task"
            okText="Edit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                updateItemForm
                    .validateFields()
                    .then(updateItemData => {
                        updateItemForm.resetFields();
                        appActions.updateItem(appState.editingItem.id, updateItemData);
                        onCancel();
                    })
                    .catch(info => {
                        console.log('Validation Failed: ', info);
                    });
            }}
            
        >
            <Form
                form={updateItemForm}
                layout="vertical"
            >
                <Form.Item
                    name="text"
                    label="Text"
                    rules={[
                        { required: true, message: 'Please input the title' },
                        { max: 50, message: 'Max length of the title is 50 symbols' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        { required: true, message: 'Please input the description' },
                        { max: 100, message: 'Max length of description is 100 symbols' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="isDone"
                    valuePropName="checked"
                >
                    <Checkbox>Is done?</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
}