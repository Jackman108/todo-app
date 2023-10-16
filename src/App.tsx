import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store/store';
import { Route, Routes } from "react-router-dom";
import ProjectSelectionPage from './containers/ProjectSelectionPage';


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<ProjectSelectionPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
