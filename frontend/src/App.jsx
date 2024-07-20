import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
import Header from './components/header.jsx';
import Login from './components/Login/login.jsx';
import { Provider } from 'react-redux';
import Store from './utils/store.jsx';
import MultiStepForm from './components/Signup/multistepForm.jsx';
import ShowCategories from './components/category/category.jsx';
import Categorypage from './components/category/categorypage.jsx';
function Layout() {
  return (
    <div  className="montserrat-medium">
      <Provider store={Store}>
      <Header />
      <Outlet />
      </Provider>

    </div>
  );
}

const appRouting=createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout /> ,
      children:[
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <MultiStepForm /> 
        },
        {
          path: "/category",
          element: <ShowCategories />
        },
        {
          path: "registerCategories",
          element: <Categorypage />
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
