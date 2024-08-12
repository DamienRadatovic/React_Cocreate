import './ProjectHeader.css';
import { DateTime } from 'luxon';
import ActionButton from '@/components/general/action-button/ActionButton.tsx';
import { SvgAddUser, SvgArrow } from '@/components/general/svg/SvgComponent.tsx';
import { useProject } from '@/contexts/project.context.tsx';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const ProjectHeader = () => {
    const navigate: NavigateFunction = useNavigate();
    const { project } = useProject();
    
    const handleClickBackToProjects = (): void => {
        navigate('/projects');
    };
    
    return <>
        <div className="projects-header-container">
            <div className="projects-information">
                <div className="information-container">
                    <div className="back-projects">
                        <SvgArrow/>
                        <h4 onClick={handleClickBackToProjects}>Back to Projects</h4>
                    </div>
                    <h2>{project?.name}</h2>
                </div>
                <div className="information-container">
                    <h4>Today's Date</h4>
                    <h2>{DateTime.now().toFormat('MMM dd, yyyy')}</h2>
                </div>
                <div className="information-container">
                    <h4>People on Project</h4>
                    <div className="user-card-container">
                        {
                            project?.team.group ? Array(10).fill(project?.team?.group).flatMap(item => item).map((user, index) => {
                                if (index === 5) {
                                    return <div key={user.id + index} className="user-card number">
                                        <p>+{Array(10).fill(project?.team?.group).length - 5}</p>
                                    </div>;
                                }
                                if (index < 5) {
                                    return <div key={user.id + index} className="user-card">
                                        {
                                            user?.image ?
                                                <img src={user.image} alt="user-image"/>
                                                :
                                                <img
                                                    src='https://cdn.allmylinks.com/prod/User/photo/I/_/-/HSF9tPcmEmHBeXWgDg1gSn6eSHNQJXUS.jpg'
                                                    alt="generic-user-image"/>
                                        }
                                    </div>;
                                }
                                return null;
                            }) : null
                        }
                    </div>
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

export default ProjectHeader;