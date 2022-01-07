import React from 'react';

const Item = ({ heading, content }) => {
  return (
    <div className="my-5">
      <p className="pb-1 text-base font-semibold text-forum-title font-poppins">{heading}</p>
      <p className="text-sm">{content || 'None'}</p>
    </div>
  );
};

export default Item;
