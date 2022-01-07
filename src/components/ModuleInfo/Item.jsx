import React from 'react';

const Item = ({ heading, content }) => {
  return (
    <div className="my-3">
      <p className="pb-1 text-base font-semibold text-forum-title">{heading}</p>
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default Item;
