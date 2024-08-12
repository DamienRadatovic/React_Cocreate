import LogList from '@/components/project/log/log-list/LogList.tsx';
import TaskDetail from '@/components/project/task/task-detail/TaskDetail.tsx';
import { useProject } from '@/contexts/project.context.tsx';

const ProjectContent = () => {
    const { detailTask } = useProject();
    
    return <>
        <div className={`detail-projects-bottom-container ${detailTask ? '' : 'close'}`}>
            <LogList />
            <TaskDetail/>
        </div>
    </>;
};

export default ProjectContent;