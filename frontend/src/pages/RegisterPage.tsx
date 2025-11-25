import { useState } from "react";
import axiosClient from "../api/axios";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

type userRegister = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const [form, setForm] = useState<userRegister>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axiosClient.post("/authentication/register", form);
      console.log("User registered successfully");
      setForm({ username: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      console.log("Invalid credentials");
    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="User Name"
            onChange={handleFormChange}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="User E-Mail"
            onChange={handleFormChange}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleFormChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
