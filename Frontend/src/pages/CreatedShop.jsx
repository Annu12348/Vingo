import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { MdRestaurant } from "react-icons/md";
import { useSelector } from "react-redux";
import instance from "../utils/axios";
import { toast } from "react-toastify";

const CreatedShop = () => {
  const { city } = useSelector((store) => store.Auth);
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [addShop, setAddShop] = useState({
    shopName: "",
    image: "",
    city: city?.city || "",
    state: city?.state || "",
    address: city?.address_line1 || "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAddShop({ ...addShop, image: file });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const shopCreatedApi = async () => {
    try {
      setLoading(true);
      setErr({});
      const formData = new FormData();
      formData.append("shopName", addShop.shopName);
      formData.append("city", addShop.city);
      formData.append("state", addShop.state);
      formData.append("address", addShop.address);
      if (addShop.image) {
        formData.append("image", addShop.image);
      }
      const response = await instance.post("/shop/create", formData, {
        withCredentials: true,
      });
      navigate("/");
      setAddShop({
        shopName: "",
        image: "",
      });
      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const fieldsError = {};
        const err = error.response.data.errors;
        err.forEach((e) => {
          fieldsError[e.path] = e.msg;
        });
        setErr(fieldsError);
      } else if (
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
    shopCreatedApi();
  };
  return (
    <div className="w-full py-3 px-4 min-h-screen  ">
      <Link className="text-2xl  text-zinc-500" to="/">
        <GoArrowLeft />
      </Link>
      <div className="w-full p-2 mt-5 flex items-center justify-center">
        <div className="shadow md:w-[35%] p-3 rounded bg-zinc-100 flex items-center justify-center flex-col ">
          <img
            className="w-15 h-15 rounded-full object-cover "
            src="https://imgs.search.brave.com/2OHB7N8AOSzt7IXX88RuaoICC_Hycx_bpIgBH0lZw00/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Z3JhZGllbnQtc2hv/cC1sb2NhbC1sb2dv/LWRlc2lnbl8yMy0y/MTQ5NjEzMTYwLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
            alt="images show"
          />
          <h1 className="text-xl font-bold capitalize mt-2 ">add shop</h1>
          <form className="w-full mt-2" onSubmit={submitHandler}>
            <div className="flex flex-col  ">
              <label className="font-semibold capitalize tracking-tight ">
                name
              </label>
              <input
                className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300  font-semibold mt-1"
                type="text"
                placeholder="enter your shop name"
                value={addShop.shopName}
                onChange={(e) =>
                  setAddShop({ ...addShop, shopName: e.target.value })
                }
                required
              />
              {err.shopName && (
                <p className="text-red-600 text-[8px] tracking-tight leading-none  font-semibold ">
                  {err.shopName}
                </p>
              )}
            </div>
            <div className="flex flex-col mt-3  ">
              <label className="font-semibold capitalize tracking-tight ">
                shop image
              </label>
              <input
                className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300 capitalize font-semibold mt-1"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
            <div className="flex md:gap-6 gap-4 mt-3">
              <div className="flex flex-col  w-[48%]  ">
                <label className="font-semibold capitalize tracking-tight ">
                  city
                </label>
                <input
                  className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300 capitalize font-semibold mt-1"
                  type="text"
                  placeholder="enter your shop city"
                  value={addShop.city}
                  onChange={(e) =>
                    setAddShop({ ...addShop, city: e.target.value })
                  }
                  required
                />
                {err.city && (
                  <p className="text-red-600 text-[9px] tracking-tight leading-none  font-semibold ">
                    {err.city}
                  </p>
                )}
              </div>
              <div className="flex flex-col  w-[47%]   ">
                <label className="font-semibold capitalize tracking-tight ">
                  state
                </label>
                <input
                  className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300 capitalize font-semibold mt-1 "
                  type="text"
                  placeholder="enter your shop state"
                  value={addShop.state}
                  onChange={(e) =>
                    setAddShop({ ...addShop, state: e.target.value })
                  }
                  required
                />
                {err.state && (
                  <p className="text-red-600 text-[8px] tracking-tight leading-none  font-semibold ">
                    {err.state}
                  </p>
                )}
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
                value={addShop.address}
                onChange={(e) =>
                  setAddShop({ ...addShop, address: e.target.value })
                }
                required
              />
              {err.address && (
                <p className="text-red-600 text-[8px] tracking-tight leading-none  font-semibold ">
                  {err.address}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[rgb(240,107,41)] flex items-center justify-center capitalize w-full mt-5 py-2.5 rounded-lg text-white font-semibold "
            >
              {loading ? (
                <div className="flex items-center gap-1.5">
                  <h1>please wait...</h1>
                  <div className="w-6 h-6 animate-spin border-b-3  rounded-full "></div>
                </div>
              ) : (
                "created shop"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatedShop;
