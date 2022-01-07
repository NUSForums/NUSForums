import { ToastContainer } from 'react-toastify';
import { UserProvider } from './contexts/userContext';
import MainRouter from './Router';

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <MainRouter />
    </UserProvider>
  );
}

export default App;
