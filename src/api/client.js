import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

client.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      console.log(error.response);
      const { status } = error.response;

      // Verificar si el código de estado es 401 (No autorizado)
      if (status === 401) {
        // Redirigir a la página de inicio de sesión
        window.location.href = '/login'
      }

      // 400/500 server error
      return Promise.reject({
        message: error.response.statusText,
        ...error.response,
        ...error.response.data,
      });
    }
    // Request error
    return Promise.reject({ message: error.message });
  },
);


export const setAuthorizationHeader = token =>
  (client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};
export default client;