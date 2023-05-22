import axios from 'axios';

const addressAPI = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: true,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token:
      'pk.eyJ1IjoiZGFubnkxMDk5IiwiYSI6ImNsaHh0OGJseDAxemMzc3Boanh5MWdjajAifQ.TA-NcSdVVWz2_tlt4KPd4g',
  },
});

export default addressAPI;
