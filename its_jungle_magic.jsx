const { useState, createContext, useContext } = React;
const { BrowserRouter: Router, Routes, Route, Link, useParams, useNavigate } = window.ReactRouterDOM;

const CartContext = React.createContext();

function useCart() {
  return useContext(CartContext);
}

// Cart Page Component
function CartPage({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
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
      </div>
    </main>
  );
}

// Home Page Component
function HomePage({ addToCart, setCurrentPage }) {
  return (
    <main>
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-pink-100">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Jungle Magic</h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl whitespace-nowrap">
          Explore our curated collection of lifestyle accessories and fun finds.
        </p>
        <button 
          onClick={() => setCurrentPage('collections')}
          className="px-6 py-3 bg-black text-white rounded-2xl text-lg hover:bg-gray-800"
        >
          Shop Now
        </button>
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
                  className="text-sm font-medium underline hover:text-gray-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
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

function App() {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('home'); // Track current page

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
          <button 
            onClick={() => setCurrentPage('home')}
            className={`hover:text-gray-600 ${currentPage === 'home' ? 'text-gray-900 font-medium' : 'text-gray-700'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('collections')}
            className={`hover:text-gray-600 ${currentPage === 'collections' ? 'text-gray-900 font-medium' : 'text-gray-700'}`}
          >
            Collections
          </button>
          <button 
            onClick={() => setCurrentPage('cart')}
            className={`hover:text-gray-600 ${currentPage === 'cart' ? 'text-gray-900 font-medium' : 'text-gray-700'}`}
          >
            Cart ({cart.length})
          </button>
        </nav>
      </header>
      
      {/* Conditional Page Rendering */}
      {currentPage === 'home' && <HomePage addToCart={addToCart} setCurrentPage={setCurrentPage} />}
      {currentPage === 'cart' && <CartPage cart={cart} />}
      {currentPage === 'collections' && (
        <main className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Collections</h2>
            <p className="text-gray-600">Collections page coming soon...</p>
          </div>
        </main>
      )}
      
      <footer className="bg-gray-100 py-10 px-6 text-center text-sm text-gray-600">
        <p>&copy; 2025 Jungle Magic. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Make App globally available for the HTML script
window.App = App;
