import React from 'react';
import SubscribeButton from '../SubscribeButton';
import ModuleInfo from '../ModuleInfo/ModuleInfo';

const RightBar = ({ moduleCode }) => {
  return (
    <div className="w-1/5 m-5">
      <SubscribeButton moduleCode={moduleCode} />
      <ModuleInfo moduleCode={moduleCode} />
    </div>
  );
};

export default RightBar;
