import './ProjectList.css';
import { SvgAddElement } from '@/components/general/svg/SvgComponent.tsx';
import ActionButton from '@/components/general/action-button/ActionButton.tsx';
import ProjectsFilters from '@/components/projects/projects-filters/ProjectsFilters.tsx';
import TableProjects from '@/components/projects/projects-table/TableProjects.tsx';
import { useProjects } from '@/contexts/projects.context.tsx';

const ProjectList = () => {
    const { createNewProject } = useProjects();
    const handleClickCreatProject = async (): Promise<void> => {
        createNewProject();
    };
    
    return <>
        <div className="projects-list-container">
            <div className="projects-list-header">
                <ActionButton onClickButton={handleClickCreatProject} type="stroke">
                    <SvgAddElement />
                    <p>Create project</p>
                </ActionButton>
            </div>
            <ProjectsFilters />
            <TableProjects />
        </div>
    </>;
};

export default ProjectList;
