import './ProjectsHeader.css';
import { DateTime } from 'luxon';
import ActionButton from '@/components/general/action-button/ActionButton.tsx';
import { SvgAddElement, SvgAddUser } from '@/components/general/svg/SvgComponent.tsx';
import { useProjects } from '@/contexts/projects.context.tsx';

const ProjectsHeader = () => {
    const { projects, createNewProject } = useProjects();

    const handleClickCreatProject = async (): Promise<void> => {
        createNewProject();
    };

    return <>
        <div className="projects-header-container">
            <div className="projects-information">
                <div className="information-container">
                    <h4>Today's Date</h4>
                    <h2>{DateTime.now().toFormat('MMM dd, yyyy')}</h2>
                </div>
                <div className="information-container">
                    <h4>Total Projects</h4>
                    <h2>{projects.length}</h2>
                </div>
            </div>
            <div className="actions">
                <ActionButton onClickButton={handleClickCreatProject} type="stroke">
                    <SvgAddElement />
                    <p>Create project</p>
                </ActionButton>
                <ActionButton onClickButton={() => {
                }} type="fill">
                    <SvgAddUser/>
                    <p>Add people</p>
                </ActionButton>
            </div>
        </div>
    </>;
};

export default ProjectsHeader;
