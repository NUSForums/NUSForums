import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  code: string;
  index: number;
}

const colorArray = [
  '#49DBFE',
  '#FF4BA6',
  '#A048E5',
  '#FC5C7B',
  '#6457FA',
  '#FD7614',
  '#1AEF6F',
  '#C4FE49',
  '#FE495F',
  '#FEEC49',
];

const SidebarRow: React.FC<SidebarProps> = ({ code, index }) => {
  return (
    <Link to={`/forum/${code}`} className="flex items-center px-5 py-1 my-1 cursor-pointer hover:bg-forum-sidebarHover">
      <div className="mr-2 w-10px h-10px" style={{ background: `${colorArray[index % colorArray.length]}` }} />
      <div className="font-medium text-forum-sidebarText text-sidebarText">{code}</div>
    </Link>
  );
};

export default SidebarRow;
