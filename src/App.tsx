import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import Workers from './pages/Workers';
import WorkerDetail from './pages/WorkerDetail';

import Devices from './pages/Devices';

import MetricsDashboard from './pages/MetricsDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<MetricsDashboard />} />
            <Route path="devices" element={<Devices />} />
            <Route path="workers" element={<Workers />} />
            <Route path="workers/:id" element={<WorkerDetail />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;