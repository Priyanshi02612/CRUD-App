// App.js
import "./App.css";
import ProductList from "./ProductList";
import React, { useState, useRef } from "react";

function App() {
  const products = [
    {
      id: 1,
      name: "School bag",
      qnty: 3,
    },
    {
      id: 2,
      name: "Mobile",
      qnty: 5,
    },
    {
      id: 3,
      name: "Tablet",
      qnty: 2,
    },
    {
      id: 4,
      name: "Television",
      qnty: 1,
    },
  ];

  const [newProducts, setNewProducts] = useState(products);
  const [newProductName, setNewProductName] = useState("");
  const [newProductQnty, setNewProductQnty] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const textRef = useRef(null);
  const qntyRef = useRef(null);

  const addProduct = () => {
    console.log("add product");
    if (newProductName !== "" && newProductQnty !== "") {
      const updatedProducts = [
        ...newProducts,
        {
          id: newProducts.length + 1,
          name: newProductName,
          qnty: newProductQnty,
        },
      ];
      setNewProducts(updatedProducts);
      setNewProductName("");
      setNewProductQnty("");

      textRef.current.textContent = `You added ${newProductName} with ${newProductQnty} quntity.`;

      setTimeout(() => {
        textRef.current.textContent = "";
      }, 1000);
    }
  };

  const removeProduct = (id) => {
    console.log("remove product");
    let message = window.confirm("Are you sure to remove product?");
    if (message) {
      const indexToRemove = newProducts.findIndex(
        (product) => product.id === id
      );
      const updatedProducts = [...newProducts]
        .filter((product) => product.id !== id)
        .map((product, index) => ({ ...product, id: index + 1 }));

      setNewProducts(updatedProducts);

      textRef.current.textContent = `You removed ${newProducts[indexToRemove].name}.`;

      setTimeout(() => {
        textRef.current.textContent = "";
      }, 1000);
    }
  };

  const editProductData = (id) => {
    console.log("edit product");
    const productToEdit = newProducts.find((product) => product.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setNewProductName(productToEdit.name);
      setNewProductQnty(productToEdit.qnty);
    }
  };

  const saveEditedProduct = () => {
    console.log("save edit");
    const updatedProducts = newProducts.map((product) =>
      product.id === editingProduct.id
        ? { ...product, name: newProductName, qnty: newProductQnty }
        : product
    );
    setNewProducts(updatedProducts);
    setEditingProduct(null);
    setNewProductName("");
    setNewProductQnty("");

    if (!isEditing) {
      textRef.current.textContent = "";
      qntyRef.current.textContent = "";
    } else {
      textRef.current.textContent = `You updated product name ${editingProduct.name} to ${newProductName}.`;
      qntyRef.current.textContent = `You updated product quntity ${editingProduct.qnty} to ${newProductQnty}.`;
    }

    setTimeout(() => {
      textRef.current.textContent = "";
      qntyRef.current.textContent = "";
    }, 2000);
  };

  const removeAllProducts = () => {
    console.log("remove all");
    let message = window.confirm("Are you sure to remove all products?");
    if (message) {
      setNewProducts([]);
    }
  };

  return (
    <div className="container mt-3 d-flex flex-column align-items-center">
      <h2>Products list</h2>
      <form className="form-control mb-4 " onSubmit={(e) => e.preventDefault()}>
        <div className="p-1">
          <input
            className="form-control input"
            value={newProductName}
            type="text"
            placeholder="Enter product name you want to add"
            onChange={(e) => setNewProductName(e.target.value)}
          />
        </div>
        <div className="p-1">
          <input
            className="form-control input"
            value={newProductQnty}
            type="number"
            placeholder="Enter product quantity you want to add"
            onChange={(e) => setNewProductQnty(e.target.value)}
          />
        </div>
        <div className="p-1 ">
          <button
            className="btn btn-dark"
            onClick={editingProduct ? saveEditedProduct : addProduct}
          >
            {editingProduct ? "Save edited product" : "Add Product"}
          </button>
        </div>
      </form>

      <ProductList
        removeProduct={removeProduct}
        editProductData={editProductData}
        newProducts={newProducts}
      />
      <div className="p-1 mb-2">
        <button className="btn btn-dark" onClick={removeAllProducts}>
          Remove all products
        </button>
      </div>

      <p ref={textRef} className="ms-5 text-success"></p>
      <p ref={qntyRef} className="ms-5 text-success"></p>
    </div>
  );
}

export default App;
