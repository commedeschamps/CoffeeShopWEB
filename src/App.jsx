import { useEffect, useState } from "react";
import "./app.css";

const API_BASE = "http://localhost:8080";

function App() {
    const [menu, setMenu] = useState({});
    const [loadingMenu, setLoadingMenu] = useState(false);

    const [simpleItems, setSimpleItems] = useState([]);
    const [simpleCode, setSimpleCode] = useState("");
    const [simpleQty, setSimpleQty] = useState(1);

    const [customDrinks, setCustomDrinks] = useState([]);
    const [drinkCode, setDrinkCode] = useState("");
    const [drinkQty, setDrinkQty] = useState(1);
    const [withMilk, setWithMilk] = useState(false);
    const [milkType, setMilkType] = useState("REGULAR");
    const [withSyrup, setWithSyrup] = useState(false);
    const [syrupType, setSyrupType] = useState("CARAMEL");
    const [withExtraShot, setWithExtraShot] = useState(false);
    const [withWhippedCream, setWithWhippedCream] = useState(false);
    const [withCinnamon, setWithCinnamon] = useState(false);

    const [orderResult, setOrderResult] = useState(null);
    const [sending, setSending] = useState(false);

    // ===== Загрузка меню =====
    const loadMenu = async () => {
        try {
            setLoadingMenu(true);
            const res = await fetch(`${API_BASE}/menu`);
            if (!res.ok) throw new Error("Failed to load menu");
            const data = await res.json();
            setMenu(data);
        } catch (e) {
            alert("Error loading menu: " + e.message);
        } finally {
            setLoadingMenu(false);
        }
    };

    useEffect(() => {
        loadMenu();
    }, []);

    // ===== Simple items =====
    const addSimpleItem = () => {
        const code = simpleCode.trim().toUpperCase();
        const qty = Number(simpleQty);

        if (!code) {
            alert("Enter item code");
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

    const clearSimple = () => setSimpleItems([]);

    const sendSimpleOrder = async () => {
        if (simpleItems.length === 0) {
            alert("Add at least one simple item");
            return;
        }
        try {
            setSending(true);
            const res = await fetch(`${API_BASE}/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: simpleItems }),
            });
            const data = await res.json();
            setOrderResult(data);
        } catch (e) {
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
            alert("Enter drink code");
            return;
        }
        if (!qty || qty <= 0) {
            alert("Quantity must be ≥ 1");
            return;
        }

        const drink = {
            code,
            quantity: qty,
            withMilk,
            milkType,
            withSyrup,
            syrupType,
            withExtraShot,
            withWhippedCream,
            withCinnamon,
        };

        setCustomDrinks((prev) => [...prev, drink]);

        setDrinkCode("");
        setDrinkQty(1);
    };

    const removeDrink = (index) => {
        setCustomDrinks((prev) => prev.filter((_, i) => i !== index));
    };

    const clearDrinks = () => setCustomDrinks([]);

    const sendAdvancedOrder = async () => {
        if (simpleItems.length === 0 && customDrinks.length === 0) {
            alert("Add at least one item or drink");
            return;
        }
        try {
            setSending(true);
            const payload = {
                items: simpleItems,
                drinks: customDrinks,
            };
            const res = await fetch(`${API_BASE}/order/custom`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            setOrderResult(data);
        } catch (e) {
            alert("Error sending advanced order: " + e.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="app">
            <h1>CoffeeShop Web ☕</h1>
            <p className="subtitle">
                Backend: <code>/menu</code>, <code>/order</code>, <code>/order/custom</code>
            </p>

            {/* MENU */}
            <section className="card">
                <div className="card-header">
                    <h2>Menu</h2>
                    <button className="btn secondary" onClick={loadMenu} disabled={loadingMenu}>
                        {loadingMenu ? "Loading..." : "Reload"}
                    </button>
                </div>
                {Object.keys(menu).length === 0 ? (
                    <p className="muted">No menu loaded yet.</p>
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
                                <td>{code}</td>
                                <td>{price.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </section>

            <div className="row">
                {/* SIMPLE ITEMS */}
                <section className="card col">
                    <h2>Simple items</h2>
                    <p className="muted">
                        Use codes from menu: <code>ESP</code>, <code>LAT</code>, <code>CHEESE</code> etc.
                    </p>

                    <div className="form-row">
                        <label>
                            Code
                            <input
                                type="text"
                                value={simpleCode}
                                onChange={(e) => setSimpleCode(e.target.value)}
                                placeholder="ESP"
                            />
                        </label>
                        <label>
                            Qty
                            <input
                                type="number"
                                min={1}
                                value={simpleQty}
                                onChange={(e) => setSimpleQty(e.target.value)}
                            />
                        </label>
                        <button className="btn" onClick={addSimpleItem}>
                            Add
                        </button>
                        <button className="btn danger" onClick={clearSimple}>
                            Clear
                        </button>
                    </div>

                    <h3>Current items</h3>
                    {simpleItems.length === 0 ? (
                        <p className="muted">No items yet.</p>
                    ) : (
                        <div className="chips">
                            {simpleItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="chip"
                                    title="Click to remove"
                                    onClick={() => removeSimpleItem(idx)}
                                >
                                    {item.code} x{item.quantity}
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        className="btn secondary"
                        onClick={sendSimpleOrder}
                        disabled={sending}
                    >
                        Send simple order (/order)
                    </button>
                </section>

                {/* CUSTOM DRINKS */}
                <section className="card col">
                    <h2>Custom drinks</h2>
                    <p className="muted">
                        Uses <code>addCustomizedDrink(DrinkRequest)</code> → <code>/order/custom</code>
                    </p>

                    <div className="form-row">
                        <label>
                            Drink code
                            <input
                                type="text"
                                value={drinkCode}
                                onChange={(e) => setDrinkCode(e.target.value)}
                                placeholder="LAT"
                            />
                        </label>
                        <label>
                            Qty
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
                            milk
                        </label>
                        <select
                            value={milkType}
                            onChange={(e) => setMilkType(e.target.value)}
                        >
                            <option value="REGULAR">REGULAR</option>
                            <option value="OAT">OAT</option>
                            <option value="SOY">SOY</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <label className="inline">
                            <input
                                type="checkbox"
                                checked={withSyrup}
                                onChange={(e) => setWithSyrup(e.target.checked)}
                            />
                            syrup
                        </label>
                        <select
                            value={syrupType}
                            onChange={(e) => setSyrupType(e.target.value)}
                        >
                            <option value="CARAMEL">CARAMEL</option>
                            <option value="VANILLA">VANILLA</option>
                            <option value="HAZELNUT">HAZELNUT</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <label className="inline">
                            <input
                                type="checkbox"
                                checked={withExtraShot}
                                onChange={(e) => setWithExtraShot(e.target.checked)}
                            />
                            extra shot
                        </label>
                        <label className="inline">
                            <input
                                type="checkbox"
                                checked={withWhippedCream}
                                onChange={(e) => setWithWhippedCream(e.target.checked)}
                            />
                            whipped cream
                        </label>
                        <label className="inline">
                            <input
                                type="checkbox"
                                checked={withCinnamon}
                                onChange={(e) => setWithCinnamon(e.target.checked)}
                            />
                            cinnamon
                        </label>
                    </div>

                    <div className="form-row">
                        <button className="btn" onClick={addDrink}>
                            Add drink
                        </button>
                        <button className="btn danger" onClick={clearDrinks}>
                            Clear drinks
                        </button>
                    </div>

                    <h3>Current custom drinks</h3>
                    {customDrinks.length === 0 ? (
                        <p className="muted">No custom drinks yet.</p>
                    ) : (
                        <div className="chips">
                            {customDrinks.map((d, idx) => {
                                const parts = [`${d.code} x${d.quantity}`];
                                if (d.withMilk) parts.push(`milk=${d.milkType}`);
                                if (d.withSyrup) parts.push(`syrup=${d.syrupType}`);
                                if (d.withExtraShot) parts.push("extra");
                                if (d.withWhippedCream) parts.push("cream");
                                if (d.withCinnamon) parts.push("cinnamon");
                                return (
                                    <div
                                        key={idx}
                                        className="chip"
                                        title="Click to remove"
                                        onClick={() => removeDrink(idx)}
                                    >
                                        {parts.join(" | ")}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <button
                        className="btn secondary"
                        onClick={sendAdvancedOrder}
                        disabled={sending}
                    >
                        Send advanced order (/order/custom)
                    </button>
                </section>
            </div>

            {/* ORDER RESULT */}
            <section className="card">
                <h2>Order result</h2>
                {orderResult ? (
                    <pre>{JSON.stringify(orderResult, null, 2)}</pre>
                ) : (
                    <p className="muted">No order yet.</p>
                )}
            </section>
        </div>
    );
}

export default App;
