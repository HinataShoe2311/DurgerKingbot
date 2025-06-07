const getPaymentDetails = async (plink_id, maxRetries = 5, delay = 1000) => {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(`/api/payment-detail?plink_id=${plink_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch payment details");
      }

      console.log("✅ Payment details fetched successfully");
      return data; // success
    } catch (error) {
      attempt++;
      console.error(`❌ Attempt ${attempt} failed: ${error.message}`);

      if (attempt >= maxRetries) {
        console.error("❌ All retry attempts failed.");
        return { error: "All attempts failed" };
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Optional: Exponential backoff
      delay *= 2;
    }
  }
};

export default getPaymentDetails;
