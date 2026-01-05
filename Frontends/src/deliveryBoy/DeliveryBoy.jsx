import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../utils/axios";
import { setDeliveryAssignment } from "../redux/reducer/AssignmentReducer";
import { toast } from "react-toastify";

const DeliveryBoy = () => {
  const { user } = useSelector((store) => store.Auth);
  const dispatch = useDispatch();
  const { deliveryAssignment } = useSelector((store) => store.Assignment);

  const getdeliveryAssignment = async () => {
    try {
      const result = await instance.get("/deliveryBoy/assiments", {
        withCredentials: true,
      });
      dispatch(setDeliveryAssignment(result.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getdeliveryByIdAssignment = async (assignmentId) => {
    try {
      const result = await instance.post(
        `/deliveryBoy/${assignmentId}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(result.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getdeliveryAssignment();
  }, [user]);
  return (
    <div className="w-full flex items-center justify-cente flex-col gap-5">
      <div className="w-[50%] rounded-lg bg-white p-2 flex shadow items-center justify-center flex-col">
        <h1 className="text-xl text-red-500 font-bold tracking-tight leading-none mb-2 capitalize">
          welcome, {user.FullName}
        </h1>
        <h1 className="text-red-800 capitalize text-center leading-none tracking-tight mt-1 mb-2">
          <span className="font-bold text-red-900">latitude</span>:{" "}
          {user.location.coordinates?.[1]},{" "}
          <span className="font-bold text-red-900">longitude</span>:{" "}
          {user.location.coordinates?.[0]}
        </h1>
      </div>

      <div className="w-[50%] rounded-lg bg-white p-2 shadow ">
        <h1 className="text-xl capitalize font-bold mb-3 tracking-tight">
          available delivery Boy
        </h1>
        {deliveryAssignment && deliveryAssignment.length > 0 ? (
          deliveryAssignment.map((item, idx) => (
            <div className="border-3 border-zinc-400 hover:border-red-400 px-2 rounded  mt-2 flex items-center justify-between">
              <div key={item.assimentId || idx} className="">
                <h1 className="text-md font-bold tracking-tight">
                  {item.shopName}
                </h1>
                <p className="text-sm text-zinc-600 font-semibold pb-0.5">
                  {item.deliveryAddress.text}
                </p>
                <p className="text-sm text-zinc-600 font-semibold pb-1.5">
                  {item.items.length} item | ₹{item.subtotal}
                </p>
              </div>
              <button
                onClick={() => getdeliveryByIdAssignment(item.assignmentId)}
                className="bg-amber-300 text-white px-6 capitalize font-semibold rounded cursor-pointer py-2"
              >
                Accept
              </button>
            </div>
          ))
        ) : (
          <p className="text-xl font-semibold text-zinc-200 capitalize">
            No assignments available.....
          </p>
        )}
      </div>
    </div>
  );
};

export default DeliveryBoy;
