import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem.jsx";
import useCartStore from "../../data/cartStore.js";
import { getMenuFromFirestore } from "../../data/api.js";
import AddItem from "../add-item/AddItem.jsx";

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

  const categories = ["Water toys", "Beach toys", "Pool fun", "Garden play"];
  const [editClick, setEditClick] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [nameSort, setNameSort] = useState("name-asc");
  const [priceSort, setPriceSort] = useState("");

  const addProductItem = useCartStore((state) => state.addProductItem);

  const handleAddItem = (item) => {
    addProductItem(item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenuFromFirestore();
        setProductData(data);
      } catch (error) {
        console.error("Failed to retrieve menu data:", error);
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
    if (typeof price === "string")
      return parseFloat(price.replace(/[^\d.]/g, ""));
    return 0;
  };

  const getFilteredAndSortedItems = (category) => {
    let filteredItems = productDataList.filter(
      (item) =>
        item.category === category &&
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Sort by name
    if (nameSort === "name-asc") {
      filteredItems = filteredItems.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (nameSort === "name-desc") {
      filteredItems = filteredItems.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    // Sort by price
    if (priceSort === "price-asc") {
      filteredItems = filteredItems.sort(
        (a, b) => parsePrice(a.price) - parsePrice(b.price)
      );
    } else if (priceSort === "price-desc") {
      filteredItems = filteredItems.sort(
        (a, b) => parsePrice(b.price) - parsePrice(a.price)
      );
    }

    return filteredItems;
  };

  if (isLoggedIn === null) return null;

  return (
    <div className={`menu ${editClick ? "show-buttons" : ""}`}>
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

      {/* Search & Sort Toolbar */}
      <div
        className="search-sort-toolbar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem 2rem",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Search by name or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flexGrow: 1,
            minWidth: "200px",
            padding: "0.5rem",
            fontSize: "16px",
          }}
        />

        <select
          value={nameSort}
          onChange={(e) => setNameSort(e.target.value)}
          style={{ minWidth: "180px", padding: "0.5rem", fontSize: "16px" }}
        >
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
        </select>

        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          style={{ minWidth: "180px", padding: "0.5rem", fontSize: "16px" }}
        >
          <option value="">Sort by price</option>
          <option value="price-asc">Price Low–High</option>
          <option value="price-desc">Price High–Low</option>
        </select>
      </div>

      {/* Add Product Form */}
      {addProductVisible && <AddItem onAddItem={handleAddItem} />}

      {/* Product Categories */}
      {categories.map((category) => (
        <div key={category}>
          <h1 id={category}>{category}</h1>
          {getFilteredAndSortedItems(category).map((productItem) => (
            <MenuItem
              key={productItem.id}
              productItem={productItem}
              active={productItem.active}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Menu;
