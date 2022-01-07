import React from 'react';
import SubscribeButton from '../SubscribeButton';
import ModuleInfo from '../ModuleInfo/ModuleInfo';

const RightBar = ({ moduleCode, className }) => {
  return (
    <div className={`w-full lg:w-1/4 ${className}`}>
      <SubscribeButton moduleCode={moduleCode} />
      <ModuleInfo moduleCode={moduleCode} />
    </div>
  );
};

export default RightBar;
