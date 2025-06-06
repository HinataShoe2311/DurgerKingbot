"use client"
import React, { useState, useEffect, use } from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Button from '@/Components/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import { useRouter } from 'next/navigation';
import { CALLBACK_URL } from '@/Services/ApiConfig';
import {paymentRequest} from "@/Slices/PaymentRequestSlice"
import { useDispatch } from 'react-redux';
function page() {
    const ORDER_DETAILS = useSelector((state) => state.orderDetails.orders);
    const ORDER_TOTAL = useSelector((state) => state.orderDetails.total_price);
    const ORDER_ID = useSelector((state) => state.orderDetails.id);
    const [shipping, setShipping] = useState({})
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [email, setEmail] = useState()
    const router = useRouter()
    const dispatch = useDispatch()
     // Load saved data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("userCheckoutInfo");
        const sessionData = sessionStorage.getItem("userCheckoutInfo")

        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setShipping(parsed)
                setName(parsed.name || "");
                setPhone(parsed.mobileNo || "");
                setEmail(parsed.email || "")
                setAddress(
                    [parsed.address, parsed.city, parsed.state, parsed.country, parsed.pincode]
                        .filter(Boolean)
                        .join(", ")
                );
            } catch (e) {
                console.error("Invalid localStorage data");
            }
        } else {
            try {
                const parsed = JSON.parse(sessionData);
                setShipping(parsed)
                setName(parsed.name || "");
                setPhone(parsed.mobileNo || "");
                setEmail(parsed.email || "")
                setAddress(
                    [parsed.address, parsed.city, parsed.state, parsed.country, parsed.pincode]
                        .filter(Boolean)
                        .join(", ")
                );
            } catch (e) {
                console.error("Invalid Sesion data");
            }
        }
    }, []);

    const ProceedToPay = () => {
        let body =
        {
            "amount": ORDER_TOTAL * 100,
            "currency": "INR",
            "accept_partial": false,
            "expire_by": Date.now() + 15 * 60 * 1000,
            "reference_id": ORDER_ID,
            "description": `Payment for Order #${ORDER_ID}`,
            "customer": {
                "name": shipping.name,
                "contact": shipping.mobileNo,
                "email": shipping.email
            },
            "notify": {
                "sms": true,
                "email": true
            },
            "reminder_enable": true,
            "notes": {},
            "callback_url": CALLBACK_URL,
            "callback_method": "get"
        }
        dispatch(paymentRequest(body))
    }
    return (
        <div className='min-h-screen bg-gray-900'>
            <div className="w-screen bg-gray-900 relative overflow-hidden p-2 flex  ">
                <ListItem key={"OrderList"} className='bg-gray-800'>
                    <ListItemText
                        primary={"Checkout"}

                        className="text-white"
                    />

                </ListItem>
            </div>
            <div className="w-screen bg-gray-900 relative overflow-hidden p-2 flex  ">
                <ListItem key={"OrderList"} className='bg-gray-800'>
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image="order_checkout.jpg"
                            alt="Order checkout out"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    {`Order #:${ORDER_ID}`}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    Perfect lunch from durger king
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                Durger King By: Manoj Sharma
                            </Box>
                        </Box>

                    </Card>
                </ListItem>
            </div>
            <div className=" w-screen bg-gray-900 relative overflow-hidden flex p-2 pb-1 justify-center">
                <List sx={{ width: '100%' }} className='bg-gray-900'>
                    {ORDER_DETAILS.map((item) => (
                        <ListItem key={item.id} className='bg-gray-800'>
                            <ListItemAvatar>
                                <Avatar>
                                    {item.emoji}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <>
                                        {item.name}{' '}
                                        <span className="text-yellow-400 font-semibold">{item.quantity}x</span>
                                    </>
                                }
                                secondary={<>
                                    <span className='text-white'> {`Price: ${item.price}₹`}</span>
                                </>}
                                className="text-white"
                            />
                            <div>
                                <span className="text-white font-bold">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </div>
            <div className="w-screen bg-gray-900 relative overflow-hidden pl-2 pr-2 pb-2 flex  ">
                <ListItem key={"OrderList"} className='bg-gray-800'>
                    <ListItemText
                        primary={"Total "}

                        className="text-white"
                    />
                    <div>
                        <span className="text-green-500 font-bold">
                            ₹{(ORDER_TOTAL).toFixed(2)}
                        </span>
                    </div>
                </ListItem>
            </div>
            <div className="w-screen bg-gray-900 relative overflow-hidden p2  pb-18   ">
                <div className=" ">
                    <h2 className="text-sm font-bold mb-4">Checkout Details</h2>

                    <List sx={{ width: '100%', color: "white" }}>
                        <ListItem onClick={() => router.push('/shipping-info')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <LocationOnIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={address}
                                secondary="Shipping Address"
                                secondaryTypographyProps={{ sx: { color: '#7c7f88' } }} />
                        </ListItem>
                        <ListItem onClick={() => router.push('/shipping-info')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name} secondary="Name" secondaryTypographyProps={{ sx: { color: '#7c7f88' } }} />
                        </ListItem>
                        <ListItem onClick={() => router.push('/shipping-info')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <CallIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={phone} secondary="Phone Number" secondaryTypographyProps={{ sx: { color: '#7c7f88' } }} />
                        </ListItem>
                        <ListItem onClick={() => router.push('/shipping-info')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <EmailIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email} secondary="Email" secondaryTypographyProps={{ sx: { color: '#7c7f88' } }} />
                        </ListItem>
                    </List>

                </div>
            </div>
            <div className='bg-gray-900 w-screen relative overflow-hidden  flex'>
                <a className="w-screen fixed bottom-0 left-0 z-50 p6 flex items-center justify-center bg-green-500 shadow-lg rounded-t-lg py-2">
                    <Button
                        text={`Pay: ${ORDER_TOTAL.toFixed(2)}₹`}
                        className="flex justify-center bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => ProceedToPay()} />
                </a>
            </div>
        </div>
    )
}

export default page