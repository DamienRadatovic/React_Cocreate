import './ProjectList.css';
import ProjectsFilters from '@/components/projects/projects-filters/ProjectsFilters.tsx';
import TableProjects from '@/components/projects/projects-table/TableProjects.tsx';

const ProjectList = () => {
    return <>
        <div className="projects-list-container">
            <ProjectsFilters />
            <TableProjects />
        </div>
    </>;
};

export default ProjectList;
