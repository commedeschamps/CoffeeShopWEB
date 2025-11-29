package com.coffeeshop.shop.api;

import java.util.List;

public class OrderResponse {
    private List<String> lines;
    private double subtotal;
    private double discount;
    private double total;

    public OrderResponse(List<String> lines, double subtotal, double discount, double total) {
        this.lines = lines;
        this.subtotal = subtotal;
        this.discount = discount;
        this.total = total;
    }

    public List<String> getLines() {
        return lines;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public double getDiscount() {
        return discount;
    }

    public double getTotal() {
        return total;
    }
}
