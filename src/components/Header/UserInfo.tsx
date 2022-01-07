import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface AvatarProps {
  className?: string;
}

const UserInfo: React.FC<AvatarProps> = ({ className }) => {
  const { image, anonymousName } = useAppSelector((state) => state.user);

  return (
    <div className={`h-full my-auto ml-auto flex flex-row items-center ${className}`}>
      <img
        className="w-12 p-1 bg-white rounded-full"
        alt="profile"
        src={image || `https://avatars.dicebear.com/api/gridy/${anonymousName.replaceAll(' ', '')}.svg`}
      />
      <span className="hidden pl-2 lg:flex">{anonymousName}</span>
      <MdOutlineKeyboardArrowDown className="hidden lg:flex" size={30} />
    </div>
  );
};

export default UserInfo;
