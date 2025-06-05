"use client"; // Required because we're using hooks
import { useRouter } from "next/navigation";

function ViewOrder({ isDisabled }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/view-order");
  };

  return (
    <>
      {!isDisabled && (
        <div className="flex mt-4 items-center justify-center bg-green-500 shadow-lg rounded-lg">
          <button
            onClick={handleClick}
            className="flex justify-center bg-green-500 text-white px-4 py-2 rounded"
          >
            View Order
          </button>
        </div>
      )}
    </>
  );
}

export default ViewOrder;
