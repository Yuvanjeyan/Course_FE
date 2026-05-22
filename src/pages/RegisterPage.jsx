import { useState } from "react";
import { register } from "../services/authService";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
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
      const data = await register(formData);

      console.log(data);

      alert("Registration Successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="border p-3 rounded"
          />

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

          <select
            name="role"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="student">
              Student
            </option>

            <option value="teacher">
              Teacher
            </option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;