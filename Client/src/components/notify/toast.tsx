import React, { FC, MouseEventHandler } from 'react';

interface IMsg extends Object {
  title: string;
  body: string;
  success?: object;
}

interface IToast {
  msg: IMsg;
  handleShow: MouseEventHandler<HTMLButtonElement>;
  bgColor: string;
}

const Toast: FC<IToast> = ({ msg, handleShow, bgColor }) => {
  console.log('');
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className='mr-auto text-light'>{msg.title}</strong>
        <button
          type='button'
          className='ml-2 mb-1 close text-light'
          data-dismiss='toast'
          style={{ outline: 'none' }}
          onClick={handleShow}
        >
          &times;
        </button>
      </div>
      <div className='toast-body'>{msg.body}</div>
    </div>
  );
};

export default Toast;
