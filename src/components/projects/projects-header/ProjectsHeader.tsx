import './ProjectsHeader.css';
import { DateTime } from 'luxon';
import ActionButton from '@/components/general/action-button/ActionButton.tsx';
import { SvgAddUser } from '@/components/general/svg/SvgComponent.tsx';
import { useProjects } from '@/contexts/projects.context.tsx';

const ProjectsHeader = () => {
    const { projects } = useProjects();
    
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
            <ActionButton onClickButton={() => {
            }} type="fill">
                <SvgAddUser/>
                <p>Add people</p>
            </ActionButton>
        </div>
    </>;
};

export default ProjectsHeader;