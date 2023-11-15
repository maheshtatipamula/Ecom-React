import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchLoggedInUserOrdersAsync,
  selectFetchOrderError,
  selectOrdersInfo,
  selectUserInfo,
} from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { Link } from "react-router-dom";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrdersInfo);
  const ordersError = useSelector(selectFetchOrderError);
  if (ordersError) {
    toast.error(ordersError);
  }

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, []);

  return (
    <div>
      {orders &&
        orders
          .slice()
          .reverse()
          .map((order) => (
            <div
              key={order._id}
              className="mx-5 md:mx-auto  mb-2  rounded-lg shadow-md bg-white max-w-7xl px-4 sm:px-6 lg:px-8 py-4"
            >
              <h1> Order Number Is{order._id}</h1>
              <p className="text-red-500 p-1 mb-5">
                Order Status : {order.status}
              </p>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    <li key={order.items._id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={order.items[0].product.thumbnail}
                          alt={order.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={order.href}>{order.title}</a>
                            </h3>
                            <p className="ml-4">{order.totalAmount}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {order.color}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2  text-base font-medium text-gray-900">
                  <p>total items in orders</p>
                  <p>{order.totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
              <div
                key={order.id}
                className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
              >
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.selectAddress.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectAddress.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectAddress.pinCode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {order.selectAddress.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {order.selectAddress.city}
                  </p>
                </div>
              </div>
              <Link
                className="inline-block my-6 px-4 py-2 w-full text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                to={`/single-order/${order._id}`}
              >
                View Order
              </Link>
            </div>
          ))}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
