import React, { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { ModuleCondensed } from '../types/modules';

const Forum = () => {
  const { searchValue, mods } = useAppSelector((state) => ({
    searchValue: state.search,
    mods: state.modules,
  }));
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const [filteredMods, setFilteredMods] = useState<ModuleCondensed[]>([]);

  useEffect(() => {
    if (!!searchValue.value && mods) {
      const lowerCaseSearchVal = searchValue.value.toLowerCase();
      const upperCaseSearchVal = searchValue.value.toUpperCase();

      setFilteredMods([
        ...Object.values(mods).filter((mod) => {
          return mod.moduleCode.includes(upperCaseSearchVal) || mod.title.toLowerCase().includes(lowerCaseSearchVal);
        }),
      ]);
      navigate('/forum');
    } else {
      setFilteredMods([]);
    }
  }, [searchValue, mods]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        {!searchValue ? (
          <Outlet />
        ) : (
          <div>
            {filteredMods.map((mod) => {
              return (
                <button
                  onClick={() => {
                    navigate(`/forum/${mod.moduleCode}`);
                    dispatch({ type: 'CLEAR_SEARCH' });
                  }}
                >
                  <pre>{JSON.stringify(mod, null, 2)}</pre>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;
