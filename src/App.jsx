import React, { useEffect, useState } from 'react';
import routes, { baseRoute } from './constants/routes';
import storageKeys from './constants/storageKeys';

function App() {
  const [route, updateRoute] = useState()

  useEffect(() => {
    const currentRoute = localStorage.getItem(storageKeys.currentRoute);
    if (!currentRoute) {
      localStorage.setItem(storageKeys.currentRoute, baseRoute.key)
    }
    updateRoute(routes[currentRoute] ?? baseRoute);

  }, [])
  
  return (
    <div className='w-full h-[100vh] bg-slate-900 flex justify-center p-10 pt-[10vh]'>
      {route?.component}
    </div>
  );
}

export default App;
