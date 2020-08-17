import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastMessage } from '../../hooks/toast'; // pegando a interface declarada dentro do toast
import { Container } from './styles';

interface ToastConteinerProps {
  messages: ToastMessage[];
}

const ToastConteiner: React.FC<ToastConteinerProps> = ({ messages }) => {
  // ToastConteiner recebe como tipo do parametro o ToastConteinerProps - messages sao os parametros a serem acessadas
  const messagesWithTransitions = useTransition(
    messages, // primeiro parametro sao as menssagens
    (message) => message.id, // segundo parametro e uma funcao que recebe uma menssagem e retorna identificador unico - chave
    {
      // ultimo parametro e um objeto contendo qual animacao quer usar
      from: { right: '-120%', opacity: 0 }, // objeto nasce fora da tela
      enter: { right: '0%', opacity: 1 }, // aparce em tela
      leave: { right: '-120%', opacity: 0 }, // sai da tela
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map((
        { item, key, props }, // percorrendo o array de messages
      ) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastConteiner;
