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

const SidebarRow = ({ code, index }: SidebarProps) => {
  return (
    <Link to={`/forum/${code}`} className="my-1 flex items-center cursor-pointer hover:bg-forum-sidebarHover px-5 py-1">
      <div className="w-10 h-10 mr-2" style={{ background: `${colorArray[index % colorArray.length]}` }} />
      <div className="text-forum-sidebarText text-sidebarText font-medium">{code}</div>
    </Link>
  );
};

export default SidebarRow;
