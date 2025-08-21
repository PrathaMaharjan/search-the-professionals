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
    role: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    registerApi(formData)
      .then((res: AxiosResponse) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.userData));
        navigate("/");
      })
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      })
      .finally(() => setLoading(false));
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

        <label>Role</label>
        <input
          name="role"
          placeholder="role"
          onChange={handleChange}
          value={formData.role}
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

        <button type="submit">Submit</button>

        {/* Login link */}
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Log in</span>
        </p>
      </form>
    </div>
  );
}
