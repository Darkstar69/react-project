import React, { useEffect, useState } from "react";
import HeaderAll from "./HeaderAll";
import SuccessGif from "./assets/success-tick-dribbble.gif";
import Header from "./Header";
import axios from "axios";

function Contact() {
  const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/contact").then((res) => {
      if (res.data.status === "Success") {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  }, []);

  const successAlert = () => {
    let popup = document.querySelector(".popupBox");
    let input = document.querySelectorAll(".input");
    if (input.value != " ") {
      popup.style.display = "flex";
      setTimeout(() => {
        popup.style.display = "none";
      }, 3000);
    }
  };

  return (
    <>
      {auth ? <HeaderAll /> : <Header />}

      <section className="p-6 bg-yellow-400 pt-20 h-full">
        <form
          novalidate=""
          className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow bg-yellow-200"
        >
          <h2 className="w-full text-3xl font-bold leadi">Contact us</h2>
          <div>
            <label for="name" className="block mb-1 ml-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              required=""
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ri focus:ri bg-white"
            />
          </div>
          <div>
            <label for="email" className="block mb-1 ml-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              required=""
              className="block w-full p-2 rounded focus:outline-none focus:ring focus:ri focus:ri bg-white"
            />
          </div>
          <div>
            <label for="message" className="block mb-1 ml-1">
              Message
            </label>
            <textarea
              id="message"
              type="text"
              placeholder="Message..."
              className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ri focus:ri bg-white"
            ></textarea>
          </div>
          <div>
            <button
              onClick={successAlert}
              type="submit"
              className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ri dark:bg-violet-400 focus:ri hover:ri dark:text-gray-900"
            >
              Send
            </button>
          </div>
        </form>
      </section>

      {/* popup effect  */}
      <div className="popupBox transition-all hidden items-center justify-center w-full h-full absolute top-0 left-0 right-0 z-10 backdrop-blur-sm">
        <div className=" w-48 h-48 shadow-2xl bg-white rounded-full overflow-hidden">
          <img src={SuccessGif} />
          <h4
            className="text-center text-yellow-900
         text-xl"
          >
            Success
          </h4>
        </div>
      </div>
    </>
  );
}

export default Contact;
