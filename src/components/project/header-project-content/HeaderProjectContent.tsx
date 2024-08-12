import './HeaderProjectContent.css';
import ActionButton from '@/components/general/action-button/ActionButton.tsx';
import { SvgAddElement } from '@/components/general/svg/SvgComponent.tsx';
import Modal from '@/components/general/modal/Modal.tsx';
import { useState } from 'react';
import TaskForm from '@/components/project/new-task/TaskForm.tsx';
import TaskInterface from '@/interfaces/task.interface.ts';
import { useProject } from '@/contexts/project.context.tsx';


const HeaderProjectContent = () => {
    const { addNewTask, project } = useProject();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSendForm = (data: TaskInterface): void => {
        addNewTask(data);
        setIsModalOpen(false);
    };

    return <>
        <div className="project-list-container">
            <div className="project-list-header">
                <ActionButton onClickButton={() => setIsModalOpen(true)} type="stroke">
                    <SvgAddElement/>
                    <p>Create Task</p>
                </ActionButton>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <TaskForm projectId={project?.projectId} onSendForm={handleSendForm} />
                </Modal>
            </div>
        </div>
    </>;
};

export default HeaderProjectContent;