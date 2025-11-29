package com.coffeeshop.shop.core.model.dessert;

public class Cheesecake implements Dessert {

    @Override
    public String getDescription() {
        return "Cheesecake";
    }

    @Override
    public double getBaseCost() {
        return 1200;
    }
}
