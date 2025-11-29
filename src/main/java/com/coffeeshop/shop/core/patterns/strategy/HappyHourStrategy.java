package com.coffeeshop.shop.core.patterns.strategy;


import com.coffeeshop.shop.core.model.order.Order;

//20% discount on all drinks

public class HappyHourStrategy implements PricingStrategy {

    @Override
    public double calculateTotal(Order order) {
        double total = order.getItems().stream()
                .mapToDouble(item -> item.getItem().getBaseCost() * item.getQuantity())
                .sum();
        return total * 0.8;
    }

    @Override
    public String getName() {
        return "Happy Hour 20% discount";
    }
}

