"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@/Components/Button";
import { useRouter } from "next/navigation";
function Page() {
    const ORDER_DETAILS = useSelector((state) => state.orderDetails.orders);
    const ORDER_TOTAL = useSelector((state) => state.orderDetails.total_price);
    const ORDER_ID = useSelector((state) => state.orderDetails.id);
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobileNo: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: ""
    });

    const [saveToLocalStorage, setSaveToLocalStorage] = useState(false);

    useEffect(() => {
        const localData = localStorage.getItem("userCheckoutInfo");
        const sessionData = sessionStorage.getItem("userCheckoutInfo");

        if (localData) {
            setFormData(JSON.parse(localData));
            setSaveToLocalStorage(true);
        } else if (sessionData) {
            setFormData(JSON.parse(sessionData));
            setSaveToLocalStorage(false);
        }
    }, []);

    // Save to appropriate storage on formData change
    useEffect(() => {
        const storage = saveToLocalStorage ? localStorage : sessionStorage;
        storage.setItem("userCheckoutInfo", JSON.stringify(formData));
    }, [formData, saveToLocalStorage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const ReturnToCheckout = () => {
        router.push("/payment")
    }
    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setSaveToLocalStorage(checked);

        // Move data between session and local storage when toggle happens
        const storage = checked ? localStorage : sessionStorage;
        storage.setItem("userCheckoutInfo", JSON.stringify(formData));

        const otherStorage = checked ? sessionStorage : localStorage;
        otherStorage.removeItem("userCheckoutInfo");
    };

    const inputFields = [
        { name: "address", label: "Address" },
        { name: "city", label: "City" },
        { name: "state", label: "State" },
        { name: "country", label: "Country" },
        { name: "pincode", label: "Pincode" },
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "mobileNo", label: "Contact No." }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <h2 className="text-xl font-bold mb-4">Shipping & Receiver Details</h2>

            <form className="grid grid-cols-1 gap-4">
                {inputFields.map(({ name, label }) => (
                    <input
                        key={name}
                        type="text"
                        name={name}
                        placeholder={label}
                        value={formData[name]}
                        onChange={handleChange}
                        className="p-2 rounded bg-gray-800 text-white w-full"
                    />
                ))}

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={saveToLocalStorage}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4"
                    />
                    <span>Save Shipping Info for future use</span>
                </label>
            </form>
            <div className='bg-gray-900 w-screen relative overflow-hidden  flex'>
                <a className="w-screen fixed bottom-0 left-0 z-50 p6 flex items-center justify-center bg-green-500 shadow-lg rounded-t-lg py-2">
                    <Button
                        text={"Return to Checkout"}
                        className="flex justify-center bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => ReturnToCheckout()} />
                </a>
            </div>

        </div>
    );
}

export default Page;
