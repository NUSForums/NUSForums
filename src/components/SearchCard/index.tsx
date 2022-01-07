import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';

interface SearchCardProps {
  moduleCode: string;
  title: string;
}

export const SearchCard: React.FC<SearchCardProps> = ({ moduleCode, title }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <button
      className="flex flex-row items-center w-full py-2 mt-3 bg-gray-200 rounded-lg"
      onClick={() => {
        console.log(moduleCode);
        navigate(`/forum/${moduleCode}`);
        dispatch({ type: 'CLEAR_SEARCH' });
      }}
    >
      <p className="w-32 px-5 text-lg font-semibold tracking-wider text-left">{moduleCode}</p>
      <p className="text-base text-left">{title}</p>
    </button>
  );
};
