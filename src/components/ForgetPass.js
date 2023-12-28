import React from "react";

function ForgetPass() {
  return (
    <div className="flex justify-center items-center bg-yellow-400 h-full w-full">
      <div className="">
        <h1 class="text-2xl font-semibold mb-4">Forgot Password</h1>
        <form>
          {/* mobile no input */}
          <div class="mb-4">
            <label for="mobileNo" class="block text-gray-600">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autocomplete="off"
              required
            />
          </div>

          {/* button for link  */}
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Get Password Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;
