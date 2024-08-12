import './Layout.css';
import NavBar from '@/components/nav-bar/NavBar.tsx';
import { Outlet } from 'react-router-dom';
import TopBar from '@/components/top-bar/TopBar.tsx';

const Layout = () => {
    return <>
        <div className="layout">
            <NavBar/>
            <div className="layout-content">
                <TopBar />
                <div className="content-outlet">
                    <Outlet />
                </div>
            </div>
        </div>
    </>;
};

export default Layout;
