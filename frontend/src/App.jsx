import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/header.jsx';
import Login from './components/Login/login.jsx';
import { Provider } from 'react-redux';
import store from './utils/store.jsx';
import MultiStepForm from './components/Signup/multistepForm.jsx';
import ShowCategories from './components/category/category.jsx';
import HomePage from './components/homepage/homepage.jsx';
import PostPage from './components/homepage/postPage/postPage.jsx';
import CreatePost from './components/createPost/createPost.jsx';
import PostByCategory from './components/homepage/postByCategory/postByCategory.jsx';
import CategoryPage from './components/category/categoryPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import UserProfile from './components/userProfile/userprofile.jsx';
import SearchResults from './components/searchResults/searchResults.jsx';
import EditPost from './components/homepage/editPost/editPost.jsx';
import Right from './components/right/right.jsx';

function Layout() {
  return (
    <div className="montserrat-medium">
      <Provider store={store}>
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

const appRouting = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: <MultiStepForm />,
      },
      {
        path: "/registerCategory",
        element: (
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post/:postId",
        element: (
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/createPost",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/category/:categoryId",
        element: (
          <ProtectedRoute>
            <PostByCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/UserProfile/:userId",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/searchresults",
        element: <SearchResults />,
      },
      {
        path: "/post/edit-post/:postId",
        element: <EditPost />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouting} />;
}

export default App;
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/header.jsx';
import Login from './components/Login/login.jsx';
import { Provider } from 'react-redux';
import store from './utils/store.jsx';
import MultiStepForm from './components/Signup/multistepForm.jsx';
import ShowCategories from './components/category/category.jsx';
import HomePage from './components/homepage/homepage.jsx';
import PostPage from './components/homepage/postPage/postPage.jsx';
import CreatePost from './components/createPost/createPost.jsx';
import PostByCategory from './components/homepage/postByCategory/postByCategory.jsx';
import CategoryPage from './components/category/categoryPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import UserProfile from './components/userProfile/userprofile.jsx';
import SearchResults from './components/searchResults/searchResults.jsx';
import EditPost from './components/homepage/editPost/editPost.jsx';
import Right from './components/right/right.jsx';

function Layout() {
  return (
    <div className="montserrat-medium">
      <Provider store={store}>
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

const appRouting = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: <MultiStepForm />,
      },
      {
        path: "/registerCategory",
        element: (
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post/:postId",
        element: (
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/createPost",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/category/:categoryId",
        element: (
          <ProtectedRoute>
            <PostByCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/UserProfile/:userId",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/searchresults",
        element: <SearchResults />,
      },
      {
        path: "/post/edit-post/:postId",
        element: <EditPost />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouting} />;
}

export default App;
