import { setPersistence, signInWithPopup, GoogleAuthProvider, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { useEffect } from 'react';
import LOGO from '../images/NUSForums.svg';

const LandingPage = () => {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const login = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider);
        navigate('/forum');
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/forum');
    }
  }, []);

  return (
    <div className="w-full h-full grid place-content-center pb-16">
      <img src={LOGO} alt="logo" className="mb-6" />
      <div
        className="font-poppins text-forum-midterms cursor-pointer h-10 grid place-content-center rounded-lg border border-gray-300 hover:text-white hover:bg-forum-midterms"
        onClick={login}
      >
        Sign In With Google
      </div>
    </div>
  );
};

export default LandingPage;
