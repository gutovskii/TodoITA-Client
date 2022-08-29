import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { useAppStore } from "../../../stores/appStore";
import { UpdateCategoryData } from "../../../types/categories";

interface UpdateCategoryModalProps {
    visible: boolean;
    onCancel: () => void;
}

export const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({ 
    visible, onCancel
}) => {
    const [appState, appActions] = useAppStore();
    const [updateCategoryForm] = Form.useForm<UpdateCategoryData>();

    useEffect(() => {
        if (visible) {
            updateCategoryForm.setFieldsValue({
                title: appState.editingCategory.title
            })
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            title="Edit category"
            okText="Edit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                updateCategoryForm
                    .validateFields()
                    .then((updateCategoryData: UpdateCategoryData) => {
                        updateCategoryForm.resetFields();
                        appActions.updateCategory(appState.editingCategory.id, updateCategoryData);
                        onCancel();
                    })
                    .catch(info => {
                        console.log('Validation Failed: ', info);
                    })
            }}
        >
            <Form
                form={updateCategoryForm}
                layout="vertical"
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        { required: true, message: 'Please input the title' },
                        { max: 30, message: 'Max length of the title is 30 symbols' }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}