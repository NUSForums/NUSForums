import React from 'react';

const Information = ({ content }) => {
  return (
    <div className="my-2">
      <p className="text-lg font-bold text-forum-title">Module Information</p>
      <p className="mt-2">{content}</p>
    </div>
  );
};

export default Information;
