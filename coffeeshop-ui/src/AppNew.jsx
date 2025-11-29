import { useEffect, useState } from "react";
import "./appNew.css";

const API_BASE = "";

function App() {
    const [catalog, setCatalog] = useState([]);
    const [loadingCatalog, setLoadingCatalog] = useState(false);
    const [activeCategory, setActiveCategory] = useState("all");

    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showCustomModal, setShowCustomModal] = useState(null);

    const [orderResult, setOrderResult] = useState(null);
    const [sending, setSending] = useState(false);

    // Customization state for modal
    const [withMilk, setWithMilk] = useState(false);
    const [milkType, setMilkType] = useState("WHOLE");
    const [withSyrup, setWithSyrup] = useState(false);
    const [syrupType, setSyrupType] = useState("CARAMEL");
    const [withExtraShot, setWithExtraShot] = useState(false);
    const [withWhippedCream, setWithWhippedCream] = useState(false);
    const [withCinnamon, setWithCinnamon] = useState(false);

    // Load catalog
    useEffect(() => {
        loadCatalog();
    }, []);

    const loadCatalog = async () => {
        try {
            setLoadingCatalog(true);
            const res = await fetch(`${API_BASE}/catalog`);
            if (!res.ok) throw new Error("Failed to load catalog");
            const data = await res.json();
            setCatalog(data);
        } catch (e) {
            console.error("Catalog error:", e);
            alert("Error loading catalog: " + e.message);
        } finally {
            setLoadingCatalog(false);
        }
    };

    // Filter items by category
    const filteredItems = activeCategory === "all"
        ? catalog
        : catalog.filter(item => item.category === activeCategory);

    // Add to cart
    const addToCart = (item, customizations = null) => {
        const cartItem = {
            ...item,
            customizations,
            cartId: Date.now() + Math.random(),
            quantity: 1
        };
        setCart(prev => [...prev, cartItem]);
        setShowCart(true);
    };

    // Remove from cart
    const removeFromCart = (cartId) => {
        setCart(prev => prev.filter(item => item.cartId !== cartId));
    };

    // Update quantity
    const updateQuantity = (cartId, newQty) => {
        if (newQty < 1) {
            removeFromCart(cartId);
            return;
        }
        setCart(prev => prev.map(item =>
            item.cartId === cartId ? {...item, quantity: newQty} : item
        ));
    };

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => {
        let price = item.price;
        if (item.customizations) {
            if (item.customizations.withMilk) price += 100;
            if (item.customizations.withSyrup) price += 150;
            if (item.customizations.withExtraShot) price += 200;
            if (item.customizations.withWhippedCream) price += 100;
            if (item.customizations.withCinnamon) price += 50;
        }
        return sum + (price * item.quantity);
    }, 0);

    // Send order
    const sendOrder = async () => {
        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }

        try {
            setSending(true);

            const simpleItems = [];
            const customDrinks = [];

            cart.forEach(item => {
                if (item.customizations && item.customizable) {
                    customDrinks.push({
                        code: item.code,
                        quantity: item.quantity,
                        withMilk: item.customizations.withMilk,
                        milkType: item.customizations.milkType,
                        withSyrup: item.customizations.withSyrup,
                        syrupType: item.customizations.syrupType,
                        withExtraShot: item.customizations.withExtraShot,
                        withWhippedCream: item.customizations.withWhippedCream,
                        withCinnamon: item.customizations.withCinnamon
                    });
                } else {
                    simpleItems.push({
                        code: item.code,
                        quantity: item.quantity
                    });
                }
            });

            const payload = {
                items: simpleItems.length > 0 ? simpleItems : null,
                drinks: customDrinks.length > 0 ? customDrinks : null
            };

            const res = await fetch(`${API_BASE}/order/custom`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Order failed");

            const data = await res.json();
            setOrderResult(data);
            setCart([]);
            setShowCart(false);
            alert("Order placed successfully!");
        } catch (e) {
            console.error("Order error:", e);
            alert("Error: " + e.message);
        } finally {
            setSending(false);
        }
    };

    // Open customization modal
    const openCustomModal = (item) => {
        setShowCustomModal(item);
        setWithMilk(false);
        setWithSyrup(false);
        setWithExtraShot(false);
        setWithWhippedCream(false);
        setWithCinnamon(false);
    };

    // Apply customizations
    const applyCustomizations = () => {
        if (!showCustomModal) return;

        const customizations = {
            withMilk,
            milkType,
            withSyrup,
            syrupType,
            withExtraShot,
            withWhippedCream,
            withCinnamon
        };

        addToCart(showCustomModal, customizations);
        setShowCustomModal(null);
    };

    const categories = [
        { id: "all", name: "All", icon: "🍽️" },
        { id: "beverage", name: "Beverages", icon: "☕" },
        { id: "dessert", name: "Desserts", icon: "🍰" },
        { id: "meal", name: "Meals", icon: "🥗" }
    ];

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <h1>☕ CoffeeShop</h1>
                    <button
                        className="cart-button"
                        onClick={() => setShowCart(!showCart)}
                    >
                        🛒 Cart {cartCount > 0 && `(${cartCount})`}
                    </button>
                </div>
            </header>

            {/* Category Filter */}
            <div className="categories">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        <span className="category-icon">{cat.icon}</span>
                        <span>{cat.name}</span>
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="products-grid">
                {loadingCatalog ? (
                    <div className="loading">Loading menu...</div>
                ) : (
                    filteredItems.map(item => (
                        <div key={item.code} className="product-card">
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="product-image"
                                loading="lazy"
                            />
                            <div className="product-info">
                                <h3>{item.name}</h3>
                                <p className="product-description">{item.description}</p>
                                <div className="product-footer">
                                    <span className="product-price">{item.price} ₸</span>
                                    <div className="product-actions">
                                        {item.customizable ? (
                                            <button
                                                className="btn btn-small btn-secondary"
                                                onClick={() => openCustomModal(item)}
                                            >
                                                🎨 Customize
                                            </button>
                                        ) : null}
                                        <button
                                            className="btn btn-small"
                                            onClick={() => addToCart(item)}
                                        >
                                            ➕ Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Cart Sidebar */}
            {showCart && (
                <div className="cart-overlay" onClick={() => setShowCart(false)}>
                    <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                        <div className="cart-header">
                            <h2>🛒 Your Cart</h2>
                            <button className="close-btn" onClick={() => setShowCart(false)}>✕</button>
                        </div>

                        {cart.length === 0 ? (
                            <p className="empty-cart">Your cart is empty</p>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cart.map(item => (
                                        <div key={item.cartId} className="cart-item">
                                            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                                            <div className="cart-item-info">
                                                <h4>{item.name}</h4>
                                                {item.customizations && (
                                                    <div className="customizations">
                                                        {item.customizations.withMilk && <span>🥛 {item.customizations.milkType}</span>}
                                                        {item.customizations.withSyrup && <span>🍯 {item.customizations.syrupType}</span>}
                                                        {item.customizations.withExtraShot && <span>⚡ Extra</span>}
                                                        {item.customizations.withWhippedCream && <span>🍦 Cream</span>}
                                                        {item.customizations.withCinnamon && <span>🌿 Cinnamon</span>}
                                                    </div>
                                                )}
                                                <div className="cart-item-controls">
                                                    <div className="quantity-controls">
                                                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>−</button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                                                    </div>
                                                    <button
                                                        className="remove-btn"
                                                        onClick={() => removeFromCart(item.cartId)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-footer">
                                    <div className="cart-total">
                                        <span>Total:</span>
                                        <strong>{subtotal.toFixed(2)} ₸</strong>
                                    </div>
                                    <button
                                        className="btn btn-primary btn-large"
                                        onClick={sendOrder}
                                        disabled={sending}
                                    >
                                        {sending ? "⏳ Processing..." : "📤 Place Order"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Customization Modal */}
            {showCustomModal && (
                <div className="modal-overlay" onClick={() => setShowCustomModal(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>🎨 Customize {showCustomModal.name}</h2>
                            <button className="close-btn" onClick={() => setShowCustomModal(null)}>✕</button>
                        </div>

                        <div className="modal-body">
                            {showCustomModal.toppingInfo ? (
                                <>
                                    {showCustomModal.toppingInfo.milkAllowed && (
                                        <div className="custom-option">
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={withMilk}
                                                    onChange={(e) => setWithMilk(e.target.checked)}
                                                />
                                                <span>🥛 Add Milk (+100₸)</span>
                                            </label>
                                            {withMilk && (
                                                <select value={milkType} onChange={(e) => setMilkType(e.target.value)}>
                                                    <option value="WHOLE">Whole Milk</option>
                                                    <option value="OAT">Oat Milk</option>
                                                    <option value="ALMOND">Almond Milk</option>
                                                    <option value="COCONUT">Coconut Milk</option>
                                                </select>
                                            )}
                                        </div>
                                    )}

                                    {showCustomModal.toppingInfo.syrupAllowed && (
                                        <div className="custom-option">
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={withSyrup}
                                                    onChange={(e) => setWithSyrup(e.target.checked)}
                                                />
                                                <span>🍯 Add Syrup (+150₸)</span>
                                            </label>
                                            {withSyrup && (
                                                <select value={syrupType} onChange={(e) => setSyrupType(e.target.value)}>
                                                    <option value="CARAMEL">Caramel</option>
                                                    <option value="VANILLA">Vanilla</option>
                                                    <option value="HAZELNUT">Hazelnut</option>
                                                    <option value="CHOCOLATE">Chocolate</option>
                                                </select>
                                            )}
                                        </div>
                                    )}

                                    {showCustomModal.toppingInfo.extraShotAllowed && (
                                        <div className="custom-option">
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={withExtraShot}
                                                    onChange={(e) => setWithExtraShot(e.target.checked)}
                                                />
                                                <span>⚡ Extra Shot (+200₸)</span>
                                            </label>
                                        </div>
                                    )}

                                    {showCustomModal.toppingInfo.whippedCreamAllowed && (
                                        <div className="custom-option">
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={withWhippedCream}
                                                    onChange={(e) => setWithWhippedCream(e.target.checked)}
                                                />
                                                <span>🍦 Whipped Cream (+100₸)</span>
                                            </label>
                                        </div>
                                    )}

                                    {showCustomModal.toppingInfo.cinnamonAllowed && (
                                        <div className="custom-option">
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={withCinnamon}
                                                    onChange={(e) => setWithCinnamon(e.target.checked)}
                                                />
                                                <span>🌿 Cinnamon (+50₸)</span>
                                            </label>
                                        </div>
                                    )}

                                    {!showCustomModal.toppingInfo.milkAllowed &&
                                     !showCustomModal.toppingInfo.syrupAllowed &&
                                     !showCustomModal.toppingInfo.extraShotAllowed &&
                                     !showCustomModal.toppingInfo.whippedCreamAllowed &&
                                     !showCustomModal.toppingInfo.cinnamonAllowed && (
                                        <p className="no-customizations">
                                            ℹ️ This item cannot be customized
                                        </p>
                                    )}
                                </>
                            ) : (
                                <p className="no-customizations">
                                    ℹ️ Loading customization options...
                                </p>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowCustomModal(null)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={applyCustomizations}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Result */}
            {orderResult && (
                <div className="modal-overlay" onClick={() => setOrderResult(null)}>
                    <div className="modal success-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>✅ Order Confirmed!</h2>
                            <button className="close-btn" onClick={() => setOrderResult(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="order-summary">
                                {orderResult.lines?.map((line, idx) => (
                                    <div key={idx} className="order-line">{line}</div>
                                ))}
                            </div>
                            <div className="order-total">
                                <div className="total-row">
                                    <span>Subtotal:</span>
                                    <span>{orderResult.subtotal?.toFixed(2)} ₸</span>
                                </div>
                                {orderResult.discount > 0 && (
                                    <div className="total-row discount">
                                        <span>Discount:</span>
                                        <span>-{orderResult.discount?.toFixed(2)} ₸</span>
                                    </div>
                                )}
                                <div className="total-row final">
                                    <strong>Total:</strong>
                                    <strong>{orderResult.total?.toFixed(2)} ₸</strong>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary btn-large" onClick={() => setOrderResult(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

