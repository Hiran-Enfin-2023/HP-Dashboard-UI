import React, { useEffect, useState } from 'react';
import Concierge from './Concierge';
import "../App.css"
import Product from './Product';
// import Sidebar from './Sidebar';
const Dashboard = ({ isLoggedIn , menu, setMenu}) => {
  // const [menu, setMenu] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedProductSession, setSelectedProductSession] = useState(null)
  useEffect(() => {
    if (isLoggedIn) {
      setMenu('Concierge');
    } else {  
      window.location.href = '/login';
    }
  }, [isLoggedIn]);

  return (
    <div>
      <div className="content">
        {menu === 'products' && <Product selectedProductSession={selectedProductSession} setSelectedProductSession={setSelectedProductSession} />}
        {menu === 'Concierge' && <Concierge selectedSession={selectedSession} setSelectedSession={setSelectedSession} />}
      </div>
    </div>
  );
};

export default Dashboard;
