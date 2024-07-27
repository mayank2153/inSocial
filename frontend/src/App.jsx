import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
import Header from './components/header.jsx';
import Login from './components/Login/login.jsx';
import { Provider } from 'react-redux';
import Store from './utils/store.jsx';
import MultiStepForm from './components/Signup/multistepForm.jsx';
import ShowCategories from './components/category/category.jsx';
import HomePage from './components/homepage/homepage.jsx';
import PostPage from './components/homepage/postPage/postPage.jsx';
import CreatePost from './components/createPost/createPost.jsx';
import PostByCategory from './components/homepage/postByCategory/postByCategory.jsx';
import SearchResults from './components/searchResults/searchResults.jsx';
import EditPost from './components/homepage/editPost/editPost.jsx';
import Right from './components/right/right.jsx';
function Layout() {
  return (
    <div  className="montserrat-medium">
      <Provider store={Store}>
        <Header />
        <div className='flex'>
          <ShowCategories />
          <Outlet />
          <Right />
        </div>
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
          path: "/",
          element: <HomePage />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <MultiStepForm /> 
        },
          {
          path: "/post/:postId",
          element: <PostPage />
        },
        {
          path: "/createPost",
          element: <CreatePost />
        },
        {
          path: "posts/category/:categoryId",
          element: <PostByCategory />
        },
        {
          path:"/searchresults",
          element:<SearchResults />
        },
        {
          path: "/post/edit-post/:postId",
          element: <EditPost />
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
