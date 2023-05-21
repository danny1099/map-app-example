import React from 'react';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZGFubnkxMDk5IiwiYSI6ImNsaHh0OGJseDAxemMzc3Boanh5MWdjajAifQ.TA-NcSdVVWz2_tlt4KPd4g';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
