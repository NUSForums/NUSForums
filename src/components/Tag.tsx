import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

interface TagProps {
  name: string;
  button?: Boolean;
}

// converts things like Mid Terms -> midTerms and General -> general
function convert(name: string): string {
  return lowerCaseFirstLetter(name.replace(/\s+/g, ''));
}

function lowerCaseFirstLetter(name: string): string {
  return name.charAt(0).toLocaleLowerCase() + name.slice(1);
}

const isExtraFilter = ['popular', 'recent'];
const f = (name: string) => (isExtraFilter.includes(name.toLowerCase()) ? 1 : 0);

const Tag = ({ name, button }: TagProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  function navigateTo(filterType: string) {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has('filter')) {
      queryParams.delete('filter');
    }
    queryParams.append('filter', filterType);
    navigate(`?${queryParams.toString()}`);
  }

  return (
    <div
      className={`py-1 bg-forum-${convert(
        name
      )} w-24 grid place-items-center rounded-2xl text-white font-nunito text-sm tracking-wider mx-1 my-3 shadow-sm ${
        button ? 'cursor-pointer' : ''
      }`}
      onClick={() => navigateTo(name)}
    >
      {name}
    </div>
  );
};

export default Tag;
