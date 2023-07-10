import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Catalogue from './components/Catalogue';
import NotFound from './components/404';
import routes from './constants/routes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Catalogue />,
  },
  
  ...routes.map(({ route, component }) => ({
    path: route,
    element: component
  })),
  
  {
    path: '*',
    element: <NotFound />,
  }
]);


function App() {
  return (
    <div className='w-full h-[100vh] bg-slate-900 flex justify-center p-10 pt-[20vh]'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
