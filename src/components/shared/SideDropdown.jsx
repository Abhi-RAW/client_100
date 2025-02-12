import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/features/categorySlice";
import { setSearchValue } from "../../redux/features/searchSlice";

export const SideDropdown = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["iPhone", "Macbook", "iPad", "Airpods", "Watch"];

  const handleSelect = (item) => {
    dispatch(setCategory(item.toLowerCase()));
    dispatch(setSearchValue(""));
  };

  const dropdownStyle = {
    position: "relative",
    display: "inline-block",
  };

  const dropdownMenuStyle = {
    position: "absolute",
    top: "0",
    left: "100%", // Opens sideways
    backgroundColor: "#333",
    padding: "10px",
    borderRadius: "5px",
    display: isOpen ? "block" : "none",
    minWidth: "120px",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
  };

  const navItemStyle = {
    padding: "8px 12px",
    color: "#fff",
    textDecoration: "none",
    display: "block",
    cursor: "pointer",
    transition: "background 0.3s",
  };

  return (
    <div
      style={dropdownStyle}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span style={{ cursor: "pointer", color: "#fff", fontWeight: "bold" }}>
        Categories ▼
      </span>
      <div style={dropdownMenuStyle}>
        {categories.map((item) => (
          <div
            key={item}
            onClick={() => handleSelect(item)}
            style={{ ...navItemStyle, ...navItemHoverActiveStyle }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
