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

const Toast: FC<IToast> = ({ msg, handleShow, bgColor }) => (
  <div
    className={`toast show position-fixed text-light ${bgColor}`}
    style={{ top: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}
  >
    <div className={`toast-header text-light ${bgColor}`}>
      <strong className='me-auto text-light'>{msg.title}</strong>
      <button
        type='button'
        className='ml-2 mb-1 btn-close text-light'
        data-bs-dismiss='toast'
        aria-label='Close'
        onClick={handleShow}
      />
    </div>
    <div className='toast-body'>{msg.body}</div>
  </div>
);

export default Toast;
