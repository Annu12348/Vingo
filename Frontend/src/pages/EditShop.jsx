import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setShop } from "../redux/reducer/ShopReducer";
import { toast } from "react-toastify";

const EditShop = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    shopName: "",
    image:  "",
    city:  "",
    state: "",
    address: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  const shopFetchByIdApi = async () => {
    try {
      const response = await instance.get(`/shop/fetchBy-Id/${id}`, {
        withCredentials: true,
      });
      const dataById = response.data.shop;
      console.log(dataById)
      setInput({
        shopName: dataById.shopName,
        city: dataById.city,
        address: dataById.address,
        state: dataById.state,
        image: dataById.image
      })
      setImagePreview(dataById.image)
    } catch (error) {
      toast.error("failed to fetch shop details");
    }
  };

  useEffect(() => {
    shopFetchByIdApi()
  }, [id])

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
      dispatch(setShop(response.data.shop));
      toast.success(response.data.message);
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
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateShopApi();
  };

  return (
    <div className="w-full py-3 px-4 min-h-screen  ">
      <Link className="text-2xl  text-zinc-500" to="/">
        <GoArrowLeft />
      </Link>

      <div className="w-full p-2 mt-5 flex items-center justify-center">
        <div className="shadow md:w-[35%] w-[100%] p-3 rounded bg-zinc-100 flex items-center justify-center flex-col ">
          <img
            className="w-15 h-15 rounded-full object-cover "
            src="https://imgs.search.brave.com/2OHB7N8AOSzt7IXX88RuaoICC_Hycx_bpIgBH0lZw00/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Z3JhZGllbnQtc2hv/cC1sb2NhbC1sb2dv/LWRlc2lnbl8yMy0y/MTQ5NjEzMTYwLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
            alt="images show"
          />
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
                onChange={(e) =>
                  setInput({ ...input, shopName: e.target.value })
                }
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
                <div className="w-5 h-5 border-white border-b-3 border-t-3 animate-spin rounded-full  "></div>
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
