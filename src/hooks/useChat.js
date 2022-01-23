import { useContext } from 'react';
import { chatContext } from '../contexts/chatContext.jsx';

const useChat = () => useContext(chatContext);

export default useChat;
