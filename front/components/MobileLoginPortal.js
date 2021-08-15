import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const MobileLoginPortal = ({ children, selector }) => {
    const ref = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector(selector);
        setMounted(true);
    });

    return mounted ? ReactDOM.createPortal(children, ref.current): null;
};

export default MobileLoginPortal;