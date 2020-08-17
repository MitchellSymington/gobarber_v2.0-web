import React, { createContext, useContext, useCallback, useState } from 'react';

import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastConteiner';

export interface ToastMessage {
  // exportando a interface para poder usar dentro do ToastConteiner
  // parametros utilizados na hora de criar o toast
  id: string; // usar esse id para poder fazer o map no react
  type?: 'success' | 'error' | 'info'; // type nao e obrigatorio, por isso o ? e pode ser do tipo success ou error ou info
  title: string;
  description?: string;
}

interface ToastContextData {
  // tipo do contexto criado, recebe 2 funcoes
  addToast(message: Omit<ToastMessage, 'id'>): void; // funcao que recebe uma message do tipo toast messeg e retorna vazio
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData); // inicializando o context como null {}

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]); // declarando como array para guardar varios toast, do tipo toastmessage

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      // Omit, para nao precisar passar o parametro id
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };
      setMessages((state) => [...state, toast]); // usando o spread operator para passar o conteudo que ja existe pro estado para respeitar a imutabilidade do react
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id)); // retorna todas messages menos a que foi passada no id
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
