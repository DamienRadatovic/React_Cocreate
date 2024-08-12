import './ProjectItem.css';
import ProjectInterface from '@/interfaces/project.interface.ts';
import CheckBox from '@/components/general/checkbox/CheckBox.tsx';

interface Props {
    project: ProjectInterface;
    isSelected: boolean;
    onCheckItem: (state: boolean) => void,
}


const ProjectItem = ({ project, isSelected, onCheckItem }: Props) => {

    return <>
        <td className="select">
            <div className="select-container">
                <CheckBox state={isSelected} onChangSelected={onCheckItem} value={''}/>
            </div>
        </td>
        <td className="name">{project.name}</td>
        <td className="createdDate">{project.createdDate.toDateString()}</td>
        <td className="updatedDate">{project.updatedDate == null ? 'Not updated' : project.updatedDate.toDateString()}</td>
        <td className="owner">{project.owner.name}</td>
    </>;
};

export default ProjectItem;
