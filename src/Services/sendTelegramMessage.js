const sendTelegramMessage = async (body = {}, maxRetries = 5, delay = 1000) => {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      console.log("✅ Message sent successfully");
      return data; // success, exit function
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
export default sendTelegramMessage;
