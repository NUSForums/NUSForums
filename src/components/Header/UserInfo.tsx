import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

interface AvatarProps {
  className?: string;
}

const UserInfo: React.FC<AvatarProps> = ({ className }) => {
  const navigate = useNavigate();
  const { image, anonymousName, userId } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);
  const open = Boolean(anchorEl);

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    // technically signOut should set it the auth. But this will cause a slight
    // re-render. Thus we use setCurrentUser directly
    navigate('/');
    dispatch({ type: 'SIGN_OUT' });

    setTimeout(() => {
      signOut(auth);
    }, 1000);
  };

  return (
    <>
      <div
        className={`h-full my-auto ml-auto flex flex-row items-center cursor-pointer ${className}`}
        onClick={onClick}
      >
        <img
          className="w-12 p-1 bg-white rounded-full"
          alt="profile"
          src={image || `https://avatars.dicebear.com/api/gridy/${anonymousName.replaceAll(' ', '')}.svg`}
        />
        <span className="hidden pl-2 lg:flex">{anonymousName}</span>
        <MdOutlineKeyboardArrowDown className="hidden cursor-pointer lg:flex" size={30} />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {!userId && <MenuItem onClick={() => navigate('/')}>Login</MenuItem>}
        {userId && <MenuItem onClick={() => dispatch({ type: 'RANDOMIZE_NAME' })}>Randomize name</MenuItem>}
        {userId && <MenuItem onClick={handleClose}>Logout</MenuItem>}
      </Menu>
    </>
  );
};

export default UserInfo;
