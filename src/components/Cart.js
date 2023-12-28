import React, { useEffect, useState } from "react";
import HeaderAll from "./HeaderAll";
import { useCart } from "react-use-cart";
import "./styles/cart.css";
import { useNavigate } from "react-router-dom";
import SuccessGif from "./assets/success-tick-dribbble.gif";
import axios from "axios";




// card content
const CardContent = () => {
  
  const navigate = useNavigate();
  const { items, cartTotal, updateItemQuantity, removeItem, isEmpty } =
    useCart();

  const checkOutPopup = () => {
    let paymentPop = document.querySelector(".paymentPop");
    paymentPop.style.display = "flex";
  };

  const addressEdit = () => {
    let editAddress = document.querySelector(".editAddress");
    let currentAddress = document.querySelector(".currentAddress");
    editAddress.style.display = "flex";
    currentAddress.style.display = "none";
  };
  const updateAddress = () => {
    let editAddress = document.querySelector(".editAddress");
    let currentAddress = document.querySelector(".currentAddress");
    editAddress.style.display = "none";
    currentAddress.style.display = "flex";
  };

  const cancelProcess = () => {
    let C_popup = document.querySelector(".paymentPop");
    C_popup.style.display = "none";
  };

  const orderSucces = () => {
    let successPopup = document.querySelector(".popupBox");
    successPopup.style.display = "flex";
    setTimeout(() => {
      successPopup.style.display = "none";
      navigate("/home");
    }, 3000);
  };


  return (
    <>
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* fetching cart data from usecart  */}
        <div className="cartItemConatiner w-full h-[70vh] items-center flex flex-col overflow-y-scroll">
          {/* cart item  */}
          {items.map((i) => {
            return (
              <div className="rounded-lg md:w-2/3">
                <div className="justify-between mb-4 rounded-lg bg-white border p-6 shadow-lg sm:flex sm:justify-start">
                  <img src={i.img} className="w-full h-20 rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between sm:items-center">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {i.title}
                      </h2>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() =>
                            updateItemQuantity(i.id, i.quantity - 1)
                          }
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="tel"
                          value={i.quantity}
                          min="1"
                        />
                        <span
                          onClick={() =>
                            updateItemQuantity(i.id, i.quantity + 1)
                          }
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">&#8377; {i.price}</p>
                        <svg
                          onClick={() => removeItem(i.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtotal div  */}
        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">&#8377; {cartTotal}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">Shipping</p>
            <p class="text-gray-700">&#8377; {isEmpty ? 0 : 30}</p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="">
              <p class="mb-1 text-lg font-bold">
                &#8377; {isEmpty ? 0 : cartTotal + 30} INR
              </p>
              <p class="text-sm text-gray-700">including GST</p>
            </div>
          </div>
          <button
            onClick={checkOutPopup}
            class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
          >
            Check out
          </button>
        </div>
      </div>

      {/* checkout page popup */}
      <div className="paymentPop hidden items-center justify-center backdrop-blur-sm absolute top-0 left-0 right-0 w-full h-full z-20">
        <div className=" h-full rounded-md w-2/5 bg-white shadow-lg px-4">
          {/* cancel payment button  */}
          <button
            onClick={cancelProcess}
            title="Cancel"
            className="px-4 py-2 bg-red-500 rounded-full float-right mt-2 mr-2 hover:bg-red-700"
          >
            X
          </button>

          <h1 className="text-center text-yellow-900 text-3xl font-bold font-sans mt-12">
            Payment Page
          </h1>

          <div className="w-full bg-gray-200 rounded-lg mt-2">
            <h3 className="text-center text-lg font-bold ">Address</h3>

            {/* current address div  */}
            <div className="flex flex-col gap-1 p-1 currentAddress pb-2">
              <p>
                Name : <span>Rahul Das</span>
              </p>
              <p>
                Vill/Town : <span>Park Street 24</span>
              </p>
              <p>
                District : <span>Jhargram</span>
              </p>
              <p>
                Mobile Number : <span>7878789045</span>
              </p>
              <p>
                Pincode : <span>721124</span>
              </p>
              <button
                onClick={addressEdit}
                className=" float-right px-6 py-2 hover:bg-green-700 bg-green-500 rounded-full block m-auto"
              >
                Edit Address
              </button>
            </div>

            {/* update address div  */}
            <div className="hidden flex-col gap-1 items-center editAddress pb-2">
              <input
                className=" w-3/5 rounded-md outline-none  py-2"
                type="text"
                placeholder=" Name : Rahul Das"
              />
              <input
                className=" w-3/5 rounded-md outline-none  py-2"
                type="text"
                placeholder=" Viill/Town : Park Street 24"
              />
              <input
                className=" w-3/5 rounded-md outline-none  py-2"
                type="text"
                placeholder=" District : Jhargram"
              />
              <input
                className=" w-3/5 rounded-md outline-none  py-2"
                type="text"
                placeholder=" Mobile Number : 7878789045"
              />
              <input
                className=" w-3/5 rounded-md outline-none  py-2"
                type="text"
                placeholder=" Pincode : 721124"
              />
              <button
                onClick={updateAddress}
                className="px-6 py-2 hover:bg-green-700 bg-green-500 rounded-full block m-auto"
              >
                Update Details
              </button>
            </div>
          </div>

          {/* payment mode div  */}
          <div className="p-4">
            <h3 className="text-center font-bold font-sans text-2xl">
              Select Payment Mode
            </h3>
            <h3 className="text-center font-bold font-sans text-lg text-green-600">
              Your Total Amount Is &#8377; {cartTotal + 30}
            </h3>
            <div className="flex gap-4 w-full justify-center p-4">
              <label className="cursor-pointer font-bold ">
                Online Pay <input name="paymentMode" type="radio" checked/>
              </label>
              <label className="cursor-pointer font-bold ">
                Cash On Delivery <input name="paymentMode" type="radio" />
              </label>
            </div>
            <button
              onClick={orderSucces}
              className="bg-yellow-400 py-2 px-6 rounded-full block m-auto hover:bg-yellow-600"
            >
              Order Now
            </button>
          </div>

          {/* order success popup  */}
          <div className="popupBox transition-all hidden items-center justify-center w-full h-full absolute top-0 left-0 right-0 z-10 backdrop-blur-sm">
            <div className=" w-48 h-48 shadow-2xl bg-white rounded-full overflow-hidden">
              <img src={SuccessGif} />
              <h4
                className="text-center text-yellow-900
         text-xl"
              >
                Confirmed
              </h4>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

// empty cart frame
const EmptyCart = () => (
  <h1 className="text-center text-2xl text-gray-700 font-bold">
    Your Cart Is Empty 😢
  </h1>
);

function Cart() {
  const { isEmpty } = useCart();
  const navigate = useNavigate()
  
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:5000/cart").then((res) => {
      if (res.data.status !== "Success") {
        navigate('/login');
      }
    });
  }, []);

  return (
    <>
      <HeaderAll />
      <div className="h-full bg-yellow-400 pt-20 ">
        {isEmpty ? <EmptyCart /> : <CardContent />}
      </div>
    </>
  );
}

export default Cart;
