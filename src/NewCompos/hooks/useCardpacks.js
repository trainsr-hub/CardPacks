import { useEffect, useState } from "react";

// Custom hook: lấy danh sách card pack từ file JSON local
export default function useCardpacks() {
  const [cardpacks, setCardpacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ⚠️ THAY "cardpacks.json" bằng đúng tên file JSON của bạn
    const jsonUrl = new URL("./Decks.json", import.meta.url);

    fetch(jsonUrl)
      .then((res) => {
        if (!res.ok) {
          // Báo lỗi HTTP rõ ràng
          throw new Error("Failed to load local cardpacks JSON");
        }
        return res.json();
      })
      .then((data) => {
        setCardpacks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, []); 
  // Không còn backendUrl → dependency rỗng là đúng

  return {
    cardpacks,
    loading,
    error,
  };
}
