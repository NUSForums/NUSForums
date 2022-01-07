import { IoTrash } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import Tag from '../Tag';
import Dropdown from './Dropdown';

const tagList = ['General', 'Mid Terms', 'Finals', 'Labs', 'Tutorials', 'Lectures'] as const;
const isExtraFilter = ['popular', 'recent'];
const f = (name: string) => (isExtraFilter.includes(name.toLowerCase()) ? 1 : 0);

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const clearFilter = () => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has('filter')) queryParams.delete('filter');
    if (queryParams.has('sort')) queryParams.delete('sort');

    navigate(queryParams.toString());
  };

  return (
    <div className="px-5 pt-5">
      <div className="font-poppins font-extrabold text-forum-title text-2xl ml-1">
        CS3230 - Software Engineering Project
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {tagList.map((tag) => (
            <Tag name={tag} key={tag} button={true} />
          ))}
        </div>
        <div className="flex items-center">
          <Dropdown />
          <IoTrash size={20} className="text-forum-title cursor-pointer" onClick={clearFilter} />
        </div>
      </div>
    </div>
  );
};

export default Header;
