// bookingApi.js

const sendBooking = async (bookingData) => {
   try {
      const response = await fetch("https://your-backend-url.com/api/bookings", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
         throw new Error("Failed to send booking");
      }

      return await response.json();
   } catch (error) {
      throw error;
   }
};

export default sendBooking;
