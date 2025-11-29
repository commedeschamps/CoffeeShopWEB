package com.coffeeshop.shop.api;

import java.util.List;

public class AdvancedOrderRequest {

    private List<OrderItemRequest> items;

    private List<CustomDrinkRequest> drinks;

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }

    public List<CustomDrinkRequest> getDrinks() {
        return drinks;
    }

    public void setDrinks(List<CustomDrinkRequest> drinks) {
        this.drinks = drinks;
    }
}

