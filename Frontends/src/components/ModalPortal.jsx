import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Modal from './Modal';

const ModalPortal = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return null;

    return createPortal(
        <Modal />,
        modalRoot
    );
}

export default ModalPortal
