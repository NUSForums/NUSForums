import React from 'react';

const Item = ({ heading, section }) => {
  return (
    <>
      <b>{heading}</b>
      <p>{section}</p>
    </>
  );
};

export default Item;
