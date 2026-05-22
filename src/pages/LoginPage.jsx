import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "../redux/authSlice";

import { toast } from "react-toastify";
import { login } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);

      dispatch(setCredentials(data));
      toast.success("Login Successful");

      // ROLE BASED REDIRECT

      if (data.role === "admin") {
        navigate("/admin");
      }

      if (data.role === "teacher") {
        navigate("/teacher");
      }

      if (data.role === "student") {
        navigate("/student");
      }
      
    } catch (error) {
      console.log(error);

      toast.error("Invalid Credentials"); 
    }
  };
  useEffect(() => {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/admin");
      }

      if (userInfo.role === "teacher") {
        navigate("/teacher");
      }

      if (userInfo.role === "student") {
        navigate("/student");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border-t pt-10"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Login
          </button>

          <button onClick = {()=> navigate("/register")} 
          className="hover:bg-green-500 text-white py-3 rounded bg-green-700">Register</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;