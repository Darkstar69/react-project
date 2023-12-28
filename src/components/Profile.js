import React, { useEffect, useState } from "react";
import HeaderAll from "./HeaderAll";
import UserDemoPic from "./assets/user.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import saveIcon from "./assets/icons8-save-100.png";
import editIcon from "./assets/icons8-edit-100.png";

function Profile() {
  const navigate = useNavigate(); // for navigating user
  const [email, setEmail] = useState(localStorage.getItem("email")); // to define the email and get other details
  const [prevEmail, setPrevEmail] = useState(localStorage.getItem("prevEmail"));

  // saving the user personal details after post request
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    prevEmail: prevEmail,
  });
  
  
  // user address through post request
  const [userAddress, setUserAddress] = useState({
    town: "",
    street: "",
    dist: "",
    pincode: "",
  });

  // user validation through token
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const validateUser = async () => {
      const response = await axios.get("http://localhost:5000/profile");
      if (response.data.status !== "Success") {
        navigate("/login");
      } else {
        // setEmail(response.data.email);
        // localStorage.setItem('email', userDetails.email)
      }
    };
    validateUser();
  }, []);

  // getting the user perosnal details and address
  useEffect(() => {
    // personal details post req
    const pDetails = async () => {
      let user = { email: localStorage.getItem("email") };
      const resp = await axios.post("http://localhost:5000/profile", user);
      setUserDetails({
        ...userDetails,
        name: resp.data.name,
        phone: resp.data.phone,
        email: resp.data.email,
      });
    };
    pDetails(); // calling the func

    // user address post req
    const uAddress = async () => {
      let user = { email: localStorage.getItem("email") };
      const resp = await axios.post(
        "http://localhost:5000/profile/address",
        user
      );
      setUserAddress({
        ...userAddress,
        town: resp.data.villageTown,
        street: resp.data.street,
        dist: resp.data.district,
        pincode: resp.data.pincode,
      });
    };
    uAddress(); // calling the func
  }, [email]);

  const logoutUser = () => {
    axios
      .get("http://localhost:5000/logout")
      .then((res) => {
        if (res.data.Message === "Success") {
          navigate("/login");
        } else {
          alert("Logout Failed");
        }
      })
      .catch((err) => console.log(err));
  };

  // edit details function
  const editPersonalDetails = () => {
    let editpDetails = document.querySelector(".editpDetails"); // getting the div container details
    let sPdetails = document.querySelector(".sPdetails"); // getting the div container details
    let saveButton = document.querySelector(".saveBtn"); // save button icon
    saveButton.classList.remove("hidden"); // showing the button
    editpDetails.classList.remove("hidden"); // adding or removing the class names accordingly
    editpDetails.classList.add("flex"); // adding or removing the class names accordingly
    sPdetails.classList.add("hidden"); // adding or removing the class names accordingly

    let uname = document.querySelector(".pName"); //  getting the inputs and assigning old values
    uname.value = `${userDetails.name}`;
    let uemail = document.querySelector(".pEmail"); //  getting the inputs and assigning old values
    uemail.value = `${userDetails.email}`;
    let uphone = document.querySelector(".pNumber"); // getting the inputs and assigning old values
    uphone.value = `${userDetails.phone}`;
  };

  // updating the personal details function
  const savePersonalDetails = () => {
    let editpDetails = document.querySelector(".editpDetails");
    let sPdetails = document.querySelector(".sPdetails");
    editpDetails.classList.remove("flex");
    editpDetails.classList.add("hidden");
    sPdetails.classList.remove("hidden");
    sPdetails.classList.add("flex");
    let saveButton = document.querySelector(".saveBtn"); // save button icon
    saveButton.classList.add("hidden"); // showing the button
    localStorage.setItem("prevEmail", userDetails.email);
    axios
      .post("http://localhost:5000/profile/edit/personal", userDetails)
      .then((response) => {
        console.log(response);
        setEmail(userDetails.email);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editAddress = () => {
    let eAddress = document.querySelector(".eAddress");
    let sAddress = document.querySelector(".sAddress");
    let saveaddbtn = document.querySelector(".saveaddbtn");
    saveaddbtn.classList.remove("hidden");
    eAddress.classList.remove("hidden");
    eAddress.classList.add("flex");
    sAddress.classList.remove("flex");
    sAddress.classList.add("hidden");
  };

  const saveAddress = () => {
    let eAddress = document.querySelector(".eAddress");
    let sAddress = document.querySelector(".sAddress");
    let saveaddbtn = document.querySelector(".saveaddbtn");
    eAddress.classList.remove("flex");
    eAddress.classList.add("hidden");
    sAddress.classList.remove("hidden");
    sAddress.classList.add("flex");
    saveaddbtn.classList.add("hidden");
  };

  return (
    <>
      <HeaderAll />
      <div className="w-full h-full bg-yellow-400 pt-20 ">
        <div className=" h-full w-full flex justify-center">
          {/* showcase container   */}
          <div className=" showcaseContainer w-[60%] h-fit max-h-screen bg-yellow-200 rounded shadow-md p-4">
            {/* top div containin personal details  */}
            <div className="w-full h-fit flex justify-center gap-8 p-4">
              {/* profile avatar  */}
              <img className="w-[10%] h-fit" src={UserDemoPic} alt="" />

              {/* personal details  */}
              <div className=" w-[90%]">
                <h3 className="text-2xl font-bold font-sans text-yellow-900 flex items-center justify-center">
                  Personal Details :{" "}
                  <img
                    onClick={editPersonalDetails}
                    className=" h-12 cursor-pointer  "
                    title="Edit Personal Details"
                    src={editIcon}
                    alt=""
                  />
                  <img
                    onClick={savePersonalDetails}
                    src={saveIcon}
                    className="saveBtn hidden h-10 cursor-pointer "
                    title="save details"
                    alt=""
                  />
                </h3>

                {/* personal details input and output div pDetailsInput  */}
                <div>
                  <div className="sPdetails flex gap-2 flex-wrap justify-around">
                    <p className=" font-sans font-semibold ">
                      Name: {userDetails.name}
                    </p>
                    <p className=" font-sans font-semibold ">
                      Email: {userDetails.email}
                    </p>
                    <p className=" font-sans font-semibold ">
                      Phone: {userDetails.phone}
                    </p>
                  </div>

                  <div className="hidden editpDetails gap-2 flex-wrap justify-around">
                    <input
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          name: e.target.value,
                        });
                      }}
                      className="pName p-2 rounded-md outline-none"
                      type="text"
                      placeholder="Full Name"
                    />
                    <input
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        });
                      }}
                      className="pEmail p-2 rounded-md outline-none"
                      type="email"
                      placeholder="user1234@gmail.com"
                    />
                    <input
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          phone: e.target.value,
                        });
                      }}
                      className="pNumber p-2 rounded-md outline-none"
                      type="tel"
                      placeholder="1234567890"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* bottom div containing address  */}
            <div className="w-full p-4">
              <h3 className="text-2xl font-bold font-sans text-yellow-900 flex items-center justify-center">
                Address :{" "}
                <img
                  onClick={editAddress}
                  className=" h-12 cursor-pointer  "
                  title="Edit Personal Details"
                  src={editIcon}
                  alt=""
                />
                <img
                  onClick={saveAddress}
                  src={saveIcon}
                  className="saveaddbtn hidden h-10 cursor-pointer "
                  title="save details"
                  alt=""
                />
              </h3>

              {/* address div  */}
              <div>
                <div className="sAddress flex gap-4 flex-wrap">
                  <p className="font-sans font-semibold">
                    Village/Town : {userAddress.town}
                  </p>
                  <p className="font-sans font-semibold">
                    Street : {userAddress.street}
                  </p>
                  <p className="font-sans font-semibold">
                    District : {userAddress.dist}
                  </p>
                  <p className="font-sans font-semibold">
                    Pincode : {userAddress.pincode}
                  </p>
                </div>

                <div className="eAddress hidden gap-4 flex-wrap">
                  <input
                    onChange={(e) => {
                      setUserAddress({ ...userAddress, town: e.target.value });
                    }}
                    className="p-2 w-[48%] rounded-md outline-none "
                    type="text"
                    placeholder="village/town"
                  />
                  <input
                    onChange={(e) => {
                      setUserAddress({
                        ...userAddress,
                        street: e.target.value,
                      });
                    }}
                    className="p-2 w-[48%] rounded-md outline-none "
                    type="text"
                    placeholder="street"
                  />
                  <input
                    onChange={(e) => {
                      setUserAddress({ ...userAddress, dist: e.target.value });
                    }}
                    className="p-2 w-[48%] rounded-md outline-none "
                    type="text"
                    placeholder="district"
                  />
                  <input
                    onChange={(e) => {
                      setUserAddress({
                        ...userAddress,
                        pincode: e.target.value,
                      });
                    }}
                    className="p-2 w-[48%] rounded-md outline-none "
                    type="tel"
                    placeholder="pincode"
                  />
                </div>
              </div>
            </div>

            {/* buttons div  */}
            <div className="w-full flex justify-evenly items-center mt-8 p-4 flex-wrap gap-4">
              <button
                className="font-bold px-6 py-2 bg-green-500 rounded-full hover:bg-green-700 hover:text-white"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
