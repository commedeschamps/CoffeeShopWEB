package com.coffeeshop.shop.core.model.dessert;

public class Muffin implements Dessert {
    @Override
    public String getDescription() {
        return "Muffin";
    }

    @Override
    public double getBaseCost() {
        return 1200;
    }
}
