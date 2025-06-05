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
const ViewOrder = () => {
  const [mounted, setMounted] = React.useState(false);

  const ORDER_DETAILS = useSelector((state) => state?.orderDetails?.orders);
  const TOTAL_PRICE = useSelector((state) => state.orderDetails.total_price);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const handlePayment = () => { }
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
      <div className="w-screen bg-gray-900 relative overflow-hidden p-2 pb-18 flex  ">
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
            text={`Pay: ${TOTAL_PRICE.toFixed(2)}₹`}
            className="flex justify-center bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => handlePayment()} />
        </a>
      </div>
    </div>
  );
};

export default ViewOrder;
