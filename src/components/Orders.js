import React, { useEffect, useState } from "react";
import HeaderAll from "./HeaderAll";
import { useCart } from "react-use-cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CurrentHeader = () => (
  <h2 className="text-yellow-900 text-center font-bold text-3xl pb-2">
    Current Orders
  </h2>
);

const HistoryHeader = () => (
  <h2 className="text-yellow-900 text-center font-bold text-3xl pb-2">
    Previous Orders
  </h2>
);

const CurrentOrders = () => {
  const { items } = useCart();

  return (
    <>
      {/* recent orders item  */}

      {items.map((i) => {
        return (
          <div className="card flex flex-col h-fit w-52 overflow-hidden bg-white rounded-lg shadow-2xl">
            <div className="cardTop w-full h-[10rem]">
              <img className="w-full h-full" src={i.img} alt="" />
            </div>
            <div className="cardBottom w-full flex flex-col p-4 gap-2">
              <p className="font-bold text-gray-700 text-xl leading-7 mb-1">
                {i.title}
              </p>
              <p className=" flex gap-2 font-bold text-xl text-[#0FB478]">
                &#8377; {i.price}
              </p>
              <button
                // onClick={() => addItem(i)}
                className="text-center font-bold px-6 py-2 rounded-full transition-colors duration-300 transform bg-[#FFC933] hover:bg-[#FFC933DD] hover:brightness-75"
              >
                Order Again
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

const OrderHistory = () => {
  const { items } = useCart();

  return (
    <>
      {/* recent orders item  */}

      {items.map((i) => {
        return (
          <div className="card flex flex-col h-fit w-52 overflow-hidden bg-white rounded-lg shadow-2xl">
            <div className="cardTop w-full h-[10rem]">
              <img className="w-full h-full" src={i.img} alt="" />
            </div>
            <div className="cardBottom w-full flex flex-col p-4 gap-2">
              <p className="font-bold text-gray-700 text-xl leading-7 mb-1">
                {i.title}
              </p>
              <p className=" flex gap-2 font-bold text-xl text-[#0FB478]">
                &#8377; {i.price}
              </p>
              <button
                // onClick={() => addItem(i)}
                className="text-center font-bold px-6 py-2 rounded-full transition-colors duration-300 transform bg-[#FFC933] hover:bg-[#FFC933DD] hover:brightness-75"
              >
                Order Again
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

function Orders() {
  const [orderType, setOrderType] = useState("recent");
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/orders").then((res) => {
      if (res.data.status !== "Success") {
        navigate('/login');
      }
    });
  }, []);

  return (
    <>
      <HeaderAll />

      <div className="w-full min-h-screen h-fit bg-yellow-400 pt-20">
        <div className="w-full flex justify-between px-8 pb-4">
          <button
            onClick={() => setOrderType("previous")}
            className="px-6 py-2 bg-orange-500 rounded-md shadow-lg hover:bg-orange-700"
          >
            Order History
          </button>
          <button
            onClick={() => setOrderType("recent")}
            className="px-6 py-2 bg-orange-500 rounded-md shadow-lg hover:bg-orange-700"
          >
            Current Orders
          </button>
        </div>
        {/* main container  */}
        {orderType == "recent" ? <CurrentHeader /> : <HistoryHeader />}
        <div className="w-full flex justify-center items-center flex-wrap gap-8 py-8 px-4 bg-yellow-400 rounded-t-lg">
          {orderType == "recent" ? <CurrentOrders /> : <OrderHistory />}
        </div>
      </div>
    </>
  );
}

export default Orders;
