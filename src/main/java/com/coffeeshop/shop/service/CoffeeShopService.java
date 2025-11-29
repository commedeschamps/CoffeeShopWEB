package com.coffeeshop.shop.service;

import com.coffeeshop.shop.api.*;
import com.coffeeshop.shop.core.CoffeeShopConfig;
import com.coffeeshop.shop.core.model.order.Order;
import com.coffeeshop.shop.core.model.order.OrderItem;
import com.coffeeshop.shop.core.model.menu.MenuItem;
import com.coffeeshop.shop.core.patterns.facade.CoffeeShopFacade;
import com.coffeeshop.shop.core.patterns.facade.DrinkRequest;
import com.coffeeshop.shop.core.patterns.decorator.types.MilkType;
import com.coffeeshop.shop.core.patterns.decorator.types.SyrupType;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CoffeeShopService {

    public Map<String, Double> getMenu() {
        CoffeeShopFacade facade = CoffeeShopConfig.createDefault();
        return facade.getMenu();
    }

    public List<MenuItemDTO> getFullCatalog() {
        CoffeeShopFacade facade = CoffeeShopConfig.createDefault();
        List<MenuItemDTO> catalog = new ArrayList<>();

        // Beverages - Coffee (with topping restrictions from actual classes)
        MenuItemDTO espresso = new MenuItemDTO("ESP", "Espresso", "Classic Italian espresso shot", "beverage", 500,
            "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400", true);
        espresso.setToppingInfo(new ToppingInfo(true, true, true, false, true)); // Espresso: milk, syrup, extra, cinnamon
        catalog.add(espresso);

        MenuItemDTO latte = new MenuItemDTO("LAT", "Latte", "Smooth espresso with steamed milk", "beverage", 900,
            "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400", true);
        latte.setToppingInfo(new ToppingInfo(true, true, true, true, true)); // Latte: все доступно
        catalog.add(latte);

        MenuItemDTO cappuccino = new MenuItemDTO("CAP", "Cappuccino", "Espresso with foam and milk", "beverage", 850,
            "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400", true);
        cappuccino.setToppingInfo(new ToppingInfo(true, true, true, true, true)); // Cappuccino: все доступно
        catalog.add(cappuccino);

        MenuItemDTO americano = new MenuItemDTO("AME", "Americano", "Espresso with hot water", "beverage", 900,
            "https://images.unsplash.com/photo-1580661869408-55ab23f2ca6e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW1lcmljYW5vfGVufDB8fDB8fHww", true);
        americano.setToppingInfo(new ToppingInfo(true, true, true, false, true)); // Americano: БЕЗ whipped cream
        catalog.add(americano);

        MenuItemDTO icedLatte = new MenuItemDTO("ICED_LAT", "Iced Latte", "Cold latte with ice", "beverage", 950,
            "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400", true);
        icedLatte.setToppingInfo(new ToppingInfo(true, true, false, true, false)); // Iced: БЕЗ extra shot, БЕЗ cinnamon
        catalog.add(icedLatte);

        // Beverages - Tea & Others (more restricted)
        MenuItemDTO blackTea = new MenuItemDTO("B_TEA", "Black Tea", "Premium black tea", "beverage", 600,
            "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400", true);
        blackTea.setToppingInfo(new ToppingInfo(true, true, false, false, true)); // Tea: milk, syrup, cinnamon ONLY
        catalog.add(blackTea);

        MenuItemDTO greenTea = new MenuItemDTO("G_TEA", "Green Tea", "Refreshing green tea", "beverage", 650,
            "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400", true);
        greenTea.setToppingInfo(new ToppingInfo(false, true, false, false, false)); // Green tea: ТОЛЬКО syrup
        catalog.add(greenTea);

        MenuItemDTO herbalTea = new MenuItemDTO("H_TEA", "Herbal Tea", "Relaxing herbal blend", "beverage", 700,
            "https://images.unsplash.com/photo-1504382103100-db7e92322d39?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", true);
        herbalTea.setToppingInfo(new ToppingInfo(false, true, false, false, false)); // Herbal: ТОЛЬКО syrup
        catalog.add(herbalTea);

        MenuItemDTO hotChocolate = new MenuItemDTO("HOT_CHOC", "Hot Chocolate", "Rich chocolate drink", "beverage", 1000,
            "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400", true);
        hotChocolate.setToppingInfo(new ToppingInfo(true, false, false, true, true)); // Hot Choc: milk, cream, cinnamon
        catalog.add(hotChocolate);

        MenuItemDTO lemonade = new MenuItemDTO("LEM", "Lemonade", "Fresh lemon drink", "beverage", 750,
            "https://images.unsplash.com/photo-1575596510825-f748919a2bf7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", false);
        catalog.add(lemonade);

        // Desserts - не кастомизируются
        catalog.add(new MenuItemDTO("CHEESE", "Cheesecake", "Creamy New York style", "dessert", 1500,
            "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400", false));
        catalog.add(new MenuItemDTO("BROWNIE", "Brownie", "Chocolate brownie", "dessert", 800,
            "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400", false));
        catalog.add(new MenuItemDTO("MUFFIN", "Muffin", "Blueberry muffin", "dessert", 1200,
            "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400", false));
        catalog.add(new MenuItemDTO("CROISSANT", "Croissant", "Buttery French pastry", "dessert", 850,
            "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400", false));

        // Meals - не кастомизируются
        catalog.add(new MenuItemDTO("SANDWICH", "Sandwich", "Fresh club sandwich", "meal", 1290,
            "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400", false));
        catalog.add(new MenuItemDTO("SALAD", "Fresh Salad", "Mixed green salad", "meal", 790,
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", false));
        catalog.add(new MenuItemDTO("LUNCHBOX", "Lunchbox", "Complete meal box", "meal", 1800,
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400", false));

        return catalog;
    }

    public OrderResponse createOrder(OrderRequest request) {
        CoffeeShopFacade facade = CoffeeShopConfig.createDefault();
        facade.startNewOrder();
        if (request.getItems() != null) {
            for (OrderItemRequest itemReq : request.getItems()) {
                facade.addSimpleItem(itemReq.getCode(), itemReq.getQuantity());
            }
        }
        return buildResponse(facade);
    }

    public OrderResponse createAdvancedOrder(AdvancedOrderRequest request) {
        CoffeeShopFacade facade = CoffeeShopConfig.createDefault();
        facade.startNewOrder();
        if (request.getItems() != null) {
            for (OrderItemRequest itemReq : request.getItems()) {
                facade.addSimpleItem(itemReq.getCode(), itemReq.getQuantity());
            }
        }
        if (request.getDrinks() != null) {
            for (CustomDrinkRequest drinkDto : request.getDrinks()) {
                DrinkRequest drinkReq = buildDrinkRequest(drinkDto);
                facade.addCustomizedDrink(drinkReq);
            }
        }
        return buildResponse(facade);
    }

    private DrinkRequest buildDrinkRequest(CustomDrinkRequest dto) {
        MilkType milk = dto.getMilkType() != null ? MilkType.valueOf(dto.getMilkType().toUpperCase()) : MilkType.WHOLE;
        SyrupType syrup = dto.getSyrupType() != null ? SyrupType.valueOf(dto.getSyrupType().toUpperCase()) : SyrupType.VANILLA;
        return new DrinkRequest(
                dto.getCode(),
                dto.isWithMilk(),
                dto.isWithSyrup(),
                syrup,
                milk,
                dto.isWithExtraShot(),
                dto.getQuantity(),
                dto.isWithWhippedCream(),
                dto.isWithCinnamon()
        );
    }

    private OrderResponse buildResponse(CoffeeShopFacade facade) {
        Order order = facade.buildCurrentOrder();
        double subtotal = facade.calculateSubtotal(order);
        double total = facade.calculateTotal(order);
        double discount = subtotal - total;
        List<String> lines = new ArrayList<>();
        for (OrderItem oi : order.getItems()) {
            MenuItem item = oi.getItem();
            int qty = oi.getQuantity();
            double line = item.getBaseCost() * qty;
            lines.add(item.getDescription() + " x" + qty + " = " + String.format("%.2f", line) + " ₸");
        }
        return new OrderResponse(lines, subtotal, discount, total);
    }
}
