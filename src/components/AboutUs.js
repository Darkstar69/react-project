import React, { useEffect, useState } from "react";
import HeaderAll from "./HeaderAll";
import BannerVideo from "./assets/video (2160p).mp4";
import axios from "axios";
import Header from "./Header";

function AboutUs() {
  const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/about").then((res) => {
      if (res.data.status === "Success") {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  }, []);

  return (
    <>
      {auth ? <HeaderAll /> : <Header />}

      <div className="h-full bg-yellow-400 pt-20 w-full">
        <div className="h-full w-full flex items-start justify-center">
          <div className=" h-4/5 w-2/3 bg-yellow-200 rounded-md py-4 px-2">
            <h1 className="text-center text-4xl text-yellow-900 font-bold">
              Real Foodies
            </h1>
            <div className="w-full h-4/5 flex items-center py-4 px-2 mt-4">
              <div className="w-1/2 h-full p-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos magni iure sapiente saepe dolore aperiam, sequi
                  veritatis ab vero nobis quibusdam sit. Soluta odit atque
                  ducimus fugiat ipsum repellendus ratione ad quidem doloribus?
                  Aut veniam debitis facilis. Dolores ipsa sint et dignissimos
                  molestias eveniet hic libero quibusdam corrupti excepturi
                  architecto consequuntur nesciunt natus, eligendi aliquam fugit
                  molestiae dicta sequi officiis autem! Consequuntur qui
                  perspiciatis odit quae.
                </p>
              </div>
              <div className="w-1/2 h-fit rounded-md bg-black overflow-hidden">
                <video
                  className="w-full h-full"
                  autoPlay
                  loop
                  muted
                  src={BannerVideo}
                ></video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
