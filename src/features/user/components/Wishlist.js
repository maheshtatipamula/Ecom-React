import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  addToWishlistAsync,
  fetchWishlistAsync,
  selectAddWishError,
  selectFetchWishError,
  selectWishlistInfo,
} from "../userSlice";

const Wishlist = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(selectWishlistInfo);
  const fetchError = useSelector(selectFetchWishError);
  if (fetchError) {
    toast.error(fetchError);
  }

  const removeItem = async (e, id) => {
    // Add your logic to remove item
    try {
      const response = await dispatch(addToWishlistAsync(id));

      if (response.payload.message === "added") {
        dispatch(fetchWishlistAsync());
        toast.success("Item added to wishlist successfully!");
      } else if (response.payload.message === "removed") {
        dispatch(fetchWishlistAsync());
        toast.success("Item removed from wishlist!");
      } else {
        toast.error("something went wrong try again ");
      }
    } catch (error) {
      toast.error("Failed to update wishlist!");
    }
  };

  useEffect(() => {
    dispatch(fetchWishlistAsync());
  }, []);
  if (items.length === 0) {
    return (
      <div className="text-center mt-8">
        <h1 className="text-2xl font-semibold">Your wishlist is empty</h1>
        <p className="mt-2 text-gray-500">
          Add some items to your wishlist and start shopping!
        </p>
        <Link to="/" className="text-indigo-600 hover:text-indigo-500 mt-4">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto h-auto p-4 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl my-4 pt-5 font-bold tracking-tight text-gray-900">
          Wishlist
        </h2>

        <div className="mt-8">
          <div className="flow-root">
            <ul
              role="list"
              className="-my-6 divide-y h-full pb-8 divide-gray-200"
            >
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex py-6 mb-3 bg-white-200 p-5 rounded-md  shadow-md"
                >
                  <Link
                    to={`/product-details/${item.id}`}
                    key={item.id}
                    className="flex"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden  rounded-md border border-gray-200">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-500">Price: ${item.price}</p>
                      <p className="text-gray-500">Rating: {item.rating}</p>
                    </div>
                  </Link>
                  <div className="flex ml-auto items-center">
                    <button
                      type="button"
                      onClick={(e) => removeItem(e, item.id)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link
          to="/"
          className="block my-6 p-2 h-35 w-[180px] bg-blue-500 text-white text-center rounded-lg hover-bg-blue-600 transition duration-300"
        >
          go back
        </Link>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Wishlist;
