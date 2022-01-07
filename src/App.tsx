import { ToastContainer } from 'react-toastify';
import MainRouter from './Router';
import { Provider } from 'react-redux';
import Store from './store/root';
import { AuthProvider } from './context/Auth';

function App() {
  return (
    <Provider store={Store}>
      <AuthProvider>
        <ToastContainer />
        <MainRouter />
      </AuthProvider>
    </Provider>
  );
}

export default App;
