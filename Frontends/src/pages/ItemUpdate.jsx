import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../utils/axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setItem, setitemByCity, setSingleItem } from "../redux/reducer/ItemReducer";

const ItemUpdate = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false)

  const [foodAdd, setFoodAdd] = useState({
    foodName: "",
    price: "",
    image: "",
    category: "",
    foodType: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  const ChangeImage = (e) => {
    const file = e.target.files[0];
    setFoodAdd({ ...foodAdd, image: file });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const shopFoodFetchByIdApi = async () => {
    try {
      const response = await instance.get(`/item/fetchBy-Id/${itemId}`, {
        withCredentials: true,
      });
      const dataById = response.data.item;
      dispatch(setSingleItem(dataById))
      setFoodAdd({
        foodName: dataById.foodName,
        price: dataById.price,
        image: dataById.image,
        category: dataById.category,
        foodType: dataById.foodType
      })
      setImagePreview(dataById.image)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    shopFoodFetchByIdApi()
  }, [itemId])

  const shopFoodUpdateApi = async () => {
    try {
      setLoading(true)

      const formData = new FormData();
      formData.append("foodName", foodAdd.foodName);
      formData.append("price", foodAdd.price);
      formData.append("category", foodAdd.category);
      formData.append("foodType", foodAdd.foodType);

      if (foodAdd.image) {
        formData.append("image", foodAdd.image);
      }

      const response = await instance.put(`/item/update/${itemId}`, formData, {
        withCredentials: true,
      });
      dispatch(setItem(response.data.item));
      navigate("/");
      toast.success(response.data.message);
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
      setLoading(false)
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    shopFoodUpdateApi();
  };
  return (
    <div className="bg-white min-h-screen w-full px-2 py-2 ">
      <Link to="/" className="text-2xl text-zinc-400">
        <GoArrowLeft />
      </Link>
      <div className="w-full min-h-[93vh] md:mt-2  mt-3 flex items-center justify-center ">
        <div className="md:w-[38%] w-full rounded-lg md:px-5 px-2 py-3 bg-zinc-200 flex items-center justify-center flex-col ">
          <div className="w-[10vh] rounded-full h-[10vh] bg-zinc-300 overflow-hidden ">
            <img
              className="w-full h-full object-cover rounded-full"
              src="https://e7.pngegg.com/pngimages/424/789/png-clipart-hamburger-junk-food-fast-food-hamburger-french-fries-pizza-junk-food-s-food-recipe-thumbnail.png"
            />
          </div>
          <h1 className="text-xl mt-1 capitalize font-bold tracking-tight leading-none">
            add shop food edit
          </h1>
          <form className="w-full mt-5" onSubmit={submitHandler}>
            <div className="flex flex-col w-full">
              <label className="text-md capitalize font-semibold tracking-tight leading-none ">
                food Name
              </label>
              <input
                className="text-md rounded mt-1 outline-none border-1 border-blue-500 px-2 py-2.5 capitalize text-zinc-500 font-semibold tracking-tight leading-none "
                type="text"
                placeholder="enter your food name"
                required
                value={foodAdd.foodName}
                onChange={(e) =>
                  setFoodAdd({ ...foodAdd, foodName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col mt-4 w-full">
              <label className="text-md capitalize font-semibold tracking-tight leading-none ">
                food price
              </label>
              <input
                className="text-md rounded mt-1 outline-none border-1 border-blue-500 px-2 py-2.5 capitalize text-zinc-500 font-semibold tracking-tight leading-none "
                type="number"
                placeholder="enter your food price"
                required
                value={foodAdd.price}
                onChange={(e) =>
                  setFoodAdd({ ...foodAdd, price: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col mt-4 w-full">
              <label className="text-md capitalize font-semibold tracking-tight leading-none ">
                food image
              </label>
              <input
                className="text-md rounded mt-1 outline-none border-1  border-blue-500 px-2 py-3 capitalize text-zinc-500 font-semibold tracking-tight leading-none"
                type="file"
                accept="image/*"
                required
                onChange={ChangeImage}
              />
            </div>
            {imagePreview && (
              <div className="w-full h-[28vh] border-1 mt-1 border-red-500 rounded  ">
                <img
                  className="w-full h-full object-cover"
                  src={imagePreview}
                  alt="image show"
                />
              </div>
            )}
            <div className="flex flex-col mt-4 w-full">
              <label className="text-md capitalize font-semibold tracking-tight leading-none ">
                food category
              </label>
              <select
                className="text-md rounded mt-1 outline-none border-1 border-blue-500 px-2 py-2.5 capitalize text-zinc-500 font-semibold tracking-tight leading-none"
                required
                value={foodAdd.category}
                onChange={(e) =>
                  setFoodAdd({ ...foodAdd, category: e.target.value })
                }
              >
                <option value="">Select category</option>
                <option value="Snacks">Snacks</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Pizza">Pizza</option>
                <option value="Burgers">Burgers</option>
                <option value="Sandwiches">Sandwiches</option>
                <option value="South Indian">South Indian</option>
                <option value="North Indian">North Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="flex flex-col mt-4 w-full">
              <label className="text-md capitalize font-semibold tracking-tight leading-none ">
                foodType
              </label>
              <select
                className="text-md rounded mt-1 outline-none border-1 border-blue-500 px-2 py-2.5 capitalize text-zinc-500 font-semibold tracking-tight leading-none"
                required
                value={foodAdd.foodType}
                onChange={(e) =>
                  setFoodAdd({ ...foodAdd, foodType: e.target.value })
                }
              >
                <option value="">Select foodtype</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>
            <button
              type="submit"
              className="text-md capitalize font-semibold bg-blue-950 w-full p-3.5 mt-5 rounded leading-none tracking-tight text-white flex items-center justify-center "
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-white border-b-3 border-t-3 animate-spin rounded-full  "></div>
              ) : "add shop food"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemUpdate;
