import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ModuleForum = () => {
  const params = useParams();

  useEffect(() => {
    // should reflect the module code
    // based on the module code, we will fetch the relevant data
    console.log(params.module);
  }, [params.module]);

  return <div>This is module Forum</div>;
};

export default ModuleForum;
