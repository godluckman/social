import React from 'react';
import { useParams } from 'react-router-dom';
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

const PageRender = () => {
  const { page, id } = useParams();
  let pageName = '';
  if (id) {
    pageName = `${page}/[id]`;
  } else {
    pageName = `${page}`;
  }
  return generatePage(pageName);
};

export default PageRender;
