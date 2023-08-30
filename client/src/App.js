import React from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import axios from "axios";
import { useDispatch } from "react-redux";
import Post from "./pages/Post/Post";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("http://localhost:5000/api/getUser", {
        withCredentials: true,
      });

      if (res.data) {
        dispatch({
          type: "AUTH",

          payload: {
            user: res.data.user,
            token: res.data.accessToken,
          },
        });
      }
    };

    getUser();
  }, []);

  return (
    <>
      <Header />

      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detail/:id" element={<Post />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default App;
