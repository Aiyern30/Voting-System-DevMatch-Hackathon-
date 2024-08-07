"use client";

import { useState } from "react";

export default function GetHost() {
  const [host, setHost] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchHost = async () => {
    try {
      const response = await fetch("/api/getHost");
      const data = await response.json();
      if (response.ok) {
        setHost(data.host);
        setError(null); // Clear any previous errors
      } else {
        setError(data.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <button onClick={fetchHost}>Get Host</button>
      {host && <p>Host Address: {host}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
