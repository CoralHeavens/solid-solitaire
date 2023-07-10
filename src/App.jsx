import React, { useEffect } from 'react';
import routes, { baseRoute } from './constants/routes';
import storageKeys from './constants/storageKeys';
import { useRouteData, useUpdateRouteData } from './context/routeContext';

function App() {
  const routeKey = useRouteData();
  const updateRoute = useUpdateRouteData();
  
  useEffect(() => {
    if (!routeKey) {
      localStorage.setItem(storageKeys.currentRoute, baseRoute.key)
    }
    updateRoute(routeKey ?? baseRoute.key);
  }, [updateRoute, routeKey])
  
  return (
    <div className='w-full h-[100vh] bg-slate-900 flex justify-center p-10 pt-20'>
      {routes[routeKey]?.component}
    </div>
  );
}

export default App;
