import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../../Navbar/Navbar";
import {
  deleteAddressAsync,
  fetchLoggedInUserAsync,
  fetchLoggedInUserOrdersAsync,
  selectFetchOrderError,
  selectOrdersInfo,
  selectUserInfo,
} from "../userSlice";
import AddAddress from "./AddAddress";
import { Link } from "react-router-dom";
import { selectDelCartErrors } from "../../cart/CartSlice";

export default function UserProfile() {
  const ordersError = useSelector(selectFetchOrderError);

  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();
  if (ordersError) {
    toast.error(ordersError);
  }

  const handleAddress = () => {
    setIsClicked(!isClicked);
  };
  const user = useSelector(selectUserInfo);
  const errors = useSelector(selectDelCartErrors);
  const [refresh, setRefresh] = useState(false);

  const orders = useSelector(selectOrdersInfo);
  let twoOrders;
  if (orders) {
    twoOrders = orders.slice(-2).reverse();
  }

  const handleDelete = async (address) => {
    dispatch(deleteAddressAsync(address.id));
    dispatch(fetchLoggedInUserAsync());
    setRefresh(!refresh);
  };
  const setProps = () => {
    setIsClicked(false);
  };
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
    dispatch(fetchLoggedInUserAsync());
  }, [dispatch, refresh]);
  return (
    <>
      <Navbar />

      <div className="mx-auto w-5/5">
        <div className="bg-gray-100 min-h-screen p-6">
          <div className="bg-white mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-lg shadow p-4">
            <h1 className="text-2xl font-semibold text-center">My Profile</h1>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Addresses</h2>
              {user?.addresses.map((address, index) => (
                <div
                  key={index}
                  className="mt-2 border flex flex-col sm:flex-row justify-between border-gray-300 p-4 rounded-md shadow-sm"
                >
                  <div className="mb-4 sm:mb-0">
                    <div>
                      <p>
                        <strong>Name:</strong> {address.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {address.email}
                      </p>{" "}
                      <p>
                        <strong>Street:</strong> {address.street}
                      </p>{" "}
                      <p>
                        <strong>City:</strong> {address.city}
                      </p>{" "}
                      <p>
                        <strong>Postal:</strong> {address.postal}
                      </p>
                      {address.phone && (
                        <p>
                          <strong>Phone:</strong> {address.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-x-2 sm:space-y-0 sm:flex gap-2">
                    <div className="flex gap-2">
                      <p onClick={() => handleDelete(address)}>
                        <AiOutlineDelete />
                      </p>
                    </div>
                  </div>
                </div>
              ))}{" "}
              <button
                href="/orders"
                className={`block mt-6 p-2 h-35 w-[180px] bg-blue-500 text-white text-center rounded-lg hover-bg-blue-600 transition duration-300`}
                onClick={handleAddress}
              >
                {isClicked ? "Back" : "Add New Address"}
              </button>
              {isClicked && <AddAddress setProps={setProps} />}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Previous Orders</h2>
              <div className="mt-2">
                {twoOrders &&
                  twoOrders.map((order, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 p-4 rounded-md shadow-sm mb-2"
                    >
                      <p>
                        <strong>Order ID:</strong> {order._id}
                      </p>

                      <p>
                        <strong>Payment Method : </strong>
                        {order.paymentMethod}
                      </p>
                      <p>
                        <strong>TotalAmount : </strong>
                        {order.totalAmount}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <Link
              to="/orders"
              className="block mt-6 p-2 h-35 w-[180px] bg-blue-500 text-white text-center rounded-lg hover-bg-blue-600 transition duration-300"
            >
              View All Orders
            </Link>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}
