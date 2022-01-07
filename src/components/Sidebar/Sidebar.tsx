import React from 'react';
import SideBarRow from './SidebarRow';

const Sidebar = () => {
  const modulesPin = ['CS3230', 'CS2102', 'MA1521', 'GES100H'];

  return (
    <div>
      <div>LOGO SHOULD BE HERE</div>
      <p>Modules</p>
      <div>
        {modulesPin.map((code) => (
          <SideBarRow code={code} key={code} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
