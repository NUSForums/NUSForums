import React from 'react';

const Item = ({ heading, content }) => {
  return (
    <div className="my-3">
      <p className="font-semibold text-forum-title">{heading}</p>
      <p>{content}</p>
    </div>
  );
};

export default Item;
