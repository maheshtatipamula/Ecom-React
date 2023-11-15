import React from "react";
import Wishlist from "../features/user/components/Wishlist";
import Navbar from "../features/Navbar/Navbar";

const WishlistPage = () => {
  return (
    <>
      <Navbar>
        <Wishlist />
      </Navbar>
    </>
  );
};

export default WishlistPage;
