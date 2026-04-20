import React, { useState, useCallback, useRef } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { toast } from "react-toastify";

// Centralized and maintainable options
const CATEGORIES = [
  "Snacks",
  "Main Course",
  "Desserts",
  "Pizza",
  "Burgers",
  "Sandwiches",
  "South Indian",
  "North Indian",
  "Chinese",
  "Fast Food",
  "Others"
];

const FOOD_TYPES = ["Veg", "Non-Veg", "Vegan"];

const initialState = {
  foodName: "",
  price: "",
  image: "",
  category: "",
  foodType: "",
  description: ""
};

const ItemAdd = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingDescription, setFetchingDescription] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  // Image preview handler
  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(file ? URL.createObjectURL(file) : "");
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setErrors({});
      setLoading(true);

      try {
        const data = new FormData();
        data.append("foodName", formData.foodName.trim());
        data.append("price", formData.price);
        data.append("category", formData.category);
        data.append("foodType", formData.foodType);
        data.append("description", formData.description.trim());
        if (formData.image) {
          data.append("image", formData.image);
        }

        const res = await instance.post("/item/create", data, { withCredentials: true });
        toast.success(res.data.message);
        setFormData(initialState);
        setImagePreview("");
        navigate("/dashboard");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          Array.isArray(error.response.data.errors)
        ) {
          // Backend validation errors
          const fieldsError = {};
          for (const er of error.response.data.errors) {
            fieldsError[er.path] = er.msg;
          }
          setErrors(fieldsError);
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
    },
    [formData, navigate]
  );

  // Reference to cancel duplicate async, for autofill race condition prevention
  const autofillReqId = useRef(0);

  // CHANGE HERE: Remove auto description onChange, only on enter key!
  const handleFoodNameChange = e => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      foodName: value,
    }));
    // If cleared, also clear description
    if (!value.trim()) {
      setFormData(prev => ({
        ...prev,
        description: "",
      }));
    }
    // No generative API call on onChange
  };

  // On Enter, generate description via API
  const handleFoodNameKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!formData.foodName.trim()) {
        toast.error("Enter food name first");
        return;
      }
      setFetchingDescription(true);
      autofillReqId.current += 1;
      const currReqId = autofillReqId.current;
      try {
        const res = await instance.post("/ai/autogenerate-description-byfoodname", { foodName: formData.foodName.trim() });
        if (currReqId === autofillReqId.current) {
          setFormData(prev => ({
            ...prev,
            description: res.data.description ?? "",
          }));
          toast.success("AI Description Generated ✨");
        }
      } catch (error) {
        if (currReqId === autofillReqId.current) {
          toast.error("AI failed");
        }
      } finally {
        if (currReqId === autofillReqId.current) {
          setFetchingDescription(false);
        }
      }
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-100 to-blue-50 py-2 pb-4  px-2 flex flex-col">
      {/* Back to dashboard */}
      <div className="flex justify-start items-center mx-auto w-full">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-3 py-2 text-lg text-indigo-600 hover:text-blue-900 hover:bg-indigo-100 focus:outline-none rounded transition-colors "
        >
          <GoArrowLeft size={23} />
          <span className="font-semibold">Dashboard</span>
        </Link>
      </div>

      <section className="w-full max-w-lg mx-auto mt-6 flex-1 flex flex-col shadow-2xl rounded-2xl bg-white overflow-hidden">
        <header className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 py-6 px-2 relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center mb-2">
            <img
              className="w-full h-full object-cover"
              src="https://e7.pngegg.com/pngimages/424/789/png-clipart-hamburger-junk-food-fast-food-hamburger-french-fries-pizza-junk-food-s-food-recipe-thumbnail.png"
              alt="Food Item"
              draggable={false}
            />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white capitalize text-center drop-shadow-lg">
            Add New Menu Item
          </h1>
          <span className="absolute bottom-2 right-4 bg-white/90 text-xs rounded-full px-3 py-1 font-semibold text-blue-600 shadow-inner">
            Owner Panel
          </span>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 px-6 py-7 md:py-9"
          autoComplete="off"
          encType="multipart/form-data"
        >
          {/* Food Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="foodName" className="text-base font-semibold text-gray-700">
              Food Name <span className="text-red-500">*</span>
            </label>
            <input
              className={`rounded-lg px-3 py-2 border-2 transition-all font-medium text-gray-800 shadow-sm focus:outline-none ${errors.foodName ? "border-red-500" : "border-blue-300 focus:border-blue-500"}`}
              type="text"
              id="foodName"
              name="foodName"
              placeholder="e.g., Classic Veg Burger"
              required
              value={formData.foodName}
              onChange={handleFoodNameChange}
              onKeyDown={handleFoodNameKeyDown}
              disabled={loading}
              autoFocus
              maxLength={64}
              autoComplete="off"
            />
            {fetchingDescription && formData.foodName.trim() && (
              <span className="text-xs text-blue-500 pt-1 flex items-center gap-1">
                <svg className="inline-block w-4 h-4 animate-spin mr-1" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Generating description...
              </span>
            )}
            {errors.foodName && (
              <span className="text-xs text-red-500 pt-0.5">{errors.foodName}</span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-base font-semibold text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className={`rounded-lg resize-none px-3 py-2 border-2 transition-all font-medium text-gray-800 shadow-sm focus:outline-none ${errors.description ? "border-red-500" : "border-blue-300 focus:border-blue-500"}`}
              id="description"
              name="description"
              rows={4}
              placeholder="A brief description of your menu item..."
              required
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              disabled={loading || fetchingDescription}
              maxLength={512}
              autoComplete="off"
            />
            {errors.description && (
              <span className="text-xs text-red-500 pt-0.5">{errors.description}</span>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="text-base font-semibold text-gray-700">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              className={`rounded-lg px-3 py-2 border-2 transition-all font-medium text-gray-800 shadow-sm focus:outline-none ${errors.price ? "border-red-500" : "border-blue-300 focus:border-blue-500"}`}
              type="number"
              id="price"
              name="price"
              min={1}
              max={10000}
              step="0.01"
              placeholder="E.g., 129.99"
              required
              value={formData.price}
              onChange={e => setFormData(prev => ({ ...prev, price: e.target.value.replace(/[^\d.]/g, '') }))}
              disabled={loading}
            />
            {errors.price && (
              <span className="text-xs text-red-500 pt-0.5">{errors.price}</span>
            )}
          </div>

          {/* Image */}
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-base font-semibold text-gray-700">
              Food Image <span className="text-red-500">*</span>
            </label>
            <input
              className={`rounded-lg px-3 py-2 border-2 transition-all font-medium text-gray-700 bg-white file:mr-2 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-base file:font-semibold file:bg-indigo-50 file:text-blue-700 hover:file:bg-indigo-100 hover:cursor-pointer ${errors.image ? "border-red-500" : "border-blue-300 focus:border-blue-500"}`}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              onChange={handleImageChange}
              disabled={loading}
              aria-describedby="image-input-desc"
            />
            <span className="text-xs text-gray-500" id="image-input-desc">
              JPG, PNG, or GIF.
            </span>
            {errors.image && (
              <span className="text-xs text-red-500 pt-0.5">{errors.image}</span>
            )}
            {imagePreview && (
              <div className="relative w-full aspect-[6/3] mt-2 rounded-xl shadow overflow-hidden bg-gray-50 border border-blue-200">
                <img
                  className="w-full h-full object-cover object-center"
                  src={imagePreview}
                  alt="Preview"
                  draggable={false}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = "";
                  }}
                />
                <span className="absolute right-2 bottom-2 bg-white/80 text-xs text-gray-600 px-2 py-0.5 rounded-full shadow">
                  Preview
                </span>
              </div>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-base font-semibold text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className={`rounded-lg px-3 py-2 border-2 transition-all font-medium text-gray-700 capitalize shadow-sm focus:outline-none ${errors.category ? "border-red-500" : "border-blue-300 focus:border-blue-500"}`}
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              disabled={loading}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option value={cat} key={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <span className="text-xs text-red-500 pt-0.5">{errors.category}</span>
            )}
          </div>

          {/* FoodType */}
          <div className="flex flex-col gap-1">
            <label htmlFor="foodType" className="text-base font-semibold text-gray-700">
              Food Type <span className="text-red-500">*</span>
            </label>
            <select
              className={`rounded-lg px-3 py-2 border-2 transition-all font-medium text-gray-700 capitalize shadow-sm focus:outline-none ${errors.foodType ? "border-red-500" : "border-blue-300 focus:border-blue-500"}`}
              id="foodType"
              name="foodType"
              required
              value={formData.foodType}
              onChange={e => setFormData(prev => ({ ...prev, foodType: e.target.value }))}
              disabled={loading}
            >
              <option value="">Select foodtype</option>
              {FOOD_TYPES.map((type) => (
                <option value={type} key={type}>{type}</option>
              ))}
            </select>
            {errors.foodType && (
              <span className="text-xs text-red-500 pt-0.5">{errors.foodType}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-3 py-3 rounded-xl text-lg font-bold transition-all flex items-center justify-center shadow-lg 
              ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 hover:scale-[1.01]"
              } text-white`}
            tabIndex={loading ? -1 : 0}
          >
            {loading ? (
              <span className="inline-flex items-center">
                <svg
                  className="w-6 h-6 animate-spin mr-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-20"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-80"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Add Menu Item"
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ItemAdd;
