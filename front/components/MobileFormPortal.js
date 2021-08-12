import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom'; 

const MobileFormPortal = ({ children, selector }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true);
  });

  useEffect(() => {
    document.getElementsByClassName("ant-modal-mask")[0].style.display = "none";
    document.getElementsByClassName("ant-modal-wrap")[0].style.display = "none";
  }, []);
  
  return mounted ? ReactDOM.createPortal(children, ref.current) : null;
};

export default MobileFormPortal;