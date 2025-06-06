'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
function page() {
  const searchParams = useSearchParams();
    useEffect(() => {
    const razorpay_payment_id = searchParams.get("razorpay_payment_id");
    const razorpay_payment_link_id = searchParams.get("razorpay_payment_link_id");
    const razorpay_payment_link_reference_id = searchParams.get("razorpay_payment_link_reference_id");
    const razorpay_payment_link_status = searchParams.get("razorpay_payment_link_status");
    const razorpay_signature = searchParams.get("razorpay_signature");

    console.log("Razorpay Callback Data:", {
      razorpay_payment_id,
      razorpay_payment_link_id,
      razorpay_payment_link_reference_id,
      razorpay_payment_link_status,
      razorpay_signature,
    });

  }, [searchParams]);
  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold">Payment Callback Received</h1>
      <p>Thank you for your payment. We're processing your order.</p>
    </div>
  )
}

export default page