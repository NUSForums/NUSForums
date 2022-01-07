import { useLocation, useNavigate } from 'react-router-dom';

interface TagProps {
  name: string;
  button?: Boolean;
}

// converts things like Mid Terms -> midTerms and General -> general
export function tagConvert(name: string): string {
  return name.charAt(0).toLocaleLowerCase() + name.slice(1);
}

const Tag = ({ name, button }: TagProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  function navigateTo(filterType: string) {
    if (!button) return;
    if (queryParams.has('filter')) {
      if (queryParams.get('filter') === filterType) {
        // unselect
        queryParams.delete('filter');
      } else {
        // select another
        queryParams.delete('filter');
        queryParams.append('filter', filterType);
      }
    } else {
      //select new
      queryParams.append('filter', filterType);
    }
    navigate(`?${queryParams.toString()}`);
  }

  return (
    <div
      className={`py-1 bg-forum-${tagConvert(
        name
      )} w-24 grid place-items-center rounded-2xl text-white font-nunito text-sm tracking-wider mx-1 border-2 border-transparent  my-3 shadow-sm ${
        button ? 'cursor-pointer' : ''
      } ${button && queryParams.get('filter') === name ? 'border-2 border-black drop-shadow' : ''}`}
      onClick={() => navigateTo(name)}
    >
      {name}
    </div>
  );
};

export default Tag;
