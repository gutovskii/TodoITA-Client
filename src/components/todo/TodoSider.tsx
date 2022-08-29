import React, { useEffect } from "react";
import { Button, Form, Input, Layout, Menu } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateCategoryModal } from "../../hooks/useUpdateCategoryModal";
import { useAppStore } from "../../stores/appStore";
import { CreateCategoryData } from "../../types/categories";
import { DeleteCategoryModal } from "../modals/categories/DeleteCategoryModal";
import { UpdateCategoryModal } from "../modals/categories/UpdateCategoryModal";

const { Sider } = Layout;

export const TodoSider: React.FC = () => {
    const [appState, appActions] = useAppStore();
    const [createCategoryForm] = Form.useForm();

    const { updateCategoryModalVisible, showUpdateCategoryModal, cancelUpdateCategoryModal } = useUpdateCategoryModal();

    useEffect(() => {
        appActions.getCategories();
    }, []);

    return (
        <Sider
            style={{
                maxHeight: '100%'
            }}
            breakpoint="lg"
            collapsedWidth="0"
        >
            <Form 
                form={createCategoryForm}
                layout="inline"
                onFinish={(createCategoryData: CreateCategoryData) => {
                    appActions.createCategory(createCategoryData);
                    createCategoryForm.resetFields();
                }}
            >
                <Form.Item name="title" style={{ width: '100%' }}>
                    <Input 
                        required
                        placeholder="Cat"
                        maxLength={30}
                        style={{ borderRadius: 0 }}
                    />
                </Form.Item> 
                <Form.Item style={{ width: '100%' }}>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        style={{ width: '100%', borderRadius: 0 }}
                    >
                        Add
                    </Button>
                </Form.Item>
            </Form>
            <UpdateCategoryModal
                visible={updateCategoryModalVisible}
                onCancel={cancelUpdateCategoryModal}
            />
            <Menu
                style={{
                    overflowY: 'auto',
                    height: 'calc(100vh - 64px)'
                }}
                theme="dark"
                mode="inline"
                selectedKeys={[appState.category.id.toString()]}
                items={appState.categories.map(
                    category => ({
                        key: category.id,
                        label: category.title,
                        itemIcon: <>
                            <EditOutlined onClick={e => {
                                e.stopPropagation();
                                showUpdateCategoryModal(category)
                            }} />
                            <DeleteCategoryModal id={category.id}/>
                        </>,
                        onClick: () => appActions.getCategory(category.id)
                    })
                )}
            />
        </Sider>
    );
}