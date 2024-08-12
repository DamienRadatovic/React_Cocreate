import './NavBarItem.css';
import {
    SvgBoard,
    SvgCalendar,
    SvgDev,
    SvgHome,
    SvgIssues,
    SvgMarketing,
    SvgPen,
    SvgPercent,
    SvgProject
} from '@/components/general/svg/SvgComponent.tsx';
import { ReactNode } from 'react';

interface Props {
    title: string,
    svg: string
}

const NavBarItem = ({ title, svg }: Props) => {
    
    const svgList: { [key: string]: ReactNode } = {
        'svgHome': <SvgHome />,
        'svgProject': <SvgProject />,
        'svgIssues': <SvgIssues />,
        'svgBoards': <SvgBoard />,
        'svgCalendar': <SvgCalendar />,
        'svgPen': <SvgPen />,
        'svgDev': <SvgDev />,
        'svgMarketing': <SvgMarketing />,
        'svgPercent': <SvgPercent />,
    };

    return (
        <div className="nav-element-container">
            <div className="nav-element-icon">
                { svgList[svg] }
            </div>
            <h3>{title}</h3>
        </div>
    );
};

export default NavBarItem;
