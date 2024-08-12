import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/auth.context.tsx';
import NavBarItem from '@/components/nav-bar/navBar-item/NavBarItem.tsx';
import { SvgLogo, SvgLogOut } from '@/components/general/svg/SvgComponent.tsx';

const NavBar = () => {
    const { logOut } = useAuth();

    const navList = [
        { path: '/', title: 'Dashboard', svg: 'svgHome' },
        { path: '/projects', title: 'Projects', svg: 'svgProject' },
        { path: '/', title: 'Issues', svg: 'svgIssues' },
        { path: '/', title: 'Boards', svg: 'svgBoards' },
        { path: '/', title: 'Calendar', svg: 'svgCalendar' },
    ];

    const teams = [
        { path: '/', title: 'Design', svg: 'svgPen' },
        { path: '/', title: 'Development', svg: 'svgDev' },
        { path: '/', title: 'Marketing', svg: 'svgMarketing' },
        { path: '/', title: 'Sales', svg: 'svgPercent' },
    ];
    
    const handleClickLogOut = (): void => {
        logOut();  
    };
    
    return (
        <div className="navBar-container">
            <div className="navBar">
                <div className="top-container">
                    <SvgLogo />
                </div>
                <nav className="nav-container">
                    {
                        navList.map((item) => (
                            <NavLink key={item.path} to={item.path}>
                                <NavBarItem title={item.title} svg={item.svg} />
                            </NavLink>
                        ))
                    }
                    <div className="teams-container">
                        <h4>TEAMS</h4>
                        {
                            teams.map((item) => (
                                <NavLink key={item.path} to={item.path}>
                                    <NavBarItem title={item.title} svg={item.svg} />
                                </NavLink>
                            ))
                        }
                    </div>
                </nav>
                <div
                    className="bottom-container"
                    onClick={handleClickLogOut}
                >
                    <SvgLogOut />
                    <h3>Log out</h3>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
