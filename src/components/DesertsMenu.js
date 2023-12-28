import React from "react";
import { DesertData } from "./DesertData";
import { useCart } from "react-use-cart";


function DesertsMenu() {
  const { addItem } = useCart();


  return (
    <>
      <h1 className="text-center text-gray-700 font-bold text-2xl">DESERTS</h1>

      {/* cards container  */}
      <div className="w-full flex justify-center items-center flex-wrap gap-8 py-8 px-4 bg-white rounded-t-lg">
        
        {/* cards  */}
        {DesertData.map((i) => {
          return (
            <div className="card flex flex-col h-fit w-56 overflow-hidden bg-white rounded-lg shadow-2xl">
              <div className="cardTop w-full h-[10rem]">
                <img className="w-full h-full" src={i.img} alt="" />
              </div>
              <div className="cardBottom w-full flex flex-col p-4 gap-2">
                <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
                  {i.title}
                </p>
                <p className=" flex gap-2 text-[22px] font-bold text-[#0FB478]">
                  <span className="font-bold line-through text-gray-700 text-[16px] leading-7 mb-1">
                    {" "}
                    &#8377; {i.prevPrice}
                  </span>
                  &#8377; {i.price}
                </p>
                <button
                  onClick={() => addItem(i)}
                  className="text-center font-bold px-6 py-2 rounded-full transition-colors duration-300 transform bg-[#FFC933] hover:bg-[#FFC933DD] hover:brightness-75"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
        
      </div>
    </>
  );
}

export default DesertsMenu;
