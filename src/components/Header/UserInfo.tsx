import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

interface AvatarProps {
  className?: string;
}

const UserInfo: React.FC<AvatarProps> = ({ className }) => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const { image, anonymousName } = useAppSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState<null | SVGElement>(null);
  const open = Boolean(anchorEl);

  const onClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    // technically signOut should set it the auth. But this will cause a slight
    // re-render. Thus we use setCurrentUser directly
    navigate('/');
    setCurrentUser(null);

    setTimeout(() => {
      signOut(auth);
    }, 1000);
  };

  return (
    <div className={`h-full my-auto ml-auto flex flex-row items-center ${className}`}>
      <img
        className="w-12 p-1 bg-white rounded-full"
        alt="profile"
        src={image || `https://avatars.dicebear.com/api/gridy/${anonymousName.replaceAll(' ', '')}.svg`}
      />
      <span className="hidden pl-2 lg:flex">{anonymousName}</span>
      <MdOutlineKeyboardArrowDown className="hidden lg:flex cursor-pointer" size={30} onClick={onClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserInfo;
