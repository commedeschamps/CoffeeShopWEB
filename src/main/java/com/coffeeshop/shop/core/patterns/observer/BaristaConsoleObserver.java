package com.coffeeshop.shop.core.patterns.observer;

import com.coffeeshop.shop.core.model.order.Order;
import com.coffeeshop.shop.core.model.order.OrderItem;
import com.coffeeshop.shop.core.model.order.OrderStatus;


public class BaristaConsoleObserver implements EventListener {

    @Override
    public void update(String eventType, Order order) {
        if (order.getStatus() == OrderStatus.NEW) {
            int drinks = order.getItems().stream()
                    .mapToInt(OrderItem::getQuantity)
                    .sum();
            System.out.println("[Barista] New order: " + drinks + " drinks.");
        } else if (order.getStatus() == OrderStatus.READY) {
            System.out.println("[Barista] Order is READY, please call customer.");
        }
    }
}
