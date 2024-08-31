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
import VerifyEmail from './components/Signup/verifyEmail.jsx';
import VerifyNewEmail from './components/settings/verifyChangeEmail.jsx';
import GoogleRedirectHandler from './components/redirect/redirectHandler.jsx';
import ContactUs from './components/contactUs/contactUs.jsx';



function Layout() {
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesVisible(!isCategoriesVisible);
  };
  const hideCategories = () => {
    setIsCategoriesVisible(false);
  };

  return (
    <div className="montserrat-medium">
      <Header toggleCategories={toggleCategories} />

      <div className="flex flex-col lg:flex-row h-screen">
        {/* Categories section, visible by default on large screens */}
        <div
          className={`lg:block ${
            isCategoriesVisible ? "block" : "hidden"
          } lg:w-1/4 lg:max-w-xs h-full lg:h-auto overflow-y-auto lg:overflow-y-visible bg-[#0d1114]`}
        >
          <ShowCategories hideCategories={hideCategories} />
        </div>


        {/* Main content section, hide when categories are visible on mobile */}
        <div
          className={`flex-grow ${
            isCategoriesVisible ? "hidden" : "block"
          } lg:block overflow-y-auto h-full`}
        >
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
    element: <Login />,
  },
  {
    path: "/redirect",
    element: <GoogleRedirectHandler />,
  },
  {
    path: "/register",
    element: <MultiStepForm />,
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
  {
    path: "/Forget-Password",
    element: <ForgetPassword />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />
  },
  {
    path: "/change-current-email",
    element: (
      <ProtectedRoute>
        <ChangeCurrentEmail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/change-current-email/verify-otp",
    element: (
      <ProtectedRoute>
        <VerifyNewEmail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-password/:accessToken",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/registerCategory",
        element: <CategoryPage />,
      },
      {
        path: "/post/:postId",
        element: <PostPage />,
      },
      {
        path: "/createPost",
        element: <CreatePost />,
      },
      {
        path: "posts/category/:categoryId",
        element: <PostByCategory />,
      },
      {
        path: "/UserProfile/:userId",
        element: <UserProfile />,
      },
      {
        path: "/searchresults",
        element: <SearchResults />,
      },
      {
        path: "/post/edit-post/:postId",
        element: <EditPost />,
      },
      {
        path: "/Update-current-password",
        element: <ChangeCurrentPassword />,
      },
      {
        path: "/notification/:userId",
        element: <Notifications />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouting} />
      </PersistGate>
    </Provider>
  );
}

export default App;