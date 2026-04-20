import React, { useCallback, useMemo, useRef, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import instance from "../utils/axios";
import { toast } from "react-toastify";

// Shop categories for select dropdown - memoized for performance
const SHOP_CATEGORIES = [
  "North Indian", "South Indian", "Chinese", "Fast Food", "Street Food",
  "Pizza", "Burger", "Biryani", "Cafe", "Bakery", "Desserts", "Pure Veg",
  "Non Veg", "Multi Cuisine"
];

const initialFormState = (city = {}) => ({
  shopName: "",
  image: "",
  city: city?.city || "",
  state: city?.state || "",
  address: city?.address_line2 || "",
  description: "",
  category: ""
});

const CreatedShop = () => {
  const { city } = useSelector((store) => store.Auth);
  const [addShop, setAddShop] = useState(() => initialFormState(city));
  const [imagePreview, setImagePreview] = useState(null);
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  // To avoid unnecessary re-creations
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setAddShop((prev) => ({ ...prev, [name]: value }));
    setErr((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      setAddShop(prev => ({ ...prev, image: file }));
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      } else {
        setImagePreview(null);
      }
    },
    []
  );

  const resetForm = useCallback(() => {
    setAddShop(initialFormState(city));
    setImagePreview(null);
    fileInputRef.current && (fileInputRef.current.value = "");
  }, [city]);

  const shopCreatedApi = useCallback(async () => {
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
      toast.success(response.data.message || "Shop created successfully!");
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.data?.errors) {
        // Field-level errors
        const fieldsError = {};
        for (const e of error.response.data.errors) {
          fieldsError[e.path] = e.msg;
        }
        setErr(fieldsError);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  }, [addShop, navigate, resetForm]);

  const submitHandler = useCallback((e) => {
    e.preventDefault();
    shopCreatedApi();
  }, [shopCreatedApi]);

  // Dynamic background & Glassmorphism for attractive UI
  return (
    <div className="min-h-screen w-full flex flex-col py-4 px-2 sm:px-4 ">
      <Link
          className="inline-flex  items-center gap-2 text-lg md:text-xl text-gray-500 hover:text-orange-500 transition-colors mb-4 font-medium"
          to="/dashboard"
          aria-label="Back to Dashboard"
        >
          <GoArrowLeft />
          <span>Dashboard</span>
        </Link>
      <div className="max-w-3xl mx-auto w-full">
        <section className="relative bg-white/80 backdrop-blur-2xl shadow-2xl rounded-xl p-8 sm:p-12 flex flex-col items-center justify-center mt-6 w-full border border-orange-200">
          {/* Decorative Gradient Circle */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-tr from-orange-300/40 via-amber-100/10 to-transparent rounded-full z-0 pointer-events-none" aria-hidden="true" />
          <img
            className="w-28 h-28 rounded-full object-cover border-4 border-orange-300 shadow-lg bg-white relative z-10"
            src={
              imagePreview ||
              "https://imgs.search.brave.com/2OHB7N8AOSzt7IXX88RuaoICC_Hycx_bpIgBH0lZw00/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Z3JhZGllbnQtc2hv/cC1sb2NhbC1sb2dv/LWRlc2lnbl8yMy0y/MTQ5NjEzMTYwLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA"
            }
            alt="Shop Logo"
            loading="lazy"
          />
          <h1 className="text-2xl md:text-3xl font-bold capitalize mt-6 text-gray-800 tracking-tight relative z-10 bg-gradient-to-tr from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Add Shop
          </h1>
          <form
            className="w-full mt-8 space-y-6 relative z-10"
            onSubmit={submitHandler}
            autoComplete="off"
            noValidate
          >

            {/* Shop Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="shopName"
                className="font-semibold text-gray-800 capitalize tracking-wide"
              >
                Shop Name
              </label>
              <input
                id="shopName"
                name="shopName"
                className={`border px-4 py-2 rounded-lg outline-none transition text-gray-800 font-medium bg-white/90 focus:ring-2 focus:ring-orange-300 border-gray-300 ${err.shopName ? 'border-red-400 focus:ring-red-200' : ''}`}
                type="text"
                placeholder="Enter your shop name..."
                value={addShop.shopName}
                onChange={handleInputChange}
                required
                autoFocus
                maxLength={60}
                aria-invalid={!!err.shopName}
                aria-describedby={err.shopName ? "shopName-error" : undefined}
              />
              {err.shopName && (
                <span id="shopName-error" className="text-red-600 text-xs">{err.shopName}</span>
              )}
            </div>
            {/* Shop Image */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="shopImage"
                className="font-semibold text-gray-800 capitalize tracking-wide"
              >
                Shop Image
              </label>
              <input
                id="shopImage"
                name="image"
                ref={fileInputRef}
                className="text-gray-700 border px-4 py-2 rounded-lg outline-none border-gray-300 font-medium bg-white/70 file:mr-3 file:border-none file:py-2 file:px-4 file:rounded file:bg-orange-50 file:text-orange-700 file:font-semibold hover:file:bg-orange-100 transition-all"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                aria-label="Upload Shop Image"
              />
            </div>
            {imagePreview && (
              <div className="w-full  mx-auto h-68 border-4 mt-4 border-amber-300 rounded-xl overflow-hidden flex items-center justify-center bg-orange-50 shadow-inner">
                <img
                  src={imagePreview}
                  alt="Shop Preview"
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="font-semibold text-gray-800 capitalize tracking-wide">
                Category
              </label>
              <select
                id="category"
                name="category"
                className={`border px-4 py-2 rounded-lg outline-none bg-white/90 text-gray-700 transition font-medium focus:ring-2 focus:ring-orange-300 border-gray-300 ${err.category ? 'border-red-400 focus:ring-red-200' : ''}`}
                required
                value={addShop.category}
                onChange={handleInputChange}
                aria-invalid={!!err.category}
                aria-describedby={err.category ? "category-error" : undefined}
              >
                <option value="">Select Category</option>
                {SHOP_CATEGORIES.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {err.category && (
                <span id="category-error" className="text-red-600 text-xs">{err.category}</span>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="font-semibold text-gray-800 capitalize tracking-wide">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className={`border px-4 py-2 resize-none rounded-lg outline-none text-gray-800 font-medium bg-white/90 transition focus:ring-2 focus:ring-orange-300 border-gray-300 ${err.description ? 'border-red-400 focus:ring-red-200' : ''}`}
                rows={4}
                placeholder="Enter a short description for your shop..."
                value={addShop.description}
                onChange={handleInputChange}
                required
                maxLength={300}
                aria-invalid={!!err.description}
                aria-describedby={err.description ? "description-error" : undefined}
              />
              <div className="flex items-center justify-between text-xs">
                {err.description && (
                  <span id="description-error" className="text-red-600">{err.description}</span>
                )}
                <span className="text-gray-400 ml-auto">
                  {addShop.description.length}/300
                </span>
              </div>
            </div>

            {/* City and State Row */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
              <div className="flex flex-col flex-1 gap-1">
                <label
                  htmlFor="shopCity"
                  className="font-semibold text-gray-800 capitalize tracking-wide"
                >
                  City
                </label>
                <input
                  id="shopCity"
                  name="city"
                  className={`border px-4 py-2 rounded-lg outline-none text-gray-800 font-medium bg-white/90 transition focus:ring-2 focus:ring-orange-300 border-gray-300 ${err.city ? 'border-red-400 focus:ring-red-200' : ''}`}
                  type="text"
                  placeholder="Enter your shop city"
                  value={addShop.city}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!err.city}
                  aria-describedby={err.city ? "shopCity-error" : undefined}
                />
                {err.city && (
                  <span id="shopCity-error" className="text-red-600 text-xs">{err.city}</span>
                )}
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <label
                  htmlFor="shopState"
                  className="font-semibold text-gray-800 capitalize tracking-wide"
                >
                  State
                </label>
                <input
                  id="shopState"
                  name="state"
                  className={`border px-4 py-2 rounded-lg outline-none text-gray-800 font-medium bg-white/90 transition focus:ring-2 focus:ring-orange-300 border-gray-300 ${err.state ? 'border-red-400 focus:ring-red-200' : ''}`}
                  type="text"
                  placeholder="Enter your shop state"
                  value={addShop.state}
                  onChange={handleInputChange}
                  required
                  aria-invalid={!!err.state}
                  aria-describedby={err.state ? "shopState-error" : undefined}
                />
                {err.state && (
                  <span id="shopState-error" className="text-red-600 text-xs">{err.state}</span>
                )}
              </div>
            </div>
            {/* Address */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="shopAddress"
                className="font-semibold text-gray-800 capitalize tracking-wide"
              >
                Address
              </label>
              <input
                id="shopAddress"
                name="address"
                className={`border px-4 py-2 rounded-lg outline-none text-gray-800 font-medium bg-white/90 transition focus:ring-2 focus:ring-orange-300 border-gray-300 ${err.address ? 'border-red-400 focus:ring-red-200' : ''}`}
                type="text"
                placeholder="Enter your shop address"
                value={addShop.address}
                onChange={handleInputChange}
                required
                maxLength={120}
                aria-invalid={!!err.address}
                aria-describedby={err.address ? "shopAddress-error" : undefined}
              />
              {err.address && (
                <span id="shopAddress-error" className="text-red-600 text-xs">{err.address}</span>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-8 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 transition duration-200 flex items-center justify-center w-full py-3 rounded-xl text-white font-bold text-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:opacity-60 disabled:cursor-not-allowed"
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <span className="group-hover:text-white drop-shadow-lg">Create Shop</span>
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CreatedShop;
