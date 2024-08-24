import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/header.jsx';
import Login from './components/Login/login.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './utils/store.jsx'; // Corrected import
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
import { PersistGate } from 'redux-persist/integration/react';
import ChangeCurrentPassword from './components/settings/ChangeCurrentPassword.jsx';
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx';
import ResetPassword from './components/ForgetPassword/resetPassword.jsx';
import ChangeCurrentEmail from './components/settings/ChangeCurrentEmail.jsx';
import { useState } from 'react';
import Notifications from './components/notification/notifications.jsx';

function Layout() {
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesVisible(!isCategoriesVisible);
  };

  return (
    <div className="montserrat-medium ">
      <Header toggleCategories={toggleCategories} /> 

      <div className="flex flex-col lg:flex-row  ">
        {/* Categories section, visible by default on large screens */}
        <div className={`lg:block ${isCategoriesVisible ? 'block' : 'hidden'} lg:w-1/4 lg:max-w-xs`}>
          <ShowCategories />
        </div>

        <div className="flex-grow">
          <Outlet />
        </div>

        {/* Right section, moved to footer on small screens */}
        <div className="hidden lg:block lg:w-1/4 lg:max-w-xs overflow-x-hidden">
          <Right />
        </div>
      </div>

      {/* Right section as footer on small screens */}
      <div className="lg:hidden fixed bottom-0 w-full">
        <Right />
      </div>
    </div>
  );
}




const appRouting = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Login />
        </PersistGate>
      </Provider>
    ),
  },
  {
    path: "/register",
    element: (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MultiStepForm />
        </PersistGate>
      </Provider>
    ),
  },
  {
    path: "/Forget-Password",
    element: (
      <ForgetPassword />
    ),
  },
  {
    path: "/reset-password/:accessToken",
    element:(
      < ResetPassword />
    )
  }
  ,
  {
    path: "/",
    element: (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout />
        </PersistGate>
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
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
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Update-current-password",
        element: (
          <ProtectedRoute>
            <ChangeCurrentPassword />
          </ProtectedRoute>
        )
      },
      {
        path: "/change-current-email",
        element: (
          <ProtectedRoute>
            <ChangeCurrentEmail/>
          </ProtectedRoute>
        )
      },
      {
        path: "/notification/:userId",
        element: (
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        )
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouting} />;
}

export default App;
