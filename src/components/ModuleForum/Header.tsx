import { IoTrash } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

import Tag from '../Tag';
import Dropdown from './Dropdown';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const metadata = useAppSelector((state) => state.metadata);
  const tagList = metadata.tags;

  const clearFilter = () => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has('filter')) queryParams.delete('filter');
    if (queryParams.has('sort')) queryParams.delete('sort');

    navigate(queryParams.toString());
  };

  return (
    <div className="pt-5">
      <div className="ml-1 text-2xl font-extrabold font-poppins text-forum-title">
        CS3230 - Software Engineering Project
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center mb-1">
          {tagList.map((tag) => (
            <Tag name={tag} key={tag} button={true} />
          ))}
        </div>
        <div className="flex items-center">
          <Dropdown />
          <IoTrash size={20} className="cursor-pointer text-forum-title" onClick={clearFilter} />
        </div>
      </div>
    </div>
  );
};

export default Header;
