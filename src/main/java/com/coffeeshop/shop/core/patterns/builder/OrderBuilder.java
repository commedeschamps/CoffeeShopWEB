package com.coffeeshop.shop.core.patterns.builder;

import com.coffeeshop.shop.core.model.menu.MenuItem;
import com.coffeeshop.shop.core.model.order.Order;
import com.coffeeshop.shop.core.model.order.OrderItem;

import java.util.ArrayList;
import java.util.List;


public class OrderBuilder {

    private final List<OrderItem> items = new ArrayList<>();

    public OrderBuilder addItem(MenuItem item, int quantity) {
        if (item == null) {
            throw new IllegalArgumentException("Menu Item cannot be null");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be > 0");
        }
        items.add(new OrderItem(item, quantity));
        return this;
    }

    public Order build() {
        if (items.isEmpty()) {
            throw new IllegalStateException("Order must contain at least one item");
        }
        return new Order(items);
    }
}
