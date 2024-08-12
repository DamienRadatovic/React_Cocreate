import './TopBar.css';
import { SvgBell, SvgParameter, SvgSupport } from '@/components/general/svg/SvgComponent.tsx';
import { useAuth } from '@/contexts/auth.context.tsx';
import SearchGeneral from '@/components/top-bar/search-general/SearchGeneral.tsx';
import DropComponent from '@/components/general/drop-component/DropComponent.tsx';
import { useState } from 'react';

const TopBar = () => {
    const { user, logOut } = useAuth();
    const [isAccountOpen, setAccountOpen] = useState<boolean>(false);

    return (
        <div className="topBar-container">
            <div className="search-container">
                <SearchGeneral />
            </div>
            <div className="action-container">
                <div className="notification">
                    <SvgBell />
                </div>
                <div className="parameter">
                    <SvgParameter/>
                </div>
                <div className="support">
                    <SvgSupport />
                </div>
                <div onClick={() => setAccountOpen(true)} className="account">
                    {
                        user?.image ?
                            <img src={user.image} alt="user-image" />
                            :
                            <img src='https://cdn.allmylinks.com/prod/User/photo/I/_/-/HSF9tPcmEmHBeXWgDg1gSn6eSHNQJXUS.jpg' alt="generic-user-image" />
                    }
                    {
                        isAccountOpen &&
                        <DropComponent onCloseDrop={() => setAccountOpen(false)}>
                            <h3 onClick={logOut} >Log out</h3>
                        </DropComponent>
                    }
                </div>
            </div>
        </div>
    );
};

export default TopBar;
