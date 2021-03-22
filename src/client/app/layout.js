import React from 'react';
import { Link } from 'react-router-dom';

const Layout = props => {
  return (
    <div>
      <Link to="/">首页</Link>
      <Link to="/list">列表页</Link>
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
