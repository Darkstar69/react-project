import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate(); // defining usenavigate
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  }); // signupinput data

  const [confirmPass, setConfirmPass] = useState(""); // confirm password usestate variable

  const handleSubmit = (event) => {
    event.preventDefault(); // prevending from reload
    let upass = document.getElementById("pass"); // user input password
    let uconpass = document.getElementById("conPass"); // user input confirm password
    if (signupData.password === confirmPass) {
      // checking for if passowrd and confirm password is same or not
      axios
        .post("http://localhost:5000/signup", signupData)
        .then((response) => {
          let userid = response.data.id;
          if (userid !== undefined || userid !== 0 || userid !== null) {
            // checking if user created or not
            navigate("/login"); // navigating the user to login
          } else {
            event.target.reset(); // reseting the form
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      upass.style.display = "inline-block"; // pass doesn't match alert
      uconpass.style.display = "inline-block"; // confirm pass doesn't match  alert
      setTimeout(() => {
        upass.style.display = "none";
        uconpass.style.display = "none";
      }, 5000); // timeout for passowords
    }
  };

  return (
    <>
      <div class="bg-yellow-400 flex justify-center items-center h-screen overflow-hidden">
        {/* <!-- Left: Image --> */}
        <div class="w-1/2 h-screen hidden lg:block">
          <img
            src="https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Placeholder Image"
            class="object-cover w-full h-full"
          />
        </div>

        {/* <!-- Right: Login Form --> */}
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 class="text-2xl font-semibold mb-4">Sign Up</h1>

          <form onSubmit={handleSubmit} id="signUpForm">
            {/* <!-- name Input --> */}
            <div class="mb-4">
              <label for="name" class="block text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                onChange={(event) =>
                  setSignupData({ ...signupData, name: event.target.value })
                }
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
                required
              />
            </div>

            {/* <!-- mobile no Input --> */}
            <div class="mb-4">
              <label for="mobile" class="block text-gray-600">
                Mobile Number
              </label>
              <input
                type="tel"
                onChange={(event) =>
                  setSignupData({ ...signupData, phone: event.target.value })
                }
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
                required
              />
            </div>

            {/* <!-- email Input --> */}
            <div class="mb-4">
              <label for="emailId" class="block text-gray-600">
                Email ID
              </label>
              <input
                type="email"
                onChange={(event) =>
                  setSignupData({ ...signupData, email: event.target.value })
                }
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
                required
              />
            </div>

            {/* <!-- Password Input --> */}
            <div class="mb-4">
              <label for="password" class="block text-gray-600">
                Password{" "}
                <span id="pass" className="text-red-500 hidden">
                  Doesn't Match
                </span>
              </label>
              <input
                type="password"
                onChange={(event) =>
                  setSignupData({ ...signupData, password: event.target.value })
                }
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
                required
              />
            </div>

            {/* <!-- confirm Password Input --> */}
            <div class="mb-4">
              <label for="c_password" class="block text-gray-600">
                Confirm Password{" "}
                <span id="conPass" className="text-red-500 hidden">
                  Doesn't Match
                </span>
              </label>
              <input
                type="password"
                onChange={(event) => setConfirmPass(event.target.value)}
                class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
                required
              />
            </div>

            {/* <!-- signup Button --> */}
            <button
              // onClick={submitForm}
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Register
            </button>
          </form>

          {/* <!-- Sign up  Link --> */}
          <div class="mt-6 text-blue-500 text-center">
            <Link to="/login" class="hover:underline">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
