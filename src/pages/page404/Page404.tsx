import './Page404.css';
import ActionButton from '@/components/general/action-button/ActionButton.tsx';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const Page404 = () => {
    const navigate: NavigateFunction = useNavigate();

    const redirect = (): void => {
        navigate('/');
    };

    return <>
        <div className="page-error-container">
            <h1>404</h1>
            <h3>Page not found!</h3>
            <ActionButton onClickButton={redirect} type="fill">
                Return to home
            </ActionButton>
        </div>
    </>;
};

export default Page404;