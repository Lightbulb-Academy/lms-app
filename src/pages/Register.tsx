import { useState } from "react";
import { object, string } from "yup";
import CustomInput from "../components/CustomInput";
import { NavLink, useNavigate } from "react-router";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const registerSchema = object({
  name: string()
    .trim()
    .required()
    .min(3, "Name should be atleast 3 characters"),
  email: string().trim().required().email(),
  phone: string()
    .required()
    .min(10)
    .matches(/^[0-9]*$/, "Phone should not contain string!"),
  password: string().required("Password is a required field!"),
});

// Event triggers
// - user interactions
//  - onClick
//  - onChange
//  - onSubmit
// - automatic
//  - useEffect

export default function Register() {
  // useState is a react hook to store state values
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();  // initialize navigate hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // input values extraction from the form
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData);

    // Validation using Yup
    try {
      const validFormData = await registerSchema.validate(formValues, {
        abortEarly: false,
      });
      registerUser(validFormData);
    } catch (error: any) {
      setError(error.errors.join("\n"));
      return;
    }
  };

  // always wrap API calls in try-catch block
  const registerUser = async (formData: FormData) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  // Request method
  // - GET - default method
  // - POST - create (has request body)
  // - PATCH - update (has request body)
  // - DELETE

  return (
    <div className="flex flex-col w-90 bg-white p-4 rounded shadow-md">
      <h1 className="text-lg font-bold text-center">Register</h1>
      <form className="flex flex-col p-4 w-full gap-2" onSubmit={handleSubmit}>
        <CustomInput label="Name" />
        <CustomInput label="Email" type="email" />
        <CustomInput label="Phone" type="tel" />
        <CustomInput label="Password" type="password" />
        <p className="text-red-400">{error}</p>

        <button type="submit" className="bg-black text-white mt-4 rounded py-1">
          Submit
        </button>

        <p className="w-full mt-4 text-center">
          Already have an account?
          <span className="ml-2 text-blue-500 hover:underline">
            <NavLink to="/login">Login</NavLink>
          </span>
        </p>
      </form>
    </div>
  );
}
