import React, { useEffect } from "react";
import instance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { IoRestaurant } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { setShop } from "../redux/reducer/ShopReducer";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.Auth);
  const { shop } = useSelector((store) => store.Shop);
  console.log(user);

  const shopFetchApi = async () => {
    try {
      const response = await instance.get("/shop/fetch", {
        withCredentials: true,
      });
      dispatch(setShop(response.data.shop));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  const shophandleDelete = async (shopId) => {
    try {
      const response = await instance.delete(`/shop/delete/${shopId}`, {
        withCredentials: true,
      });
      dispatch(shop(shop.filter((i) => i._id !== shopId)));
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  useEffect(() => {
    shopFetchApi();
  }, [shop]);

  return (
    <div className="w-full  md:px-5 px-3 pb-6 md:mt-15.5 mt-19 min-h-[30vh] flex items-start justify-center ">
      {user.role === "owner" && shop.length <= 0 && (
        <div className="md:w-[24%] w-full shadow bg-zinc-100 p-3 flex-col flex items-center justify-center rounded ">
          <div className="w-[13vh] rounded-full h-[13vh] bg-zinc-300 overflow-hidden ">
            <img
              className="w-full h-full object-cover rounded-full"
              src="https://imgs.search.brave.com/2OHB7N8AOSzt7IXX88RuaoICC_Hycx_bpIgBH0lZw00/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Z3JhZGllbnQtc2hv/cC1sb2NhbC1sb2dv/LWRlc2lnbl8yMy0y/MTQ5NjEzMTYwLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
            />
          </div>
          <h1 className="text-xl font-bold  mt-3 capitalize tracking-tight leading-none">
            add your restaurant
          </h1>
          <p className="text-sm font-sans leading-5 mt-3.5 text-center  ">
            join our food delivery platform and reach at thousands of hungry
            customers every day.
          </p>
          <Link
            to={user && user.role === "owner" ? "/shop-create" : "/login"}
            className="bg-[rgb(240,107,41)] px-5 cursor-pointer rounded-full font-semibold text-white capitalize mt-3 py-2 "
          >
            add shops
          </Link>
        </div>
      )}
      {shop.length > 0 && (
        <div className="w-full   ">
          <div className=" flex items-center justify-center gap-3 text-3xl">
            <img
              className="w-12 h-12 rounded-full object-cover "
              src="https://imgs.search.brave.com/2OHB7N8AOSzt7IXX88RuaoICC_Hycx_bpIgBH0lZw00/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Z3JhZGllbnQtc2hv/cC1sb2NhbC1sb2dv/LWRlc2lnbl8yMy0y/MTQ5NjEzMTYwLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
              alt="images show"
            />
            <h1 className="text-xl leading-none tracking-tight font-semibold capitaliz">
              Welcome to Shops
            </h1>
          </div>
          <div className="w-full  mt-4 flex gap-4 flex-wrap items-center justify-center">
            {shop.map((shop) => (
              <div
                key={shop._id}
                className="pb-5  hover:shadow-lg md:w-[28%] w-full bg-white  rounded-lg"
              >
                <div className="w-full  relative h-[31vh] rounded-t-lg bg-amber-100 group overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    src={shop.image}
                    alt="shop images"
                  />
                  <Link
                    to={`/shop-edit/${shop._id}`}
                    className="text-xl absolute top-[4%] md:right-[13%] right-[16%] text-[rgb(240,107,41)] bg-white hover:bg-zinc-200 p-2 rounded-full "
                  >
                    <FaPen />
                  </Link>
                  <button
                    onClick={() => shophandleDelete(shop._id)}
                    className="text-xl  absolute top-[4%] right-[3%] text-[rgb(240,107,41)] bg-white hover:bg-zinc-200 p-2 rounded-full "
                  >
                    <MdDelete />
                  </button>
                </div>
                <h1 className="text-md capitalize  mt-4 ml-2 leading-none  font-bold ">
                  {shop.shopName}
                </h1>
                <h1 className="text-sm  ml-2 leading-none mt-3 font-semibold   text-zinc-600">
                  {shop.city}, {shop.state}
                </h1>
                <h1 className="text-sm  ml-2 leading-none mt-3 font-semibold   text-zinc-600">
                  {shop.address}
                </h1>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
