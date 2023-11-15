import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../features/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import {
  deleteItemsCartAsync,
  selectCartItems,
  updateCartAsync,
} from "../features/cart/CartSlice";
import { useForm } from "react-hook-form";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/orders/orderSlice";
import {
  fetchLoggedInUserAsync,
  selectUserInfo,
  updateUserAsync,
} from "../features/user/userSlice";
import AddAddress from "../features/user/components/AddAddress";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const [selectAddress, setSelectedAdress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isClicked, setIsClicked] = useState(false);

  const handleClickAddress = () => {
    setIsClicked(!isClicked);
  };
  const orderPlaced = useSelector(selectCurrentOrder);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const items = useSelector(selectCartItems);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const totalAmount = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleQuantity = async (e, product) => {
    dispatch(updateCartAsync({ ...product, quantity: +e.target.value }));
  };

  const removeItem = (e, id) => {
    console.log(id);
    dispatch(deleteItemsCartAsync(id));
    reset();
  };
  const user = useSelector(selectUserInfo);

  const handleAddress = (e) => {
    setSelectedAdress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const setProps = () => {
    setIsClicked(false);
  };

  const handleOrder = (e) => {
    if (paymentMethod && selectAddress) {
      const order = {
        items,
        totalAmount,
        totalItems,
        user,
        paymentMethod,
        selectAddress,
        status: "pending",
      };
      dispatch(createOrderAsync(order));
    } else {
      toast.error("select payment and address");
    }
  };

  return (
    <>
      {!items.length >= 1 && <Navigate to="/" replace={true} />}
      {orderPlaced && (
        <Navigate to={`/order-success/${orderPlaced._id} `} replace={true} />
      )}
      <Navbar>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="border-b border-gray-900/10 pb-12 bg-white p-5">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Addresses
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from Existing addresses
                </p>
                <ul>
                  {user?.addresses.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 mb-2 rounded-md shadow-black px-5 py-5 border-solid border-2 border-gray-200"
                    >
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={index}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {address.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-500">
                          {address.city}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className={`block mt-6 p-2 h-35 w-[180px] bg-blue-500 text-white text-center rounded-lg hover-bg-blue-600 transition duration-300`}
                  onClick={handleClickAddress}
                >
                  {isClicked ? "Back" : "Add New Address"}
                </button>

                {isClicked && <AddAddress setProps={setProps} />}

                <div className="mt-10 space-y-10 bg-white p-5">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose One
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          onChange={handlePayment}
                          value="cash"
                          type="radio"
                          checked={paymentMethod === "cash"}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          onChange={handlePayment}
                          name="payments"
                          checked={paymentMethod === "card"}
                          value="card"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="mx-auto   bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl my-4 pt-5 font-bold tracking-tight text-gray-900">
                  Cart
                </h2>
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.product.href}>
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">{item.product.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                </label>
                                <select
                                  value={item.quantity}
                                  onChange={(e) => handleQuantity(e, item)}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={(e) => removeItem(e, item._id)}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2  text-base font-medium text-gray-900">
                    <p>total items in cart</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Order now
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </Navbar>
      )}
    </>
  );
};

export default Checkout;
