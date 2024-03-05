// src/components/Header.js

import React, { useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Radio, RadioGroup } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
const Header = ({ menu, setMenu }) => {


  const refreshHandler = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rest/refresh`)
    console.log(res);
  }



  return (
    <header id='header'>
      <div className='img'>
        <img className="logo" src="https://www.enfintechnologies.com/wp-content/uploads/enfin-logo-1-e1687512482348.webp" alt="" />
      </div>


      <div className='toggle'>

        <div className="refresh_botton">
          <button onClick={() => refreshHandler()}>
            <RefreshIcon />
          </button>
        </div>

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="Concierge" control={<Radio onChange={() => setMenu('Concierge')} />} label="Concierge" />
          <FormControlLabel value="products" control={<Radio onChange={() => setMenu('products')} />} label="Product" />
        </RadioGroup>
      </div>
    </header>
  );
};

export default Header;
