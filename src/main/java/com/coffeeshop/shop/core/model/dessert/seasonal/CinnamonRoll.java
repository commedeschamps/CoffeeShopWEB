package com.coffeeshop.shop.core.model.dessert.seasonal;

import com.coffeeshop.shop.core.model.dessert.Dessert;

public class CinnamonRoll implements Dessert {
    @Override
    public String getDescription() {
        return "Cinnamon Roll";
    }

    @Override
    public double getBaseCost() {
        return 900;
    }
}
