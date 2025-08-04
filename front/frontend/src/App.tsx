import { Route, Routes } from "react-router-dom";
import Login from "./features/login/login";
import Register from "./features/register/register";
import Home from "./features/homePage/homePage";
import "./App.css";

function App() {
  //functionality

  return (
    //HTML
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element= {<Register/>} />
      <Route path="/home" element= {<Home/>} />
    </Routes>
  );
}

export default App;
