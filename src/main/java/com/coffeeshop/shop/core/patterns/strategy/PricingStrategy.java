package com.coffeeshop.shop.core.patterns.strategy;

import com.coffeeshop.shop.core.model.order.Order;

public interface PricingStrategy {
    double calculateTotal(Order order);
    String getName();
}
