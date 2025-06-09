// src/data/data.js
const sendBooking = async (data) => {
   const response = await fetch("/api/book", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });

   if (!response.ok) {
      throw new Error("Failed to book");
   }

   return response.json();
};

export default sendBooking;
