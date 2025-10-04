import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { MdRestaurant } from "react-icons/md";
import { useSelector } from "react-redux";

const CreatedShop = () => {
  const { city } = useSelector((store) => store.Auth);
  console.log(city.city);
  const [addShop, setAddShop] = useState({
    name: "",
    image: "",
    city: city.city || "",
    state: city.state || "",
    address: city.address_line1 || "",
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

  const submitHandler = (e) => {
    e.preventDefault();
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
          <h1 className="text-xl font-bold capitalize mt-2 ">add shop</h1>
          <form className="w-full mt-2" onSubmit={submitHandler}>
            <div className="flex flex-col  ">
              <label className="font-semibold capitalize tracking-tight ">
                name
              </label>
              <input
                className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300 capitalize font-semibold mt-1"
                type="text"
                placeholder="enter your shop name"
                value={addShop.name}
                onChange={(e) =>
                  setAddShop({ ...addShop, name: e.target.value })
                }
                required
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
            <div className="flex gap-6 mt-3">
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
              </div>
              <div className="flex flex-col  w-[47%]   ">
                <label className="font-semibold capitalize tracking-tight ">
                  state
                </label>
                <input
                  className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300 capitalize font-semibold mt-1"
                  type="text"
                  placeholder="enter your shop state"
                  value={addShop.state}
                  onChange={(e) =>
                    setAddShop({ ...addShop, state: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mt-3 ">
              <label className="font-semibold capitalize tracking-tight ">
                address
              </label>
              <input
                className="text-zinc-500 border px-2 py-2 rounded-lg outline-none border-zinc-300 capitalize font-semibold mt-1"
                type="text"
                placeholder="enter your shop address"
                value={addShop.address}
                onChange={(e) =>
                  setAddShop({ ...addShop, address: e.target.value })
                }
                required
              />
            </div>
            <input
              type="submit"
              placeholder=""
              className="bg-[rgb(240,107,41)] w-full mt-5 py-2.5 rounded-lg text-white font-semibold "
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatedShop;
