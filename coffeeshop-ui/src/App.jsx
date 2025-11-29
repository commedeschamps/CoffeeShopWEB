import { useEffect, useState } from "react";
import "./app.css";

const API_BASE = "http://localhost:8080";

function App() {
    const [menu, setMenu] = useState({});
    const [loadingMenu, setLoadingMenu] = useState(false);
    const [menuError, setMenuError] = useState(null);

    const [simpleItems, setSimpleItems] = useState([]);
    const [simpleCode, setSimpleCode] = useState("");
    const [simpleQty, setSimpleQty] = useState(1);

    const [customDrinks, setCustomDrinks] = useState([]);
    const [drinkCode, setDrinkCode] = useState("");
    const [drinkQty, setDrinkQty] = useState(1);
    const [withMilk, setWithMilk] = useState(false);
    const [milkType, setMilkType] = useState("WHOLE");
    const [withSyrup, setWithSyrup] = useState(false);
    const [syrupType, setSyrupType] = useState("CARAMEL");
    const [withExtraShot, setWithExtraShot] = useState(false);
    const [withWhippedCream, setWithWhippedCream] = useState(false);
    const [withCinnamon, setWithCinnamon] = useState(false);

    const [orderResult, setOrderResult] = useState(null);
    const [sending, setSending] = useState(false);
    const [orderError, setOrderError] = useState(null);

    // ===== Загрузка меню =====
    const loadMenu = async () => {
        try {
            setLoadingMenu(true);
            setMenuError(null);
            const res = await fetch(`${API_BASE}/menu`);
            if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load menu`);
            const data = await res.json();
            setMenu(data);
        } catch (e) {
            console.error("Menu loading error:", e);
            setMenuError(e.message);
            alert(" Error loading menu: " + e.message);
        } finally {
            setLoadingMenu(false);
        }
    };

    useEffect(() => {
        loadMenu();
    }, []);

    const isValidMenuCode = (code) => {
        const upperCode = code.toUpperCase();
        return Object.keys(menu).some(key => key.toUpperCase() === upperCode);
    };

    const addSimpleItem = () => {
        const code = simpleCode.trim().toUpperCase();
        const qty = Number(simpleQty);

        if (!code) {
            alert("Please enter item code");
            return;
        }
        if (!isValidMenuCode(code)) {
            alert(` Code "${code}" not found in menu. Please check available codes.`);
            return;
        }
        if (!qty || qty <= 0) {
            alert("Quantity must be ≥ 1");
            return;
        }

        setSimpleItems((prev) => [...prev, { code, quantity: qty }]);
        setSimpleCode("");
        setSimpleQty(1);
    };

    const removeSimpleItem = (index) => {
        setSimpleItems((prev) => prev.filter((_, i) => i !== index));
    };

    const clearSimple = () => {
        setSimpleItems([]);
        setOrderResult(null);
        setOrderError(null);
    };

    const sendSimpleOrder = async () => {
        if (simpleItems.length === 0) {
            alert("Add at least one simple item");
            return;
        }
        try {
            setSending(true);
            setOrderError(null);
            const res = await fetch(`${API_BASE}/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: simpleItems }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP ${res.status}: ${errorText}`);
            }

            const data = await res.json();
            setOrderResult(data);
            alert("Order placed successfully!");

            setSimpleItems([]);
        } catch (e) {
            console.error("Order error:", e);
            setOrderError(e.message);
            alert("Error sending order: " + e.message);
        } finally {
            setSending(false);
        }
    };

    // ===== Custom drinks =====
    const addDrink = () => {
        const code = drinkCode.trim().toUpperCase();
        const qty = Number(drinkQty);

        if (!code) {
            alert("Please enter drink code");
            return;
        }
        if (!isValidMenuCode(code)) {
            alert(`Code "${code}" not found in menu. Please check available codes.`);
            return;
        }
        if (!qty || qty <= 0) {
            alert(" Quantity must be ≥ 1");
            return;
        }

        const drink = {
            code,
            quantity: qty,
            withMilk,
            milkType: withMilk ? milkType : null,
            withSyrup,
            syrupType: withSyrup ? syrupType : null,
            withExtraShot,
            withWhippedCream,
            withCinnamon,
        };

        setCustomDrinks((prev) => [...prev, drink]);

        setDrinkCode("");
        setDrinkQty(1);
        setWithMilk(false);
        setWithSyrup(false);
        setWithExtraShot(false);
        setWithWhippedCream(false);
        setWithCinnamon(false);
    };

    const removeDrink = (index) => {
        setCustomDrinks((prev) => prev.filter((_, i) => i !== index));
    };

    const clearDrinks = () => {
        setCustomDrinks([]);
        setOrderResult(null);
        setOrderError(null);
    };

    const clearAll = () => {
        setSimpleItems([]);
        setCustomDrinks([]);
        setOrderResult(null);
        setOrderError(null);
    };

    const sendAdvancedOrder = async () => {
        if (simpleItems.length === 0 && customDrinks.length === 0) {
            alert("⚠️ Add at least one item or drink");
            return;
        }
        try {
            setSending(true);
            setOrderError(null);
            const payload = {
                items: simpleItems.length > 0 ? simpleItems : null,
                drinks: customDrinks.length > 0 ? customDrinks : null,
            };
            const res = await fetch(`${API_BASE}/order/custom`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP ${res.status}: ${errorText}`);
            }

            const data = await res.json();
            setOrderResult(data);
            alert("✅ Advanced order placed successfully!");

            setSimpleItems([]);
            setCustomDrinks([]);
        } catch (e) {
            console.error("Advanced order error:", e);
            setOrderError(e.message);
            alert("Error sending advanced order: " + e.message);
        } finally {
            setSending(false);
        }
    };

    const totalItemsCount = simpleItems.length + customDrinks.length;

    return (
        <div className="app">
            <h1>☕ CoffeeShop Web</h1>
            <p className="subtitle">
                Backend API: <code>/menu</code> · <code>/order</code> · <code>/order/custom</code>
            </p>

            {/* MENU */}
            <section className="card">
                <div className="card-header">
                    <h2>📋 Menu</h2>
                    <button className="btn secondary" onClick={loadMenu} disabled={loadingMenu}>
                        {loadingMenu ? "Loading..." : " Reload"}
                    </button>
                </div>
                {menuError && (
                    <p className="muted" style={{color: 'var(--accent-red)'}}>
                        Error: {menuError}
                    </p>
                )}
                {Object.keys(menu).length === 0 ? (
                    <p className="muted">No menu loaded yet. Click "Reload" to fetch menu.</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Price (₸)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(menu).map(([code, price]) => (
                            <tr key={code}>
                                <td><strong>{code}</strong></td>
                                <td>{price.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </section>

            <div className="row">
                {/* SIMPLE ITEMS */}
                <section className="card">
                    <h2>🛒 Simple Items</h2>
                    <p className="muted">
                        Add basic items by code: <code>ESP</code>, <code>LAT</code>, <code>CHEESE</code>, etc.
                    </p>

                    <div className="form-row">
                        <label>
                            Item Code
                            <input
                                type="text"
                                value={simpleCode}
                                onChange={(e) => setSimpleCode(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addSimpleItem()}
                                placeholder="ESP, LAT, CHEESE..."
                            />
                        </label>
                        <label>
                            Quantity
                            <input
                                type="number"
                                min={1}
                                value={simpleQty}
                                onChange={(e) => setSimpleQty(e.target.value)}
                            />
                        </label>
                        <button className="btn" onClick={addSimpleItem}>
                            ➕ Add
                        </button>
                    </div>

                    <h3>Current Items ({simpleItems.length})</h3>
                    {simpleItems.length === 0 ? (
                        <p className="muted">No items yet. Add items above.</p>
                    ) : (
                        <>
                            <div className="chips">
                                {simpleItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="chip"
                                        title="Click to remove"
                                        onClick={() => removeSimpleItem(idx)}
                                    >
                                        {item.code} ×{item.quantity}
                                    </div>
                                ))}
                            </div>
                            <div className="form-row">
                                <button
                                    className="btn secondary"
                                    onClick={sendSimpleOrder}
                                    disabled={sending}
                                >
                                    {sending ? "⏳ Sending..." : "📤 Send Simple Order"}
                                </button>
                                <button className="btn danger" onClick={clearSimple}>
                                    🗑️ Clear
                                </button>
                            </div>
                        </>
                    )}
                </section>

                {/* CUSTOM DRINKS */}
                <section className="card">
                    <h2>🎨 Custom Drinks</h2>
                    <p className="muted">
                        Create customized drinks with toppings and add-ons
                    </p>

                    <div className="form-row">
                        <label>
                            Drink Code
                            <input
                                type="text"
                                value={drinkCode}
                                onChange={(e) => setDrinkCode(e.target.value)}
                                placeholder="LAT, ESP, CAP..."
                            />
                        </label>
                        <label>
                            Quantity
                            <input
                                type="number"
                                min={1}
                                value={drinkQty}
                                onChange={(e) => setDrinkQty(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label className="inline">
                            <input
                                type="checkbox"
                                checked={withMilk}
                                onChange={(e) => setWithMilk(e.target.checked)}
                            />
                            🥛 Milk
                        </label>
                        {withMilk && (
                            <select
                                value={milkType}
                                onChange={(e) => setMilkType(e.target.value)}
                            >
                                <option value="WHOLE">Whole</option>
                                <option value="OAT">Oat</option>
                                <option value="ALMOND">Almond</option>
                                <option value="COCONUT">Coconut</option>
                            </select>
                        )}
                    </div>

                    <div className="form-row">
                        <label className="inline">
                            <input
                                type="checkbox"
                                checked={withSyrup}
                                onChange={(e) => setWithSyrup(e.target.checked)}
                            />
                            🍯 Syrup
                        </label>
                        {withSyrup && (
                            <select
                                value={syrupType}
                                onChange={(e) => setSyrupType(e.target.value)}
                            >
                                <option value="CARAMEL">Caramel</option>
                                <option value="VANILLA">Vanilla</option>
                                <option value="HAZELNUT">Hazelnut</option>
                                <option value="CHOCOLATE">Chocolate</option>
                            </select>
                        )}
                    </div>

                    <div className="form-row">
                        <label className="inline">
                            <input
                                type="checkbox"
                                checked={withExtraShot}
                                onChange={(e) => setWithExtraShot(e.target.checked)}
                            />
                            ⚡ Extra Shot
                        </label>
                        <label className="inline">
                            <input
                                type="checkbox"
                                checked={withWhippedCream}
                                onChange={(e) => setWithWhippedCream(e.target.checked)}
                            />
                            🍦 Whipped Cream
                        </label>
                        <label className="inline">
                            <input
                                type="checkbox"
                                checked={withCinnamon}
                                onChange={(e) => setWithCinnamon(e.target.checked)}
                            />
                            🌿 Cinnamon
                        </label>
                    </div>

                    <div className="form-row">
                        <button className="btn" onClick={addDrink}>
                            ➕ Add Drink
                        </button>
                    </div>

                    <h3>Custom Drinks ({customDrinks.length})</h3>
                    {customDrinks.length === 0 ? (
                        <p className="muted">No custom drinks yet.</p>
                    ) : (
                        <>
                            <div className="chips">
                                {customDrinks.map((d, idx) => {
                                    const parts = [`${d.code} ×${d.quantity}`];
                                    if (d.withMilk && d.milkType) parts.push(`🥛${d.milkType}`);
                                    if (d.withSyrup && d.syrupType) parts.push(`🍯${d.syrupType}`);
                                    if (d.withExtraShot) parts.push("⚡");
                                    if (d.withWhippedCream) parts.push("🍦");
                                    if (d.withCinnamon) parts.push("🌿");
                                    return (
                                        <div
                                            key={idx}
                                            className="chip"
                                            title="Click to remove"
                                            onClick={() => removeDrink(idx)}
                                        >
                                            {parts.join(" · ")}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="form-row">
                                <button className="btn danger" onClick={clearDrinks}>
                                    🗑️ Clear Drinks
                                </button>
                            </div>
                        </>
                    )}
                </section>
            </div>

            {/* COMBINED ORDER */}
            {totalItemsCount > 0 && (
                <section className="card">
                    <h2>🛍️ Complete Order ({totalItemsCount} items)</h2>
                    <div className="form-row">
                        <button
                            className="btn secondary"
                            onClick={sendAdvancedOrder}
                            disabled={sending}
                            style={{fontSize: '1rem', padding: '0.75rem 1.5rem'}}
                        >
                            {sending ? "⏳ Processing..." : "📤 Send Complete Order"}
                        </button>
                        <button
                            className="btn danger"
                            onClick={clearAll}
                            style={{fontSize: '1rem', padding: '0.75rem 1.5rem'}}
                        >
                            🗑️ Clear All
                        </button>
                    </div>
                </section>
            )}

            {/* ORDER RESULT */}
            {(orderResult || orderError) && (
                <section className="card">
                    <h2>📋 Order Result</h2>
                    {orderError && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid var(--accent-red)',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginBottom: '1rem',
                            color: 'var(--accent-red)'
                        }}>
                            <strong>❌ Error:</strong> {orderError}
                        </div>
                    )}
                    {orderResult && (
                        <div>
                            <h3>✅ Order Details:</h3>
                            {orderResult.lines && orderResult.lines.length > 0 && (
                                <div style={{marginBottom: '1rem'}}>
                                    {orderResult.lines.map((line, idx) => (
                                        <div key={idx} style={{padding: '0.5rem 0', borderBottom: '1px solid rgba(166, 124, 82, 0.1)'}}>
                                            {line}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid var(--accent-green)',
                                borderRadius: '8px',
                                padding: '1rem',
                                marginTop: '1rem'
                            }}>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                                    <span>Subtotal:</span>
                                    <strong>{orderResult.subtotal?.toFixed(2)} ₸</strong>
                                </div>
                                {orderResult.discount > 0 && (
                                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--accent-green)'}}>
                                        <span>Discount:</span>
                                        <strong>-{orderResult.discount?.toFixed(2)} ₸</strong>
                                    </div>
                                )}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '1.25rem',
                                    paddingTop: '0.5rem',
                                    borderTop: '2px solid var(--accent-green)'
                                }}>
                                    <span>Total:</span>
                                    <strong>{orderResult.total?.toFixed(2)} ₸</strong>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}

export default App;

