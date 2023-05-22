import axios from 'axios';

const searchAPI = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 10,
    access_token:
      'pk.eyJ1IjoiZGFubnkxMDk5IiwiYSI6ImNsaHh0OGJseDAxemMzc3Boanh5MWdjajAifQ.TA-NcSdVVWz2_tlt4KPd4g',
  },
});

export default searchAPI;
