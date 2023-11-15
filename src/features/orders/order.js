import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { fetchSingleOrderAsync, selectSingleOrder } from "./orderSlice";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Order = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleOrder = useSelector(selectSingleOrder);

  useEffect(() => {
    dispatch(fetchSingleOrderAsync(id));
  }, [dispatch, id]);

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4">
        {singleOrder && (
          <div className="bg-white shadow-md rounded-md p-4">
            <h1 className="text-2xl font-semibold mb-4">Order Details</h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div className="mb-4 md:mr-4">
                <p className="font-semibold">Total Amount:</p>
                <p>{singleOrder.totalAmount}</p>
              </div>

              <div className="mb-4 md:mr-4">
                <p className="font-semibold">Payment Method:</p>
                <p>{singleOrder.paymentMethod}</p>
              </div>

              <div className="mb-4 md:mr-4">
                <p className="font-semibold">Status:</p>
                <p>{singleOrder.status}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {singleOrder.items &&
                singleOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-md shadow-md"
                  >
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="mb-2"
                    />
                    <p className="font-semibold">
                      <strong>title : </strong>
                      {item.product.title}
                    </p>
                    <p>
                      <strong>price : </strong>
                      {item.product.price}
                    </p>
                    <p>
                      <strong>quantity : </strong>
                      {item.quantity}
                    </p>
                  </div>
                ))}
            </div>

            <div className="border flex flex-col sm:flex-row justify-between border-gray-300 p-4 rounded-md shadow-sm">
              <div className="mb-4 sm:mb-0">
                <p className="font-semibold">Shipping Address:</p>
                <p>
                  <strong>Name:</strong> {singleOrder.selectAddress?.name}
                </p>
                <p>
                  <strong>Email:</strong> {singleOrder.selectAddress?.email}
                </p>
                <p>
                  <strong>Street:</strong> {singleOrder.selectAddress?.street}
                </p>
                <p>
                  <strong>City:</strong> {singleOrder.selectAddress?.city}
                </p>
                <p>
                  <strong>Postal:</strong> {singleOrder.selectAddress?.postal}
                </p>
                {singleOrder.selectAddress?.phone && (
                  <p>
                    <strong>Phone:</strong> {singleOrder?.selectAddress?.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Order;
