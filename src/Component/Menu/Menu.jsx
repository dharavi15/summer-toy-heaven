import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem.jsx";
import useCartStore from "../../data/cartStore.js";
import { getMenuFromFirestore } from "../../data/api.js";
import AddItem from "../Add-item/AddItem.jsx";

function Menu() {
  const {
    productDataList,
    toggleItemActive,
    setProductData,
    addProductVisible,
    switchAddProductVisible,
    isLoggedIn,
    setLoginStatus,
  } = useCartStore();


  const [editClick, setEditClick] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const addProductItem = useCartStore((state) => state.addProductItem);

  const handleAddItem = (item) => {
    addProductItem(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenuFromFirestore();
        setProductData(data);
        console.log("retrieve menu data:", data);
      } catch (error) {
        console.log("Failed to retrieve menu data::", error);
      }
    };
    fetchData();
  }, [setProductData]);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setLoginStatus(loginStatus === "true");
  }, [setLoginStatus]);

  const handleEditClick = () => {
    setEditClick((prev) => !prev);
  };

  const handleLogout = () => {
    setLoginStatus(false);
  };

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") return parseFloat(price.replace(/[^\d.]/g, ""));
    return 0;
  };

  const getFilteredAndSortedItems = () => {
    let filteredItems = productDataList.filter(
      (item) =>
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sortOption === "name-asc") {
      filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      filteredItems.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "price-asc") {
      filteredItems.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOption === "price-desc") {
      filteredItems.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    return filteredItems;
  };

  if (isLoggedIn === null) return null;

 return (
  <>
    {/* Search + Sort Toolbar OUTSIDE the main menu */}
    <div
      className="search-toolbar"
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "1rem 2rem",
        justifyContent: "flex-end",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          minWidth: "180px",
          padding: "0.5rem",
          fontSize: "16px",
        }}
        />

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{
          minWidth: "180px",
          padding: "0.5rem",
          fontSize: "16px",
        }}
      >
        <option value="">Sort by</option>
        <option value="name-asc">Name A–Z</option>
        <option value="name-desc">Name Z–A</option>
        <option value="price-asc">Price Low–High</option>
        <option value="price-desc">Price High–Low</option>
      </select>
    </div>

    {/* Main Menu container */}
    
      {isLoggedIn && (
        <div className="add-edit-buttons">
          <button
            className={`edit-item-button ${editClick ? "edit-mode" : ""}`}
            onClick={handleEditClick}
          >
            {editClick ? "Clear" : "Edit"}
          </button>
          <button
            onClick={() => switchAddProductVisible(true)}
            className="add-item-button"
          >
            Add
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
<div className={`menu ${editClick ? "show-buttons" : ""}`}>
      {addProductVisible && <AddItem onAddItem={handleAddItem} />}

      {getFilteredAndSortedItems().map((productItem) => (
        <MenuItem
          key={productItem.id}
          productItem={productItem}
          active={productItem.active}
        />
      ))}
    </div>
  </>
);
}
export default Menu;
