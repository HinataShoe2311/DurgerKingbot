// src/app/view-order/page.jsx
"use client";
import React from 'react';
import { useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@/Components/Button';
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { assignIdToOrder } from '@/Slices/OrderDetailsSlice';
const ViewOrder = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const [mounted, setMounted] = React.useState(false);

  const ORDER_DETAILS = useSelector((state) => state?.orderDetails?.orders);
  const TOTAL_PRICE = useSelector((state) => state.orderDetails.total_price);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const ProceedToPay = () => {
    dispatch(assignIdToOrder(generateOrderIdIST()))
    router.push("/payment")
  }
  function generateOrderIdIST() {
    const now = new Date();

    // Get the UTC time in milliseconds, add offset for IST (5 hours 30 minutes = 19800000 ms)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);

    const year = istTime.getUTCFullYear();
    const month = istTime.getUTCMonth() + 1; // Months are zero-based
    const date = istTime.getUTCDate();
    const hours = istTime.getUTCHours();
    const minutes = istTime.getUTCMinutes();

    // Pad with leading zero if needed
    const pad = (num) => num.toString().padStart(2, '0');

    return `${year}${pad(month)}${pad(date)}${pad(hours)}${pad(minutes)}`;
  }
  return (
    <div className='min-h-screen bg-gray-900'>
      <div className="w-screen bg-gray-900 relative overflow-hidden p-2 flex  ">
        <ListItem key={"OrderList"} className='bg-gray-800'>
          <ListItemText
            primary={"Your Order"}

            className="text-white"
          />
          <div>
            <a href="/" className="text-green-500 font-bold ">
              edit
            </a>
          </div>
        </ListItem>
      </div>
      <div className=" w-screen bg-gray-900 relative overflow-hidden flex pl-2 pr-2  justify-center">
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
      <div className="w-screen bg-gray-900 relative overflow-hidden pl-2 pr-2 pb-18 flex  ">
        <ListItem key={"OrderList"} className='bg-gray-800'>
          <ListItemText
            primary={"Total "}

            className="text-white"
          />
          <div>
            <span className="text-green-500 font-bold">
              ₹{(TOTAL_PRICE).toFixed(2)}
            </span>
          </div>
        </ListItem>
      </div>
      <div className='bg-gray-900 w-screen relative overflow-hidden  flex'>
        <a className="w-screen fixed bottom-0 left-0 z-50 p6 flex items-center justify-center bg-green-500 shadow-lg rounded-t-lg py-2">
          <Button
            text={`Proceed To Pay: ${TOTAL_PRICE.toFixed(2)}₹`}
            className="flex justify-center bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => ProceedToPay()} />
        </a>
      </div>
    </div>
  );
};

export default ViewOrder;
