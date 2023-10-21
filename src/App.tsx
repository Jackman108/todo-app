import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store/store';
import { Route, Routes } from "react-router-dom";
import ProjectSelectionPage from './containers/ProjectSelectionPage';
import TasksPage from './containers/TasksPage';


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<ProjectSelectionPage />} />
        <Route path="/tasks/:projectId" element={<TasksPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
