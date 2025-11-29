package com.coffeeshop.shop.core.model.meal;

public class Lunchbox implements Meal {
    @Override
    public String getDescription() {
        return "Lunchbox";
    }

    @Override
    public double getBaseCost() {
        return 1800;
    }
}
