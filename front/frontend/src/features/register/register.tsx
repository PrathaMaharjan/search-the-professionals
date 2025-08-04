import { useState, type ChangeEvent, type FormEvent } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
  import { registerApi } from "../../shared/config/api";
import type { AxiosResponse, AxiosError } from "axios";
export default function Register() {
 const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (loading) {
      return;
    }
    setLoading(true);
    registerApi(formData)
      .then((res: AxiosResponse) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.userData));
        navigate("/");
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
    <div className="register-wrapper">
      <form className="register-form" onSubmit={handleSubmit} action="">
        <h1>Register</h1>
        <label>Username</label>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          type="text"
        />
        <label>Email</label>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          type="email"
        />

        <label>Password</label>
        <input
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
