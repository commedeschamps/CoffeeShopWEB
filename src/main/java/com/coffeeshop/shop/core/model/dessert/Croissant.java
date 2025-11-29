package com.coffeeshop.shop.core.model.dessert;

public class Croissant implements Dessert {
    @Override
    public String getDescription() {
        return "Croissant";
    }

    @Override
    public double getBaseCost() {
        return 990;
    }
}
