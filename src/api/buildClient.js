import axios from 'axios';

const buildClient = axios.create({
  baseURL: 'http://localhost:5001/ian-9a6ef/us-central1/api',
});

export default buildClient;
