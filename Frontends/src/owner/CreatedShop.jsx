import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
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
    address: city?.address_line2 || "",
    description: "",
    category: ""
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
      formData.append("description", addShop.description);
      formData.append("category", addShop.category);
      if (addShop.image) {
        formData.append("image", addShop.image);
      }
      const response = await instance.post("/shop/create", formData, {
        withCredentials: true,
      });
      navigate("/dashboard");
      setAddShop({
        shopName: "",
        image: "",
        description: "",
        category: ""
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
    <div className="min-h-screen w-full flex flex-col py-6 px-2 sm:px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto w-full">
        <Link
          className="inline-flex items-center text-xl md:text-2xl text-gray-600 hover:text-orange-500 transition mb-2"
          to="/dashboard"
          aria-label="Back to Home"
        >
          <GoArrowLeft />
        </Link>
        <section className="bg-white shadow-md rounded-lg p-5 sm:p-8 flex flex-col items-center justify-center mt-4 w-full">
          <img
            className="w-20 h-20 rounded-full object-cover border-2 border-orange-300"
            src="https://imgs.search.brave.com/2OHB7N8AOSzt7IXX88RuaoICC_Hycx_bpIgBH0lZw00/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Z3JhZGllbnQtc2hv/cC1sb2NhbC1sb2dv/LWRlc2lnbl8yMy0y/MTQ5NjEzMTYwLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
            alt="Shop Logo"
          />
          <h1 className="text-xl md:text-2xl font-bold capitalize mt-4 text-gray-900 tracking-tight">
            Add Shop
          </h1>
          <form className="w-full mt-6" onSubmit={submitHandler} autoComplete="off">
            {/* Shop Name */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="shopName"
                className="font-medium text-gray-700 capitalize mb-1"
              >
                Shop Name
              </label>
              <input
                id="shopName"
                className={`border px-3 py-2 rounded-lg outline-none text-gray-700 font-medium transition focus:ring-2 focus:ring-orange-200 border-gray-300 mt-1 ${err.shopName ? 'border-red-400' : ''}`}
                type="text"
                placeholder="Enter your shop name..."
                value={addShop.shopName}
                onChange={(e) =>
                  setAddShop({ ...addShop, shopName: e.target.value })
                }
                required
                autoFocus
              />
              {err.shopName && (
                <p className="text-red-600 text-xs mt-1 font-medium">{err.shopName}</p>
              )}
            </div>
            {/* Shop Image */}
            <div className="flex flex-col mb-4">
              <label
                htmlFor="shopImage"
                className="font-medium text-gray-700 capitalize mb-1"
              >
                Shop Image
              </label>
              <input
                id="shopImage"
                className="text-gray-700 border px-3 py-2 rounded-lg outline-none border-gray-300 font-medium mt-1 file:mr-3 file:border-none file:py-2 file:px-4 file:rounded file:bg-orange-50 file:text-orange-700 file:font-semibold hover:file:bg-orange-100 transition"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            {imagePreview && (
              <div className="w-full h-44 border mt-4 border-orange-400 rounded overflow-hidden flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Shop Preview"
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
              </div>
            )}

            <div className="flex flex-col mb-4">
              <label
                htmlFor="category"
                className="font-medium text-gray-700 capitalize mb-1"
              >
                category
              </label>
              <select
                className={`border px-3 py-2 rounded-lg outline-none text-gray-700 font-medium transition focus:ring-2 focus:ring-orange-200 border-gray-300 mt-1 ${err.category ? 'border-red-400' : ''}`}
                required
                value={addShop.category}
                onChange={(e) =>
                  setAddShop({ ...addShop, category: e.target.value })
                }
              >
                <option value="">Select category</option>
                <option value="North Indian">North Indian</option>
                <option value="South Indian">South Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Street Food">Street Food</option>
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Biryani">Biryani</option>
                <option value="Cafe">Cafe</option>
                <option value="Bakery">Bakery</option>
                <option value="Desserts">Desserts</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Non Veg">Non Veg</option>
                <option value="Multi Cuisine">Multi Cuisine</option>
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="description"
                className="font-medium text-gray-700 capitalize mb-1"
              >
                description
              </label>
              <textarea
                id="shopName"
                className={`border px-3 resize-none  py-2 rounded-lg outline-none text-gray-700 font-medium transition focus:ring-2 focus:ring-orange-200 border-gray-300 mt-1 ${err.shopName ? 'border-red-400' : ''}`}
                type="text"
                rows={5}
                placeholder="Enter your description..."
                value={addShop.description}
                onChange={(e) =>
                  setAddShop({ ...addShop, description: e.target.value })
                }
                required
                autoFocus
              />
              {err.description && (
                <p className="text-red-600 text-xs mt-1 font-medium">{err.description}</p>
              )}
            </div>
            
            {/* City and State */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 mt-5">
              <div className="flex flex-col flex-1">
                <label
                  htmlFor="shopCity"
                  className="font-medium text-gray-700 capitalize mb-1"
                >
                  City
                </label>
                <input
                  id="shopCity"
                  className={`border px-3 py-2 rounded-lg outline-none text-gray-700 font-medium transition focus:ring-2 focus:ring-orange-200 border-gray-300 mt-1 ${err.city ? 'border-red-400' : ''}`}
                  type="text"
                  placeholder="Enter your shop city"
                  value={addShop.city}
                  onChange={(e) =>
                    setAddShop({ ...addShop, city: e.target.value })
                  }
                  required
                />
                {err.city && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{err.city}</p>
                )}
              </div>
              <div className="flex flex-col flex-1">
                <label
                  htmlFor="shopState"
                  className="font-medium text-gray-700 capitalize mb-1"
                >
                  State
                </label>
                <input
                  id="shopState"
                  className={`border px-3 py-2 rounded-lg outline-none text-gray-700 font-medium transition focus:ring-2 focus:ring-orange-200 border-gray-300 mt-1 ${err.state ? 'border-red-400' : ''}`}
                  type="text"
                  placeholder="Enter your shop state"
                  value={addShop.state}
                  onChange={(e) =>
                    setAddShop({ ...addShop, state: e.target.value })
                  }
                  required
                />
                {err.state && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{err.state}</p>
                )}
              </div>
            </div>
            {/* Address */}
            <div className="flex flex-col mt-5">
              <label
                htmlFor="shopAddress"
                className="font-medium text-gray-700 capitalize mb-1"
              >
                Address
              </label>
              <input
                id="shopAddress"
                className={`border px-3 py-2 rounded-lg outline-none text-gray-700 font-medium transition focus:ring-2 focus:ring-orange-200 border-gray-300 mt-1 ${err.address ? 'border-red-400' : ''}`}
                type="text"
                placeholder="Enter your shop address"
                value={addShop.address}
                onChange={(e) =>
                  setAddShop({ ...addShop, address: e.target.value })
                }
                required
              />
              {err.address && (
                <p className="text-red-600 text-xs mt-1 font-medium">{err.address}</p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 transition flex items-center justify-center w-full mt-7 py-3 rounded-lg text-white font-bold text-base shadow focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-4 border-white border-b-transparent rounded-full animate-spin" />
              ) : (
                "Create Shop"
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CreatedShop;
