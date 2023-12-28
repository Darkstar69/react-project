import React, { useEffect, useState } from "react";
import adsVideo1 from "./assets/pexels-yegor-7386954 (1080p).mp4";
import HeaderAll from "./HeaderAll";
import NonVegMenu from "./NonVegMenu";
import VejMenu from "./VejMenu";
import DrinksMenu from "./DrinksMenu";
import DesertsMenu from "./DesertsMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => (
  <>
    <NonVegMenu />
    <VejMenu />
    <DrinksMenu />
    <DesertsMenu />
  </>
);

function Home() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get the user data from the server
        const response = await axios.get("http://localhost:5000/");
        if (response.data.status === "Success") {
          setAuth(true);
          setEmail(response.data.email);
          localStorage.setItem("email", response.data.email);
        } else {
          setAuth(false);
          setMessage(response.data.Message);
          navigate("/login");
        }
      } catch (error) {
        // Handle any errors
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  useEffect(() => {
    const usernanme = async () => {
      setLoading(true);
      try {
        // Send the email back to the server and get the name
        const result = await axios.post("http://localhost:5000", { email });
        if (result.data !== "error") {
          setName(result.data);
          // Show a popup with the name and hide it after 10 seconds
          let userPopup = document.querySelector(".userPopup");
          userPopup.style.display = "block";
          setTimeout(() => {
            userPopup.style.display = "none";
          }, 10000);
        }
      } catch (err) {
        // Handle any errors
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    usernanme();
  }, [email]);

  // different filter based component rendering logic
  const [button, setButton] = useState(null);
  const Button = {
    ALL: "all",
    NONVEG: "nonveg",
    VEG: "veg",
    DRINKS: "drinks",
    DESERTS: "deserts",
  };

  const buttonComponents = (button) => {
    return {
      [Button.NONVEG]: <NonVegMenu />,
      [Button.VEG]: <VejMenu />,
      [Button.DRINKS]: <DrinksMenu />,
      [Button.DESERTS]: <DesertsMenu />,
      [Button.ALL]: <Menu />,
    }[button];
  };
  // ends here

  return (
    <>
      <HeaderAll />

      {/* user welcome popup  */}
      <div className="userPopup hidden absolute z-20 top-16 left-1/2 -translate-x-1/2">
        <h2 className="text-3xl font-sans font-semibold ">
          Welcome Back {name}
        </h2>
      </div>

      {/* hero section  */}
      <div className="w-full bg-yellow-400 pt-20 rounded-b-md">
        <div className="w-full h-[60vh] flex p-4 gap-4 flex-wrap justify-center items-center container">
          <div className="h-fit w-5/12 rounded-md ">
            <video
              autoPlay
              loop
              muted
              className="h-full w-full rounded-md"
              src={adsVideo1}
            ></video>
          </div>
          <div className=" w-5/12 h-fit flex flex-wrap flex-col gap-4 items-center py-4">
            <h1 className="font-bold text-2xl text-yellow-900 md:text-5xl lg:w-10/12">
              Food That Reminds You Of Home
            </h1>
            <p className="font-bold text-xl w-3/4 text-yellow-700">
              The only thing better than our food is our service.
            </p>
          </div>
        </div>
      </div>

      {/* different menu filters */}
      <div className="w-full flex items-center justify-center gap-4 p-4 flex-wrap">
        <button
          onClick={() => setButton("all")}
          className="bg-yellow-400 py-2 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-8 "
        >
          All Items
        </button>
        <button
          onClick={() => setButton("veg")}
          className="bg-yellow-400 py-2 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-8 "
        >
          Veg Items
        </button>
        <button
          onClick={() => setButton("nonveg")}
          className="bg-yellow-400 py-2 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-8 "
        >
          Non Veg Items
        </button>
        <button
          onClick={() => setButton("deserts")}
          className="bg-yellow-400 py-2 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-8 "
        >
          Deserts
        </button>
        <button
          onClick={() => setButton("drinks")}
          className="bg-yellow-400 py-2 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-8 "
        >
          Drinks
        </button>
      </div>

      {/* changing components based on conditions */}
      {button === null ? <Menu /> : buttonComponents(button)}
    </>
  );
}

export default Home;
