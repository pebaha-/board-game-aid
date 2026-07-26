import React, { useEffect, useState } from 'react';
import App from './App';
import Players from './Players';
import SecretHitler from './SecretHitler';
import ProtectedRoute from './ProtectedRoute';

function MainRouter() {
  const getPath = () => window.location.hash.replace(/^#/, '') || '/';
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const handleHashChange = () => setPath(getPath());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (path === '/players') {
    return <Players />;
  }
  if (path === '/sh') {
    return <ProtectedRoute><SecretHitler /></ProtectedRoute>;
  }
  return <App />;
}

export default MainRouter;
