import React, { useEffect } from 'react';
import routes, { baseRoute } from './constants/routes';
import storageKeys from './constants/storageKeys';
import { useRouteData, useUpdateRouteData } from './context/routeContext';

const footerMessage = 'Created by CoralHeavens <3';
const footerLink = 'https://github.com/CoralHeavens';

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
    <div className='relative w-full h-[100vh] bg-slate-900 flex justify-center p-10 pt-20'>
      {routes[routeKey]?.component}
      <footer className='absolute bottom-2 opacity-30'>
        <a className='text-base' href={footerLink}>
          {footerMessage}
        </a>
      </footer>
    </div>
  );
}

export default App;
