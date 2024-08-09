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

function Layout() {
  return (
    <div className="montserrat-medium">
      <Header />
      <div className='flex'>
        <ShowCategories />
        <Outlet />
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
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouting} />;
}

export default App;
