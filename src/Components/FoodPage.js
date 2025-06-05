import React from 'react'
import { useState } from 'react';
import { foodItems } from '@/Constant/food'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ProceedToPay from './ProceedToPay';
function FoodPage() {
    const [quantities, setQuantities] = useState({})
    console.log(foodItems)
    const renderStars = () => {
        const stars = []
        for (let i = 0; i < 50; i++) {
            stars.push(
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                />,
            )
        }
        return stars
    }
const renderActionButton = (item) => {
    const quantity = quantities[item.name] || 0;

    return (
        <div className="w-32 flex justify-center items-center">
            {quantity < 1 ? (
                <Button
                    style={{ backgroundColor: "#f7a916" , color:"white"}}
                    className="text-white font-bold w-full h-8 rounded-lg"
                    onClick={() => {
                        setQuantities((prev) => ({
                            ...prev,
                            [item.name]: 1,
                        }));
                    }}
                >
                    BUY
                </Button>
            ) : (
                <div className="flex items-center gap-2 justify-center w-full">
                    <Button
                        size="sm"
                        style={{ backgroundColor: "#e64d45" }}
                        className="text-white w-8 h-8 rounded-full p-0 flex items-center justify-center"
                        onClick={() => {
                            setQuantities((prev) => {
                                const newQty = Math.max(0, (prev[item.name] || 0) - 1);
                                return {
                                    ...prev,
                                    [item.name]: newQty,
                                };
                            });
                        }}
                    >
                        <span className="text-white text-lg font-bold">−</span>
                    </Button>

                    <Button
                        size="sm"
                        style={{ backgroundColor: "#f7a916" }}
                        className="text-white w-8 h-8 rounded-full p-0 flex items-center justify-center"
                        onClick={() => {
                            setQuantities((prev) => ({
                                ...prev,
                                [item.name]: (prev[item.name] || 0) + 1,
                            }));
                        }}
                    >
                        <span className="text-white text-lg font-bold">+</span>
                    </Button>
                </div>
            )}
        </div>
    );
};


    return (
        <div>
            <div className="min-h-screen top-4  bg-gray-900 relative overflow-hidden p-6">
                {/* Scattered stars background */}
                {renderStars()}

                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                        {foodItems.map((item, index) => (
                            <Card key={index}
                             style={{ backgroundColor: "#101829" }}
                             elevation={4}
                            className="bg-gray-900/60 backdrop-blur-md rounded-xl p-4   shadow-lg hover:shadow-2xl transition-all duration-300 transform  ">
                                <div className="text-center  space-y-3">
                                    {/* Food emoji */}
                                    <div className="text-6xl mb-2 relative">
                                        {item.emoji}
                                        <div
                                            className={`absolute -top-2 -right-2 bg-orange-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-bold ${(!quantities[item.name] || quantities[item.name] === 0) ? "hidden" : ""
                                                }`}
                                        >
                                            {quantities[item.name]}
                                        </div>
                                    </div>


                                    {/* Name and price */}
                                    <div className="text-white">
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <span className="font-semibold text-lg">{item.name}</span>
                                            {item.rating && (
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400">⭐</span>
                                                    <span className="text-sm ml-1">{item.rating}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
                                    </div>

                                    {/* Action button */}
                                    <div className="pt-2">{renderActionButton(item)}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
                <ProceedToPay />
            </div>
        </div>
    )
}

export default FoodPage