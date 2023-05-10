import React from 'react';
import Div100vh from 'react-div-100vh';
import { Route, Routes } from "react-router-dom";
import Splash from './pages/Splash';
import AppProvider from './AppContext';
import Dashboard from './pages/Dashboard';
import Bootstrap from './components/Bootstrap';
import TransactionByBlock from "./pages/TransactionByBlock";
import TransactionById from "./pages/TransactionById";

function App() {
  return (
    <AppProvider>
      <Bootstrap>
        <Div100vh>
          <div className="app">
            <div className="screen relative ">
              <Splash />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/:id" element={<TransactionByBlock />} />
                <Route path="/t/:id" element={<TransactionById />} />
              </Routes>
            </div>
          </div>
        </Div100vh>
      </Bootstrap>
    </AppProvider>
  );
}

export default App;
