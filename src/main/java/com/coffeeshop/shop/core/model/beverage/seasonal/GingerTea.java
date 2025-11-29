package com.coffeeshop.shop.core.model.beverage.seasonal;

import com.coffeeshop.shop.core.model.beverage.Beverage;
import com.coffeeshop.shop.core.patterns.decorator.types.ToppingCompatible;
import com.coffeeshop.shop.core.patterns.decorator.types.ToppingType;

public class GingerTea implements Beverage, ToppingCompatible {
    @Override
    public String getDescription() {
        return "Ginger Tea";
    }

    @Override
    public double getBaseCost() {
        return 1000;
    }

    @Override
    public boolean supports(ToppingType topping) {
        return switch (topping) {
            case MILK, SYRUP -> true;
            case EXTRA_SHOT -> false;
            case WHIPPED_CREAM -> false;
            case CINNAMON -> true;

            default -> false;
        };
    }

}
