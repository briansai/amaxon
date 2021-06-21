import axios from 'axios';

const buildClient = axios.create({
  baseURL: 'https://us-central1-ian-9a6ef.cloudfunctions.net/api',
});

export default buildClient;
