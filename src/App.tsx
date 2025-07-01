import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout/Layout';
import Overview from './pages/Overview/Overview';
import Users from './pages/Users/Users';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to='/overview' replace />} />
            <Route path='overview' element={<Overview />} />
            <Route path='users' element={<Users />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
