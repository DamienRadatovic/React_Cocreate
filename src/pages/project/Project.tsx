import './Project.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useProject } from '@/contexts/project.context.tsx';
import ProjectHeader from '@/components/project/project-header/ProjectHeader.tsx';
import ProjectContent from '@/components/project/project-content/ProjectContent.tsx';

const Project = () => {
    const { id } = useParams();
    const { project, setProjectById } = useProject();


    useEffect(() => {
        if (id) {
            setProjectById(id);
        } else {
            console.error('Project have no ID');
        }
    }, []);

    return <>
        <div className="detail-projects-container">
            {
                project ? <>
                    <ProjectHeader />
                    <ProjectContent />
                </> : null
            }
        </div>
    </>;
};

export default Project;
