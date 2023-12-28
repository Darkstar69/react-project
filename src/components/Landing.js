import React from "react";
import Header from "./Header";
import burgerPic from "./assets/food.png";
import spaggeti from "./assets/spaggeti.jpg";
import ramenJap from "./assets/ramen.jpg";
import burgerSpecial from "./assets/burger special.jpg";
import fishDish from "./assets/fish dish.jpg";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";


function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      {/* landing page container  */}
      <div className="bg-yellow-50 select-none w-full h-fit px-6 pt-28">
        <div className="flex flex-wrap container m-auto md:px-12 lg:pt-[4.8rem] lg:px-7 h-[90vh] pb-16">
          <div className="leftBanner w-1/2 h-full flex flex-col gap-8 justify-start items-center">
            <h1 className="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">Your favorite dishes, right at your door</h1>
            <div className="flex gap-2 flex-wrap">
              <Link
                to="/home"
                className="bg-yellow-400 rounded-fullml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12" href="#">
                Veg
              </Link>
              <Link
                to="/home"
                className="bg-yellow-400 rounded-fullml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12" href="#">
                NonVeg
              </Link>
              <Link
                to="/home"
                className="bg-yellow-400 rounded-fullml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12" href="#">
                Deserts
              </Link>
              <Link
                to="/home"
                className="bg-yellow-400 rounded-fullml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12" href="#">
                Drinks
              </Link>
            </div>
            <p className="text-gray-700 lg:w-10/12">
              Taste what{" "}
              <a href="#" className="text-yellow-700">
                happiness{" "}
              </a>
              feels like with every bite of our food!
            </p>
          </div>
          <div className="rightBanner w-1/2 pt-8 ">
            <img
              src={burgerPic}
              className="relative h-[500px] left-16 top-[-5rem]"
              alt="food illustration"
            />
          </div>
        </div>
      </div>

      {/* main page naivgate button  */}
      <div className="flex items-center justify-center w-full h-14 mt-4">
        <button
          onClick={() => navigate('/login')}
          className=" cursor-pointer flex items-center justify-center gap-1 text-black px-6 py-2 rounded-full transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400"
          href="/home"
        >
          Something Else <span className="text-2xl">&rarr;</span>
        </button>
      </div>

      {/* card container  */}
      <div className="container flex justify-center items-center flex-wrap p-4 gap-4 min-w-full">
        {/* card 1 */}
        <div className="card shadow-2xl rounded-lg max-w-[20rem] mx-auto">
          <img className="h-[200px] rounded-t-lg" src={spaggeti} alt="" />
          <div className="flex flex-col p-4 sm:p-6">
            <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
              Italian Spaggeti
            </p>
            <div className="flex flex-row">
              <p class="text-[#3C3C4399] text-[17px] mr-2 line-through">
                &#8377; 399
              </p>
              <p class="text-[17px] font-bold text-[#0FB478]">&#8377; 249</p>
            </div>
            <button onClick={() => navigate('/login')} className="block px-4 py-2 transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] hover:brightness-75 mt-4">
              Order Now
            </button>
          </div>
        </div>

        {/* card 2 */}
        <div className="card shadow-2xl rounded-lg max-w-[20rem] mx-auto">
          <img className="h-[200px] rounded-t-lg" src={ramenJap} alt="" />
          <div className="flex flex-col p-4 sm:p-6">
            <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
              Japnese Style Ramen
            </p>
            <div className="flex flex-row">
              <p class="text-[#3C3C4399] text-[17px] mr-2 line-through">
                &#8377; 499
              </p>
              <p class="text-[17px] font-bold text-[#0FB478]">&#8377; 399</p>
            </div>
            <button onClick={() => navigate('/login')} className="block px-4 py-2 transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] hover:brightness-75 mt-4">
              Order Now
            </button>
          </div>
        </div>

        {/* card 3 */}
        <div className="card shadow-2xl rounded-lg max-w-[20rem] mx-auto">
          <img className="h-[200px] rounded-t-lg" src={burgerSpecial} alt="" />
          <div className="flex flex-col p-4 sm:p-6">
            <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
              Special Burger
            </p>
            <div className="flex flex-row">
              <p class="text-[#3C3C4399] text-[17px] mr-2 line-through">
                &#8377; 249
              </p>
              <p class="text-[17px] font-bold text-[#0FB478]">&#8377; 199</p>
            </div>
            <button onClick={() => navigate('/login')} className="block px-4 py-2 transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] hover:brightness-75 mt-4">
              Order Now
            </button>
          </div>
        </div>
        {/* card 4 */}
        <div className="card shadow-2xl rounded-lg max-w-[20rem] mx-auto">
          <img className="h-[200px] rounded-t-lg" src={fishDish} alt="" />
          <div className="flex flex-col p-4 sm:p-6">
            <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
              Fish Kabab
            </p>
            <div className="flex flex-row">
              <p class="text-[#3C3C4399] text-[17px] mr-2 line-through">
                &#8377; 199
              </p>
              <p class="text-[17px] font-bold text-[#0FB478]">&#8377; 149</p>
            </div>
            <button onClick={() => navigate('/login')} className="block px-4 py-2 transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] hover:brightness-75 mt-4">
              Order Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Landing;
