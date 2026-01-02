//RenderListAndDict.jsx

import { useState, useEffect } from "react";
import cards_data from "./Datas/Card_Cover.json";

function RenderListAndDict({ list, dict, onClose, onRoll }) {
  const [visible, setVisible] = useState(false); // mount/unmount
  const [showContent, setShowContent] = useState(false); // animation
  const defaut_imageLink = "/Icons/Icon/Defaults.png";
  const backgroundoficon = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1024px-HD_transparent_picture.png"
  // Khi list/dict thay đổi, mount component và bật animation
  useEffect(() => {
    if (list && dict) {
      setVisible(true);
      setTimeout(() => setShowContent(true), 50); // delay 1 frame để CSS transition chạy
    }
  }, [list, dict]);

  if (!visible) return null;

  const handleClose = () => {
    setShowContent(false); // start fade-out
    
    setTimeout(() => {
      setVisible(false); // unmount sau transition
      if (onClose) onClose();
    }, 500); // trùng với thời gian transition
  };

  return (
    // KHUNG TRẮNG – FULL SCREEN
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",

        backgroundImage: "url('https://images.alphacoders.com/781/thumb-1920-781036.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* KHUNG ĐEN – NỘI DUNG CHÍNH */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "1200px",
          width: "100%",
          backgroundColor: "transparent",
          padding: "20px",
          boxSizing: "border-box",
          borderRadius: "8px",
          textAlign: "center",

          opacity: showContent ? 1 : 0,
          transform: showContent ? "scale(1)" : "scale(0.95)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", // 1–4 cột
    maxWidth: "900px",        // khung ảo để canh giữa
    margin: "0 auto 30px",    // căn giữa theo trục dọc
    justifyContent: "center", // tránh dồn trái khi thiếu cột
    gap: "15px",
  }}
>
  {list.map((item, index) => (
    <div
      key={index}
      style={{
        padding: "10px 5px",
        borderRadius: "8px",
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative", // Rất quan trọng: Đặt container cha là relative
      }}
    >
      {/* ẢNH BACKGROUND NẰM PHÍA SAU */}
      <img
        src={cards_data[item]?.background ? cards_data[item].background : backgroundoficon} // Thay bằng link ảnh nền hoặc dữ liệu từ item
        alt=""
        style={{
          position: "absolute", // Đặt ảnh này vị trí tuyệt đối
          top: "0",
          left: "0",
          width: "100%", // Chiếm toàn bộ chiều rộng của div cha relative
          height: "100%", // Chiếm toàn bộ chiều cao của div cha relative
          objectFit: "cover", // Đảm bảo ảnh bao phủ mà không bị méo
          borderRadius: "8px", // Bo góc giống container
          zIndex: "0", // Đặt z-index thấp hơn icon chính
        }}
      />

      {/* ICON CHÍNH (Nằm phía trước) */}
      <img
        src={cards_data[item.split("~")[1].trim()]?.cover ? cards_data[item.split("~")[1].trim()].cover : defaut_imageLink}
        alt="icon"
        style={{ 
          width: "125px", 
          height: "125px", 
          marginBottom: "5px",
          position: "relative", // Đặt icon là relative để nó nằm trên background
          zIndex: "1", // Đặt z-index cao hơn ảnh background
        }}
      />
      
      {/* TÊN MỤC (Cũng cần z-index cao hơn background nếu cần) */}
      <div style={{ position: "relative", zIndex: "1" }}>{item.split("~")[0].trim()}</div>
    </div>
  ))}
</div>

        {/* Dict */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
<div
style={{
    width: "100%",
    // Tăng Padding để text cách xa khung hơn (Cân đối tỉ lệ)
    padding: "16px", 
    
    // Màu nền xám đậm (trung tính) với Opacity 80%
    backgroundColor: "rgba(0, 0, 0, 0.8)", 
    border: "3px solid #b19898ff",
    // Màu chữ trắng ngà, dễ chịu hơn so với trắng tinh
    color: "#fff700", 
    textShadow: "1px 1px 0 #4400ffff, -1px -1px 0 #4400ffff, 1px -1px 0 #4400ffff, -1px 1px 0 #4400ffff",
    
    borderRadius: "8px", // Tăng nhẹ độ cong góc
    textAlign: "left",
    
    // Thêm một chút đổ bóng (optional) để tạo độ sâu
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  }}
// ... (các phần style ở trên không thay đổi)
>
  {/* Sắp xếp dữ liệu trước khi lặp */}
  {Object.entries(dict)
    .sort(([keyA, valueA], [keyB, valueB]) => {
      // 1. Sắp xếp Giảm dần (DESC) theo Value
      if (valueB !== valueA) {
        // Trừ B cho A để có kết quả Giảm dần (B > A -> dương)
        return valueB - valueA; 
      }
      
      // 2. Nếu Value bằng nhau, sắp xếp Tăng dần (ASC) theo Key
      // Sử dụng localeCompare để so sánh chuỗi (key)
      return keyA.localeCompare(keyB);
    })
    .map(([key, value], index) => (
    <div 
        key={index} // Lưu ý: Nên dùng key (tên thuộc tính) nếu có thể để đảm bảo tính ổn định
        style={{ 
            marginBottom: "8px", 
            marginTop: "8px",
            marginLeft: "8px",
            fontSize: 20,
            fontWeight: 700,
            // Điều chỉnh khoảng cách giữa các mục
            paddingBottom: index < Object.keys(dict).length - 1 ? "2px" : "0",
        }}
    >
      {/* Key in đậm màu sáng hơn */}
      <strong 
        style={{ 
          color: "#007fff", 
          textShadow: "1px 1px 0 #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff" 
        }}
      >
        {key}:
      </strong> {value}
    </div>
  ))}
</div>
        </div>

        {/* Text hướng dẫn */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "white",
            opacity: 0.6,
            userSelect: "none",
          }}
        >
          Click anywhere to continue
        </div>
      </div>
    </div>
  );
}

export default RenderListAndDict;
