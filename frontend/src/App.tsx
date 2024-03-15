import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Home } from "./pages/Home";
import { BlogCreateEdit } from "./components/BlogCreateEdit";
import { RecoilRoot } from "recoil";
import { PrivateRoute } from "./components/route-components/PrivateRoute";
import { PrivateLoggedInRoute } from "./components/route-components/PrivateLoggedInRoute";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path='/signup'
              element={
                <PrivateLoggedInRoute>
                  <Signup />
                </PrivateLoggedInRoute>
              }
            />
            <Route
              path='/signin'
              element={
                <PrivateLoggedInRoute>
                  <Signin />
                </PrivateLoggedInRoute>
              }
            />
            <Route
              path='/blog/:id'
              element={
                <PrivateRoute>
                  <Blog />
                </PrivateRoute>
              }
            />
            <Route
              path='/new'
              element={
                <PrivateRoute>
                  <BlogCreateEdit type='new' />
                </PrivateRoute>
              }
            />
            <Route
              path='/edit/:id'
              element={
                <PrivateRoute>
                  <BlogCreateEdit type='edit' />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
