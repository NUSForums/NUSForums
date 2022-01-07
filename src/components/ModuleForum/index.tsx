import { useParams } from 'react-router-dom';
import { useFetchPosts } from '../../hooks';
import { useAppSelector } from '../../hooks/reduxHooks';
import ModuleInfo from '../ModuleInfo/ModuleInfo';

const ModuleForum = () => {
  const { module } = useParams();
  const { posts } = useFetchPosts(module || '');
  const metadata = useAppSelector((state) => state.metadata);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col flex-grow">
        <pre>{JSON.stringify(metadata, null, 2)}</pre>
        {posts.map((post) => (
          <pre>{JSON.stringify(post, null, 2)}</pre>
        ))}
      </div>
      <ModuleInfo moduleCode={module} />
    </div>
  );
};

export default ModuleForum;
