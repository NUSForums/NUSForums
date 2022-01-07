import SearchBar from './SearchBar';
import UserInfo from './UserInfo';

const Header = () => {
  return (
    <div className="z-30 flex flex-row w-full gap-5 px-5 bg-white shadow-sm">
      <SearchBar className="flex flex-grow my-2 max-w-7xl" />
      <UserInfo />
    </div>
  );
};

export default Header;
