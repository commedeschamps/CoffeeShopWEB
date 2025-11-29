package com.coffeeshop.shop.core.model.meal;

public class Sandwich implements Meal {
    @Override
    public String getDescription() {
        return "Sandwich";
    }
    @Override
    public double getBaseCost() {
        return 1290;
    }
}
