import { useState } from "react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.log("Incorrect password or email");
    }
  };
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="User E-Mail"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
