import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/products";

  const getProducts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setProducts(data);
  };

  const addProduct = async () => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    setName("");
    setPrice("");
    getProducts();
  };

  const updateProduct = async () => {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    setName("");
    setPrice("");
    setEditId(null);
    getProducts();
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setEditId(product.id);
  };

  const deleteProduct = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>CRUD Produk</h2>

      <input
        placeholder="Nama produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={editId ? updateProduct : addProduct}>
        {editId ? "Update" : "Tambah"}
      </button>
      {editId && (
        <button onClick={() => {
          setEditId(null);
          setName("");
          setPrice("");
        }}>Batal</button>
      )}

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - Rp{p.price}
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => deleteProduct(p.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
