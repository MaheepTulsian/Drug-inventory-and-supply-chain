import { Navigate } from 'react-router-dom';

// Helper function to get a cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const ProtectedRoute = ({ children }) => {
  const token = getCookie('jwt'); // Get the token from cookies

  if (!token) {
    // Redirect to login if token is not found
    return <Navigate to="/auth" />;
  }

  return children; // Render the child component if token is present
};

export default ProtectedRoute;
