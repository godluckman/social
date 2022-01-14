import React from 'react';
import { useLocation, useParams, Navigate } from 'react-router-dom';

const generatePage = (pageName: string, location: object) => (
  <Navigate to={pageName} state={{ from: location }} replace />
);

const PageRender = () => {
  const location = useLocation();
  const { page, id } = useParams();
  let pageName = '';
  if (id) {
    pageName = `${page}/[id]`;
  } else {
    pageName = `${page}`;
  }
  console.log(pageName);
  return generatePage(pageName, location);
};

export default PageRender;
