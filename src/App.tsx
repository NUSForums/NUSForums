import { ToastContainer } from 'react-toastify';
import MainRouter from './Router';
import { Provider } from 'react-redux';
import Store from './store/root';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={Store}>
      <ToastContainer />
      <MainRouter />
    </Provider>
  );
}

export default App;
