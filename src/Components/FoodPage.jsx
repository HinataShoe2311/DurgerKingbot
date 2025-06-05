import React from 'react'
import { useState } from 'react';
import { foodItems } from '@/Constant/food'
import Card from '@mui/material/Card';
import Button from './Button';
import ViewOrder from './ViewOrder';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToOrder, removeItemFromOrder, resetStore } from '../Slices/OrderDetailsSlice';
import {persistor} from "@/Store/Store"
function FoodPage() {
    const [mounted, setMounted] = React.useState(false);
    let isDisabled = true
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orderDetails.orders);
    isDisabled = !orders || orders.length === 0;

    const total_price = useSelector((state) => state.orderDetails.total_price);
    React.useEffect(() => {
        const navEntry = performance.getEntriesByType("navigation")[0];
        const isReload = navEntry?.type === "reload";

        if (isReload) {
            // ✅ Only reset store on hard reload
            dispatch(resetStore());

            // If using redux-persist
            persistor.purge?.();
        }
    }, []);

    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const getQuantityById = (id) => {
        const item = orders.find(order => order.id === id);
        return item ? item.quantity : 0;
    };
    const renderActionButton = (item) => {
        const quantity = getQuantityById(item.id) || 0;
        return (
            <div className="w-12 flex justify-center items-center">
                {quantity < 1 ? (
                    <Button
                        text={"BUY"}
                        className="text-white bg-yellow-500 hover:bg-yellow-600 flex justify-center items-center w-full h-8 rounded-lg "
                        onClick={() => { dispatch(addItemToOrder(item.id)) }}
                    />

                ) : (
                    <div className="flex items-center justify-center gap-x-2 w-12">
                        <Button
                            size="sm"
                            text={"-"}
                            className="text-white w-8 bg-red-500 hover:bg-red-600 h-8 rounded-full flex items-center justify-center"
                            onClick={() => dispatch(removeItemFromOrder(item.id))}
                        >

                        </Button>

                        <Button
                            size="sm"
                            text={"+"}
                            className="text-white bg-yellow-500 hover:bg-yellow-600 flex justify-center items-center w-8  h-8 rounded-full"
                            onClick={() => dispatch(addItemToOrder(item.id))}
                        >
                            <span className="text-white text-sm font-bold">+</span>
                        </Button>
                    </div>

                )}
            </div>
        );
    };


    return (
        <div>
            <div className="min-h-screen w-screen bg-gray-900 relative overflow-hidden p-6"
                style={{ backgroundImage: "url('/snow.gif')" }}>
                {/* Scattered stars background */}

                <div className="relative z-10 ">
                    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">

                        {foodItems.map((item, index) => (

                            <Card key={index}
                                style={{ backgroundColor: "#030303" }}
                                elevation={4}
                                className="bg-gray-900/60 backdrop-blur-md rounded-xl p-4   shadow-lg hover:shadow-2xl transition-all duration-300 transform  ">
                                <div className="text-center space-y-3">
                                    <div className="text-5xl mb-2 relative">
                                        {item.emoji}
                                        <div
                                            className={`absolute -top-2 -right-2 bg-orange-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-bold ${getQuantityById(item.id) < 1 ? 'hidden' : ''}
                                                }`}
                                        >
                                            {getQuantityById(item.id)}
                                        </div>
                                    </div>


                                    {/* Name and price */}
                                    <div className="text-white">
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <span className="font-semibold text-sm">{item.name}</span>
                                            {item.rating && (
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400">⭐</span>
                                                    <span className="text-sm ml-1">{item.rating}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-sm font-bold">${item.price.toFixed(2)}</div>
                                    </div>

                                    {/* Action button */}
                                    <div className="pt-2 " style={{ alignItems: "center", justifyItems: "center" }}>{renderActionButton(item)}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
                <ViewOrder isDisabled={isDisabled} total={total_price.toFixed(2)} />
            </div>
        </div>
    )
}

export default FoodPage