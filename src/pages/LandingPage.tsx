import { setPersistence, signInWithPopup, GoogleAuthProvider, browserLocalPersistence } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LOGO from '../images/NUSForums.svg';
import { useAppSelector } from '../hooks/reduxHooks';

const LandingPage = () => {
  const navigate = useNavigate();
  const { userId } = useAppSelector((state) => state.user);

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
    if (userId) {
      navigate('/forum');
    }
  }, []);

  return (
    <div className="grid w-full h-full pb-16 place-content-center">
      <img src={LOGO} alt="logo" className="mb-6" />
      <div
        className="grid h-10 border border-gray-300 rounded-lg cursor-pointer font-poppins text-forum-midterms place-content-center hover:text-white hover:bg-forum-midterms"
        onClick={login}
      >
        Sign In With Google
      </div>
      <div
        className="grid h-10 mt-3 border border-gray-300 rounded-lg cursor-pointer font-poppins text-forum-tutorial place-content-center hover:text-white hover:bg-forum-tutorial"
        onClick={() => navigate('/forum')}
      >
        Continue without logging in
      </div>
    </div>
  );
};

export default LandingPage;
