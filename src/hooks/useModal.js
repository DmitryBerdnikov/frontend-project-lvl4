import { useContext } from 'react';
import { modalContext } from '../contexts/modalContext.jsx';

const useModal = () => useContext(modalContext);

export default useModal;
