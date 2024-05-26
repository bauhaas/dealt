// src/app/components/HelloWorld.tsx
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function HelloWorld() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchMessage() {
      try {
        const session = await getSession();
        if (session) {
          const response = await axios.get("http://localhost:3001/", {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          });
          const data = await response.data;
          console.log(response.data);
          setMessage(data); // Assuming the API returns { message: "Hello World!" }
        }
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    }

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Hello from NestJS:</h1>
      <p>{message}</p>
    </div>
  );
}
