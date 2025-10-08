const { useState, createContext, useContext } = React;
const { BrowserRouter: Router, Routes, Route, Link, useParams, useNavigate } = window.ReactRouterDOM;

const CartContext = React.createContext();

function useCart() {
  return useContext(CartContext);
}

function Navbar() {
  const { cart } = useCart();
  return (
    <header className="flex justify-between items-center p-6 shadow-md sticky top-0 bg-white z-50">
      <div className="text-2xl font-bold">Jungle Magic</div>
      <nav className="space-x-6 hidden md:flex">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/collections" className="hover:underline">Collections</Link>
        <Link to="/cart" className="hover:underline">Cart ({cart.length})</Link>
      </nav>
      <div className="md:hidden">☰</div>
    </header>
  );
}

function HomePage() {
  return (
    <div>
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-pink-100">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Jungle Magic</h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl">
          Explore our curated collection of lifestyle accessories and fun finds.
        </p>
        <Link to="/collections" className="px-6 py-3 bg-black text-white rounded-2xl text-lg">Shop Now</Link>
      </section>

      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border rounded-2xl overflow-hidden shadow-sm">
              <Link to={`/product/${item}`}>
                <div className="bg-gray-200 h-64"></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Product {item}</h3>
                  <p className="text-sm text-gray-600 mb-2">$25.00</p>
                  <span className="text-sm font-medium underline">View Product</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CollectionsPage() {
  const collections = [
    { name: "Stickers", image: "https://via.placeholder.com/300x200" },
    { name: "T-Shirt", image: "https://via.placeholder.com/300x200" },
    { name: "Mugs", image: "https://via.placeholder.com/300x200" },
    { name: "Keychains", image: "https://via.placeholder.com/300x200" },
  ];

  return (
    <section className="py-16 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">Shop by Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {collections.map((col, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-sm border">
            <img src={col.image} alt={col.name} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-medium">{col.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAdd = () => {
    addToCart({ id, name: `Product ${id}`, price: 25.0, quantity: Number(quantity) });
    navigate("/cart");
  };

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-200 h-96 w-full"></div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Product {id}</h1>
          <p className="text-lg text-gray-600 mb-4">This is a detailed description of Product {id}. It's stylish, functional, and awesome.</p>
          <p className="text-xl font-semibold mb-6">$25.00</p>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-2 rounded w-20"
            />
          </div>
          <button onClick={handleAdd} className="px-6 py-3 bg-black text-white rounded-2xl text-lg">Add to Cart</button>
        </div>
      </div>
    </section>
  );
}

function CartPage() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow-sm">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p className="font-bold">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-4">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 py-10 px-6 text-center text-sm text-gray-600">
      <p>&copy; 2025 Jungle Magic. All rights reserved.</p>
    </footer>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="flex justify-between items-center p-6 shadow-md sticky top-0 bg-white z-50">
        <div className="text-2xl font-bold">Jungle Magic</div>
        <nav className="flex space-x-8">
          <button className="text-gray-900 hover:text-gray-600">Home</button>
          <button className="text-gray-900 hover:text-gray-600">Collections</button>
          <button className="text-gray-900 hover:text-gray-600">Cart ({cart.length})</button>
        </nav>
      </header>
      
      <main>
        <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-pink-100">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Jungle Magic</h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl whitespace-nowrap">
            Explore our curated collection of lifestyle accessories and fun finds.
          </p>
          <button className="px-6 py-3 bg-black text-white rounded-2xl text-lg">Shop Now</button>
        </section>

        <section className="py-16 px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-200 h-64"></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Product {item}</h3>
                  <p className="text-sm text-gray-600 mb-2">$25.00</p>
                  <button 
                    onClick={() => addToCart({id: item, name: `Product ${item}`, price: 25.0, quantity: 1})}
                    className="text-sm font-medium underline"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-100 py-10 px-6 text-center text-sm text-gray-600">
        <p>&copy; 2025 Jungle Magic. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Make App globally available for the HTML script
window.App = App;
