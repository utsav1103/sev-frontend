import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/products" element={<div>Products</div>} />
        <Route path="/cart" element={<div>Cart</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
