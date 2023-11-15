import React, { Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  deleteItemsCartAsync,
  selectCartItems,
  selectDelCartErrors,
  selectFetchCartErrors,
  selectUpdateCartErrors,
  updateCartAsync,
} from "./CartSlice";

export default function Cart() {
  const updateCartErrors = useSelector(selectUpdateCartErrors);
  const deleteCartErrors = useSelector(selectDelCartErrors);
  const fecthCartErr = useSelector(selectFetchCartErrors);

  const items = useSelector(selectCartItems);

  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const totalAmount = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
    if (updateCartErrors) {
      toast.error(updateCartErrors);
    }
  };

  const removeItem = (e, id) => {
    dispatch(deleteItemsCartAsync(id));

    if (deleteCartErrors) {
      toast.error(deleteCartErrors);
    }
  };

  if (fecthCartErr) {
    toast.error(fecthCartErr);
  }
  return (
    <>
      <div>
        {items.length === 0 ? (
          <div className="text-center mt-8">
            <h1 className="text-2xl font-semibold">Your cart is empty</h1>
            <p className="mt-2 text-gray-500">
              Add some items to your cart and start shopping!
            </p>
            <Link to="/" className="text-indigo-600 hover:text-indigo-500 mt-4">
              Continue Shopping
            </Link>
          </div>
        ) : (
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
                              <option value="5">5</option>
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
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
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
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
