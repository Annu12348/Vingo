import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../redux/reducer/ItemReducer";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const Item = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { item } = useSelector((store) => store.Item);

  const shopFoodFetchApi = async () => {
    try {
      const response = await instance.get("/item/fetch", {
        withCredentials: true,
      });
      dispatch(setItem(response.data.item));
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




  const foodhandleDelete = async (itemId) => {
    try {
      const response = await instance.delete(`/item/delete/${itemId}`, {
        withCredentials: true,
      });
      dispatch(setItem(response.data.item))
      shopFoodFetchApi()
      //navigate("/") 
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
    shopFoodFetchApi();
  }, []);
 
  return (
    <div className="bg-zinc-200 min-h-[29.5vh] flex-wrap p-1 flex items-center gap-6 justify-cente">
      {(!item || item.length <= 0) && (
        <div className="w-[20%] p-3 bg-white rounded-lg flex flex-col items-center justify-center">
          <img
            className="w-[12vh] h-[12vh] object-cover rounded-full"
            src="https://plus.unsplash.com/premium_photo-1668543548900-3b3ded85154c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600"
            alt="image shows"
          />
          <h1 className="text-md font-bold capitalize mt-1.5 tracking-tight leading-none">
            Add your food item
          </h1>
          <p className="mt-3 text-zinc-400 tracking-tight text-center mb-5 font-semibold">
            Share your delicious creations with our customers by adding them to
            the menu
          </p>
          <Link
            to="/add-food"
            className="py-2 px-5 rounded font-semibold capitalize text-white bg-[#e34277]"
          >
            Add food
          </Link>
        </div>
      )}
      {item && item.length > 0 && (
        item.map(items => (
          <div key={items._id} className="hover:shadow-lg w-[30%] bg-white rounded-lg overflow-hidden flex gap-4 items-center">
            <img
              className="w-[36%] object-cover h-[16vh]"
              src={items?.image}
              alt="images show"
            />
            <div>
              <h1 className="text-sm capitalize text-red-800 font-semibold tracking-tight leading-none">
                {items?.foodName}
              </h1>
              <h1 className="text-sm capitalize mt-1.5 font-bold tracking-tight leading-none">
                category: <span className="font-normal">{items.category}</span>
              </h1>
              <h1 className="text-sm capitalize mt-1.5 font-bold tracking-tight leading-none">
                type: <span className="font-normal">{items.foodType}</span>
              </h1>
              <h1 className="text-sm capitalize text-red-800 mt-3 font-semibold tracking-tight leading-none">
                {items.price}
              </h1>
            </div>
            <div className="gap-2 flex ml-14 mb-18">
              <Link to={`/food-update/${items._id}`} className="text-2xl text-red-600">
                <MdModeEdit />
              </Link>
              <button onClick={() => foodhandleDelete(items._id)} className="text-2xl text-red-600" title="Delete (not implemented)">
                <MdDelete />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Item;

{/*import React from 'react'

const Item = () => {
  return (
    <div>
      item
    </div>
  )
}

export default Item */}
