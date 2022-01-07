import { useAppSelector } from '../../hooks/reduxHooks';
import Tag from '../Tag';
import Dropdown from './Dropdown';

const Header = () => {
  const metadata = useAppSelector((state) => state.metadata);
  const tagList = metadata.tags;

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
        </div>
      </div>
    </div>
  );
};

export default Header;
