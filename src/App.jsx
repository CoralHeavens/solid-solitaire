import React, { useEffect } from 'react';
import routes, { baseRoute } from './constants/routes';
import storageKeys from './constants/storageKeys';
import { useRouteData, useUpdateRouteData } from './context/routeContext';
import Cursor from './components/Cursor';

const navLabel = 'Back';

const footerMessage = 'Created by CoralHeavens <3';
const footerLink = 'https://github.com/CoralHeavens';

function App() {
  const routeKey = useRouteData();
  const route = routes[routeKey];
  const updateRoute = useUpdateRouteData();
  
  useEffect(() => {
    if (!routeKey) {
      localStorage.setItem(storageKeys.currentRoute, baseRoute.key)
    }
    updateRoute(routeKey ?? baseRoute.key);
  }, [updateRoute, routeKey])
  
  return (
    <main className='relative w-full h-[100vh] bg-slate-900 flex flex-col items-center p-10'>
      
      <Cursor />
      
      <nav className='mb-6 w-full flex items-center'>
          {routeKey !== baseRoute.key && (
            <>
              <button className='absolute border-ghost px-3 py-2' onClick={() => {
                updateRoute(baseRoute.key);
                localStorage.setItem(storageKeys.currentRoute, baseRoute.key)
              }}>
                <div className='glitch' title={navLabel}>
                  {navLabel}
                </div>
              </button>
              <h2 className='mx-auto text-5xl leading-7'>
                {route?.label}
              </h2>
            </>
          )}
        </nav>
        
        {route?.component}
        
        <footer className='absolute bottom-2 opacity-30'>
          <a className='text-base' href={footerLink}>
            {footerMessage}
          </a>
        </footer>
    </main>
  );
}

export default App;
