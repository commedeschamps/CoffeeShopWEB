package com.coffeeshop.shop.core.model.beverage;

import com.coffeeshop.shop.core.patterns.decorator.types.ToppingCompatible;
import com.coffeeshop.shop.core.patterns.decorator.types.ToppingType;

public class Cappuccino implements Beverage, ToppingCompatible {

    @Override
    public String getDescription() {
        return "Cappuccino";
    }

    @Override
    public double getBaseCost() {
        return 1100;
    }

    @Override
    public boolean supports(ToppingType topping) {
        return switch (topping) {
            case MILK, SYRUP, EXTRA_SHOT, WHIPPED_CREAM, CINNAMON -> true;
            default -> false;
        };
    }
}
