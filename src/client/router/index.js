import React from 'react';
import Layout from '../app/layout';
import { Route, Switch } from 'react-router-dom';

const App = ({ routeList }) => {
  return (
    <Layout>
      <Switch>
        {routeList.map(item => {
          return <Route key={item.path} {...item}></Route>;
        })}
      </Switch>
    </Layout>
  );
};

export default App;
