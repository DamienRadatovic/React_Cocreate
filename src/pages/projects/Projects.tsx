import './Projects.css';
import ProjectList from '@/components/project/project-list/ProjectList.tsx';
import ProjectsHeader from '@/components/projects/projects-header/ProjectsHeader.tsx';

const Projects = () => {
    return (
        <div className="projects-container">
            <ProjectsHeader />
            <ProjectList />
        </div>
    );
};

export default Projects;
