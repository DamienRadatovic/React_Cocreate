import './DropComponent.css';
import { ReactNode, useEffect, useRef } from 'react';

interface Props {
    children: ReactNode,
    onCloseDrop: (state: boolean) => void,
}

const DropComponent = ({ children, onCloseDrop } : Props) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: Event) => {
        if (wrapperRef?.current) {
            const target = e.target as Node;
            if (!wrapperRef.current.contains(target)) {
                onCloseDrop(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });
    
    return <>
        <div
            ref={wrapperRef}
            className="drop-component"
        >
            { children }
        </div>
    </>;
};

export default DropComponent;