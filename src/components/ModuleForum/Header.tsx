import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import Tag from '../Tag';
import Dropdown from './Dropdown';

const Header = () => {
  const { module } = useParams();
  const { tagList, moduleInfo } = useAppSelector((state) => ({
    tagList: state.metadata.tags,
    moduleInfo: state.modules[module || ''],
  }));

  return (
    <div className="pt-5">
      <div className="ml-1 text-2xl font-extrabold font-poppins text-forum-title">
        {module} - {moduleInfo.title}
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
