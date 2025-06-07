'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import getPaymentDetails from '@/Services/getPaymentDetails';
import sendTelegramMessage from '@/Services/sendTelegramMessage';
import { useRouter } from 'next/navigation';
export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [isloading, setIsLoading] = useState(true)

  function cleanupWebApp() {
    console.log("Running cleanup...");
    dispatch(resetPaymentStore())
    dispatch(resetStore())
    sessionStorage.removeItem("userCheckoutInfo")
  }


  function generateOrderConfirmationMessage(orderId, amount, paymentStatus, items) {
    const emojiMap = {
      "Cake": "🍰",
      "Burger": "🍔",
      "Fries": "🍟",
      "Hotdog": "🌭",
      "Taco": "🌮",
      "Pizza": "🍕",
      "Donut": "🍩",
      "Popcorn": "🍿",
      "Coke": "🥤",
      "Icecream": "🍦",
      "Cookie": "🍪",
      "Flan": "🍮",
    }
    const itemsText = items
      .map((item, i) => {
        const emoji = emojiMap[item.name] || "";
        return ` ${i + 1}. ${item.name} ${emoji ? `(${emoji})` : ""} × ${item.quantity} — ₹${Number(item.price).toFixed(2)}`;
      })
      .join('\n');

    return `🧾 *Order Confirmed!*\n\n` +
      `🆔 Order ID: ${orderId}\n` +
      `💰 Amount: ₹${Number(amount).toFixed(2)}\n` +
      `✅ Payment Status: ${paymentStatus}\n\n` +
      `📦 Items:\n${itemsText}\n\n` +
      `🙏 Thank you for placing your order with us! We appreciate your business.`;
  }


  function parseMapArrayString(str) {
    let trimmed = str.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      trimmed = trimmed.slice(1, -1);
    }

    let parts = trimmed.split(' map[');

    if (parts[0].startsWith('map[')) {
      parts[0] = parts[0].slice(4);
    }

    parts = parts.map(part => part.endsWith(']') ? part.slice(0, -1) : part);

    const result = parts.map(part => {
      const obj = {};
      const keyValues = part.trim().split(/\s+/);

      keyValues.forEach(kv => {
        const [key, ...rest] = kv.split(':');
        const value = rest.join(':');

        if (key === "price") {
          const numVal = Number(value);
          obj[key] = isNaN(numVal) ? value : +numVal.toFixed(2);
        } else {
          const numVal = Number(value);
          obj[key] = isNaN(numVal) ? value : numVal;
        }
      });

      return obj;
    });

    return result;
  }

  useEffect(() => {
    const fetchAndNotify = async () => {
      const razorpay_payment_link_id = searchParams.get("razorpay_payment_link_id");
      const razorpay_payment_link_status = searchParams.get("razorpay_payment_link_status");
      const user_id = searchParams.get("user_id");

      try {
        const data = await getPaymentDetails(razorpay_payment_link_id);
        const rawOrderString = String(data?.notes?.order || '[]');
        const orders = parseMapArrayString(rawOrderString);
        const id = data?.notes?.order_id || '';
        const amt = data?.notes?.order_total || '';

        if (razorpay_payment_link_status === "paid") {
          const messageText = generateOrderConfirmationMessage(id, amt, razorpay_payment_link_status, orders);
          const response = await sendTelegramMessage({ chat_id: user_id, text: messageText });
          // start here
          if (response.status === 200 || response?.data?.ok) {
            
            cleanupWebApp()
            // Close the web app (for Telegram WebApp)
            if (window.Telegram?.WebApp) {
              window.Telegram.WebApp.close();
            }
          } else {
            console.error("❌ Failed to send Telegram message", response);
          }
        }
      } catch (error) {
        console.error("Error in fetchAndNotify:", error);
      }
    };
    setIsLoading(true)
    fetchAndNotify();
    setIsLoading(false)
    localStorage.clear();
    sessionStorage.clear();
  }, [searchParams]);

  const goHome = () => {
    if (!isloading) {
      router.push("/");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-4 text-white text-center">
        <h1 className="text-2xl font-extrabold mb-3 text-green-400">
          🎉 Payment Received Successfully!
        </h1>
        <h2 className="text-xl font-semibold mb-4 text-green-300">
          ✅ Your Order Has Been Placed
        </h2>
        <p className="mt-2 text-gray-300 max-w-md mx-auto">
          {isloading
            ? "Thank you for your payment! We're currently processing your order. Please hang tight while we prepare everything for you."
            : "Thank you for your payment! Your order has been processed successfully and is now being prepared for shipment. We appreciate your business!"}
        </p>

        <button
          onClick={goHome}
          disabled={isloading}
          className={`mt-4 px-4 py-2 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700
            ${isloading ? "opacity-50 cursor-not-allowed filter blur-sm" : ""}`}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}


