// Import the 'Navigate' component from the 'react-router-dom' library.
import { Navigate } from 'react-router-dom';

// Import the 'useAuthStore' function from a custom 'auth' store.
import { useAuthStore } from '../store/auth';

// Define the 'PrivateRoute' component as a functional component that takes 'children' as a prop.
const PrivateRoute = ({ children }) => {
    // Modern Zustand usage: useAuthStore returns state directly
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    // Responsive: children are rendered only if authenticated
    return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

// Export the 'PrivateRoute' component to make it available for use in other parts of the application.
export default PrivateRoute;
