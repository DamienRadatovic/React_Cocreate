import './Modal.css';
import { ReactNode, useEffect, useRef } from 'react';
import { SvgCross } from '@/components/general/svg/SvgComponent.tsx';

interface Props {
    children: ReactNode,
    isOpen: boolean;
    onClose?: () => void;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
    };

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            if (isOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isOpen]);

    return <>
        <dialog ref={modalRef} className="modal-container">
            <div className="modal-close-btn" onClick={handleCloseModal}>
                <SvgCross />
            </div>
            { isOpen && children }
        </dialog >
    </>;
};

export default Modal;