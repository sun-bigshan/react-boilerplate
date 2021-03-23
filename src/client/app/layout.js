import React from 'react';
import { NavLink } from 'react-router-dom';
import './layout.less';

const Layout = props => {
  return (
    <div className="layout-box">
      <h1>koa+react+ssr</h1>
      <NavLink to="/" style={{ marginLeft: '10px' }}>
        首页
      </NavLink>
      <NavLink style={{ marginLeft: '10px' }} to="/list">
        列表页
      </NavLink>
      {props.children}
    </div>
  );
};

export default Layout;
