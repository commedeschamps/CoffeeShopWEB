package com.coffeeshop.shop.core.model.dessert;

public class Brownie implements Dessert {

    @Override
    public String getDescription() {
        return "Brownie";
    }

    @Override
    public double getBaseCost() {
        return 1000;
    }
}
