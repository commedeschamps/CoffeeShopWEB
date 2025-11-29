package com.coffeeshop.shop.core.patterns.observer;

import com.coffeeshop.shop.core.model.order.Order;

public interface EventListener {
    void update(String eventType, Order order);
}

