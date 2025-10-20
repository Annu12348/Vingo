import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdRestaurant } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setShop } from "../redux/reducer/ShopReducer";
import { toast } from "react-toastify";

const EditShop = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { shop } = useSelector((store) => store.Shop);
  const currentShop = shop?.find((item) => item._id === id) || {};

  const [input, setInput] = useState({
    shopName: currentShop.shopName || "",
    image: currentShop.image || "",
    city: currentShop.city || "",
    state: currentShop.state || "",
    address: currentShop.address || "",
  });

  const [imagePreview, setImagePreview] = useState(currentShop.image || "");

  const handleChange = (e) => {
    const file = e.target.files[0];
    setInput({ ...input, image: file });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const updateShopApi = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("shopName", input.shopName);
      formData.append("city", input.city);
      formData.append("state", input.state);
      formData.append("address", input.address);
      if (input.image) {
        formData.append("image", input.image);
      }

      const response = await instance.put(`/shop/update/${id}`, formData, {
        withCredentials: true,
      });
      navigate("/")
      dispatch(setShop(response.data.shop));
      toast.success(response.data.message)
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
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateShopApi();
  };

  return (
    <div className="w-full py-3 px-4 min-h-screen ">
      <Link className="text-2xl  text-zinc-500" to="/">
        <GoArrowLeft />
      </Link>
      <div className="w-full p-2 mt-5">
        <div className="shadow w-[35%] p-3 rounded bg-zinc-100 flex items-center justify-center flex-col ">
          <div className="w-[11vh] rounded-full h-[11vh] shadow bg-amber-50 flex items-center justify-center ">
            <MdRestaurant className="text-5xl text-[rgb(240,107,41)] " />
          </div>
          <h1 className="text-xl font-bold capitalize mt-2 ">Edit shop</h1>
          <form className="w-full mt-2" onSubmit={submitHandler}>
            <div className="flex flex-col  ">
              <label className="font-semibold capitalize tracking-tight ">
                shop name
              </label>
              <input
                className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300 font-semibold mt-1"
                type="text"
                placeholder="Enter Your Name"
                value={input?.shopName}
                onChange={(e) => setInput({ ...input, shopName: e.target.value })}
              />
            </div>
            <div className="flex flex-col mt-3  ">
              <label className="font-semibold capitalize tracking-tight ">
                shop image
              </label>
              <input
                className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300 capitalize font-semibold mt-1"
                type="file"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>

            {imagePreview && (
              <div className="w-full h-[22vh] border mt-4 border-red-500 rounded ">
                <img
                  src={imagePreview}
                  alt="Shop Preview"
                  className="w-full h-full object-cover  rounded"
                />
              </div>
            )}

            <div className="flex gap-6 mt-3">
              <div className="flex flex-col  w-[48%]  ">
                <label className="font-semibold capitalize tracking-tight ">
                  city
                </label>
                <input
                  className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300 capitalize font-semibold mt-1"
                  type="text"
                  placeholder="enter your shop city"
                  required
                  value={input?.city}
                  onChange={(e) => setInput({ ...input, city: e.target.value })}
                />
              </div>
              <div className="flex flex-col  w-[47%]   ">
                <label className="font-semibold capitalize tracking-tight ">
                  state
                </label>
                <input
                  className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300 capitalize font-semibold mt-1"
                  type="text"
                  placeholder="enter your shop state"
                  required
                  value={input?.state}
                  onChange={(e) =>
                    setInput({ ...input, state: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col mt-3 ">
              <label className="font-semibold capitalize tracking-tight ">
                address
              </label>
              <input
                className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300  font-semibold mt-1"
                type="text"
                placeholder="enter your shop address"
                required
                value={input?.address}
                onChange={(e) =>
                  setInput({ ...input, address: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[rgb(240,107,41)] flex items-center justify-center capitalize w-full mt-5 py-2.5 rounded-lg text-white font-semibold "
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-6 h-6 border-t-3 border-b-3 animate-spin rounded-full  "></div>
                  <p>please wait...</p>
                </div>
              ) : (
                "update shop"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditShop;
