import { useState, type ChangeEvent, type FormEvent } from "react";
import "./login.css";
import type { AxiosError, AxiosResponse } from "axios";
import { loginApi } from "../../shared/config/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) {
      return;
    }
    console.log(formData);
    setLoading(true);
    loginApi(formData)
      .then((res: AxiosResponse) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.userData));
        navigate("/home");
      })
      .catch((error: AxiosError) => {
        console.log(error);
        alert(error.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit} action="">
        <h1>Login</h1>
        <label>Username</label>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          type="text"
        />
        <label>Password</label>

        <input
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          type="text"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}