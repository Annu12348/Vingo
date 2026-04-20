import React, { useEffect, useState, useCallback } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../utils/axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setItem, setSingleItem } from "../redux/reducer/ItemReducer";

// Array constants for categories and food types for maintainability
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
  "Others",
];

const FOOD_TYPES = ["Veg", "Non-Veg", "Vegan"];

const ItemUpdate = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    foodName: "",
    price: "",
    image: "",
    category: "",
    foodType: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  // Image Change Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
    setImagePreview(file ? URL.createObjectURL(file) : "");
  };

  // Fetch food by Id using useCallback for perf
  const fetchItemById = useCallback(async () => {
    try {
      setLoading(true);
      const response = await instance.get(`/item/fetchBy-Id/${itemId}`, { withCredentials: true });
      const item = response.data.item;
      dispatch(setSingleItem(item));
      setFormData({
        foodName: item.foodName || "",
        price: item.price || "",
        image: item.image || "",
        category: item.category || "",
        foodType: item.foodType || "",
      });
      setImagePreview(item.image || "");
      setErrors({});
    } catch (error) {
      toast.error("Unable to fetch item. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [dispatch, itemId]);

  useEffect(() => {
    fetchItemById();
  }, [fetchItemById]);

  // Update handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Client-side validation
    let validationErrors = {};
    if (!formData.foodName.trim()) validationErrors.foodName = "Food name is required.";
    if (!formData.price) validationErrors.price = "Price is required.";
    if (!formData.category) validationErrors.category = "Category is required.";
    if (!formData.foodType) validationErrors.foodType = "Food type is required.";
    if (!formData.image) validationErrors.image = "Food image is required.";
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const updateData = new FormData();
      updateData.append("foodName", formData.foodName);
      updateData.append("price", formData.price);
      updateData.append("category", formData.category);
      updateData.append("foodType", formData.foodType);

      // Only append image if it's a new file selected by user
      if (formData.image && typeof formData.image !== "string") {
        updateData.append("image", formData.image);
      }

      const response = await instance.put(`/item/update/${itemId}`, updateData, { withCredentials: true });
      dispatch(setItem(response.data.item));
      toast.success(response.data.message || "Item updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      if (error?.response?.data?.message) {
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

  // Better avatar placeholder logic
  const AvatarSrc =
    imagePreview && typeof imagePreview === "string"
      ? imagePreview
      : "https://e7.pngegg.com/pngimages/424/789/png-clipart-hamburger-junk-food-fast-food-hamburger-french-fries-pizza-junk-food-s-food-recipe-thumbnail.png";

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 to-indigo-100  items-center">
      <header className="w-full">
        <Link
          to="/dashboard"
          title="Back to Dashboard"
          className="inline-flex items-center gap-2 text-xl text-blue-800 rounded-full p-2 hover:bg-blue-100 transition-all"
        >
          <GoArrowLeft size={24} />
          <span className="font-semibold">Dashboard</span>
        </Link>
   
      </header>
      <section className="bg-white/90 rounded-3xl shadow-lg mt-5 px-7 py-10 w-full max-w-2xl flex flex-col items-center animate-fadeIn">
        <div className="p-2 mb-3 shadow-inner rounded-full bg-gradient-to-tr from-yellow-200 to-orange-200 w-28 h-28 flex items-center justify-center border-4 border-blue-200">
          <img
            src={AvatarSrc}
            alt="food-preview"
            className="object-cover w-full h-full rounded-full transition-transform duration-200 hover:scale-105"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-900 tracking-tight mb-3 capitalize text-center">
          Edit Shop Food
        </h1>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {/* Food Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Food Name</label>
            <input
              className={`text-base rounded-lg px-3 py-2 border-2 ${
                errors.foodName
                  ? "border-red-500 focus:border-red-500"
                  : "border-blue-300 focus:border-blue-500"
              } focus:outline-none font-medium text-gray-700 transition-all`}
              type="text"
              placeholder="Enter food name"
              value={formData.foodName}
              onChange={(e) => setFormData((prev) => ({ ...prev, foodName: e.target.value }))}
              disabled={loading}
              maxLength={64}
            />
            {errors.foodName && <span className="text-xs text-red-500">{errors.foodName}</span>}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Food Price</label>
            <input
              className={`text-base rounded-lg px-3 py-2 border-2 ${
                errors.price
                  ? "border-red-500 focus:border-red-500"
                  : "border-blue-300 focus:border-blue-500"
              } focus:outline-none font-medium text-gray-700 transition-all`}
              type="number"
              placeholder="Enter food price"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              min={1}
              step="0.01"
              disabled={loading}
            />
            {errors.price && <span className="text-xs text-red-500">{errors.price}</span>}
          </div>

          {/* Image */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Food Image</label>
            <input
              className={`text-base rounded-lg px-3 py-2 border-2 ${
                errors.image
                  ? "border-red-500 focus:border-red-500"
                  : "border-blue-300 focus:border-blue-500"
              } focus:outline-none font-medium text-gray-700 bg-white transition-all file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
            />
            {errors.image && <span className="text-xs text-red-500">{errors.image}</span>}
            {imagePreview && (
              <div className="relative w-full aspect-[6/3] mt-2 rounded-xl shadow overflow-hidden bg-gray-100 border border-blue-200">
                <img
                  className="w-full h-full object-cover object-center"
                  src={typeof imagePreview === "string" ? imagePreview : URL.createObjectURL(imagePreview)}
                  alt="Current Preview"
                  onError={(e) => { e.target.onerror = null; e.target.src = ""; }}
                />
                <span className="absolute right-2 bottom-2 bg-white/70 text-xs text-gray-600 px-2 py-0.5 rounded-full shadow">
                  Preview
                </span>
              </div>
        
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <select
              className={`text-base rounded-lg px-3 py-2 border-2 ${
                errors.category
                  ? "border-red-500 focus:border-red-500"
                  : "border-blue-300 focus:border-blue-500"
              } focus:outline-none font-medium text-gray-700 capitalize transition-all`}
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              disabled={loading}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="text-xs text-red-500">{errors.category}</span>}
          </div>

          {/* FoodType */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Food Type</label>
            <select
              className={`text-base rounded-lg px-3 py-2 border-2 ${
                errors.foodType
                  ? "border-red-500 focus:border-red-500"
                  : "border-blue-300 focus:border-blue-500"
              } focus:outline-none font-medium text-gray-700 capitalize transition-all`}
              value={formData.foodType}
              onChange={(e) => setFormData((prev) => ({ ...prev, foodType: e.target.value }))}
              disabled={loading}
            >
              <option value="">Select foodtype</option>
              {FOOD_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.foodType && <span className="text-xs text-red-500">{errors.foodType}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`mt-2 w-full py-3 rounded-xl font-bold text-lg transition-all ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-800 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.01] shadow"
            } text-white flex items-center justify-center`}
            disabled={loading}
          >
            {loading ? (
              <span className="inline-flex items-center">
                <svg className="w-6 h-6 animate-spin mr-2 text-white" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-20"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-80"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Food"
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ItemUpdate;
