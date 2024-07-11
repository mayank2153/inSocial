import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';


function Layout() {
  return (
    <>
      
      <Outlet />
    </>
  );
}

const appRouting=createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout /> ,
      children:[
        {
          path: "/"
        }
      ]
    }
  ]
)
function App() {
  return (
    <RouterProvider router={appRouting} />
  );
}

export default App
