import React from "react";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useAppStore } from "../../../stores/appStore";

interface DeleteCategoryModalProps {
    id: number
}

export const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({ id }) => {
    const [appState, appActions] = useAppStore();

    const showModal = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete the category?',
            onOk: () => appActions.deleteCategory(id)
        });
    }

    return (
        <CloseOutlined onClick={(e) => {
            e.stopPropagation();
            showModal();
        }}/>
    ); 
}