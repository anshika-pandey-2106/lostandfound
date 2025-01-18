import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import Manage from '../pages/manage.jsx';
import Request from '../pages/requests.jsx';

function Admin() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar is placed here to appear on every page */}
      <Routes>
        <Route path="/manage" element={<Manage />} />
        <Route path="/requests" element={<Request />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Admin;
