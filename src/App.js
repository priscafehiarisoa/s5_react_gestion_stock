import logo from './logo.svg';
import './App.css';
import { Navbar } from 'react-bootstrap';
import NavBars from './component/NavBars';
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )
  // Containers
const DefaultLayout = React.lazy(() => import('./Layout/DefaultLayout'))

  return (
    <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
}


export default App;
