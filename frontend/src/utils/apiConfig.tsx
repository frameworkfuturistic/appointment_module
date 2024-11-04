// /utils/apiConfig.js
const API_BASE_URL_1 = process.env.HOSPITAL_API_BASE_URL;
const API_BASE_URL_2 = process.env.LARAVEL_API_BASE_URL;

const API_ROUTES = {
  hospitalRoutes: `${API_BASE_URL_1}`,
  laravelRoutes: `${API_BASE_URL_2}/api/posts`,
};

export default API_ROUTES;
