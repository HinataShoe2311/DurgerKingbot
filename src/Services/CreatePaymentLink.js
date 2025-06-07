const createPaymentLink = async (body = {}) => {
  try {
    
    const response = await fetch("/api/payment-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    if (!response.ok) throw new Error(data.error || "Failed to create payment link");
    return data;
  } catch (error) {
    console.error("Error creating payment link:", error);
    return {};
  }
};

export default createPaymentLink;
