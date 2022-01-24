import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { DefaultRootState, useSelector } from 'react-redux';
import NotFound from './components/notFound';

const generatePage = (pageName: string) => {
  // eslint-disable-next-line import/no-dynamic-require,global-require,@typescript-eslint/no-var-requires
  const component = () => require(`./components/${pageName}`).default;
  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender: FC = () => {
  const { page, id } = useParams();
  interface INotify extends Object {
    token: string;
  }
  interface IState extends DefaultRootState {
    auth: INotify;
  }
  const { auth } = useSelector((state: IState) => state);
  let pageName = '';
  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }
  return generatePage(pageName);
};

export default PageRender;
