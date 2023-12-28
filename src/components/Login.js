import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate(); // using navigate
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  }); // userinputs
  
  axios.defaults.withCredentials = true;

  const handleForm = (event) => {
    // form handler logic
    event.preventDefault();
    axios
      .post("http://localhost:5000/login", loginData)
      .then((response) => {
        if (response.data.data !== null) {
          let dbpass = response.data.passwd; // databse pass according to the email
          if (dbpass === loginData.password) {
            // checking if the given email's password is same or not
            navigate("/home"); // on validation success navigate to home
          } else {
            let passwordAlert = document.querySelector(".inpass"); // password wrong alert span
            passwordAlert.style.display = "inline-block"; // wrong password alert
            setTimeout(() => {
              passwordAlert.style.display = "none";
            }, 5000); // timeout for wrong pass
          }
        } else {
          let emailAlert = document.querySelector(".inemail"); // email wrong alert span
          emailAlert.style.display = "inline-block"; // wrong email alert
          setTimeout(() => {
            emailAlert.style.display = "none";
          }, 5000); // timeout for wrong email alert
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <!-- component --> */}
      <div class="bg-yellow-400 flex justify-center items-center h-screen overflow-hidden">
        {/* <!-- Left: Image --> */}
        <div class="w-1/2 h-screen hidden lg:block">
          <img
            src="https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Placeholder Image"
            class="object-cover w-full h-full"
          />
        </div>

        {/* <!-- Right: Login Form --> */}
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 class="text-2xl font-semibold mb-4">Login</h1>

          <form onSubmit={handleForm}>
            {/* <!-- Username Input --> */}
            <div class="mb-4">
              <label for="email" class="block text-gray-600">
                Email{" "}
                <span className="inemail text-red-500 hidden">
                  Email Doesn't Match
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(event) =>
                  setLoginData({ ...loginData, email: event.target.value })
                }
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>

            {/* <!-- Password Input --> */}
            <div class="mb-4">
              <label for="password" class="block text-gray-600">
                Password{" "}
                <span className="inpass text-red-500 hidden">
                  Incorrect Password
                </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(event) =>
                  setLoginData({ ...loginData, password: event.target.value })
                }
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
            </div>

            {/* <!-- Remember Me Checkbox --> */}
            <div class="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                class="text-blue-500"
              />
              <label for="remember" class="text-gray-600 ml-2">
                Remember Me
              </label>
            </div>

            {/* <!-- Forgot Password Link --> */}
            <div class="mb-6 text-blue-500">
              <Link to="/forgotpass" class="hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* <!-- Login Button --> */}
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>

          {/* <!-- Sign up  Link --> */}
          <div class="mt-6 text-blue-500 text-center">
            <Link to="/signup" class="hover:underline">
              Sign up Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
