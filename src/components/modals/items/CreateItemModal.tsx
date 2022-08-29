import { Checkbox, Form, Input, Modal } from "antd"
import { useAppStore } from "../../../stores/appStore";
import { CreateItemData } from "../../../types/items";

interface CreateItemModalProps {
    visible: boolean;
    onCancel: () => void;
}

export const CreateItemModal: React.FC<CreateItemModalProps> = ({
    visible, onCancel
}) => {
    const [appState, appActions] = useAppStore();
    const [createItemForm] = Form.useForm<CreateItemData>();

    return (
        <Modal
            visible={visible}
            title="Add task"
            okText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                createItemForm
                    .validateFields()
                    .then(createItemData => {
                        createItemForm.resetFields();
                        appActions.createItem(createItemData);
                        onCancel();
                    })
                    .catch(info => {
                        console.log('Validation Failed: ', info);
                    });
            }}
        >
            <Form
                form={createItemForm}
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
    )
}
