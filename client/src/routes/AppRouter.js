import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import GameCanvas from '../components/GameCanvas';

const routes = [
  { path: '/', component: <Home />, exact: true },
  { path: '/game', component: <GameCanvas /> },
];

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, component, exact }, index) => (
          <Route
            key={index}
            path={path}
            element={component}
            exact={exact}
          />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;
