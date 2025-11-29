package com.coffeeshop.shop.core.model.beverage.seasonal;

import com.coffeeshop.shop.core.model.beverage.Beverage;
import com.coffeeshop.shop.core.patterns.decorator.types.ToppingCompatible;
import com.coffeeshop.shop.core.patterns.decorator.types.ToppingType;

public class PumpkinMacchiato implements Beverage, ToppingCompatible {
    @Override
    public String getDescription() {
        return "Pumpkin Macchiato";
    }

    @Override
    public double getBaseCost() {
        return 1200;
    }

    @Override
    public boolean supports(ToppingType topping) {
        return switch (topping) {
            case SYRUP, CINNAMON -> true;
            case EXTRA_SHOT, MILK, WHIPPED_CREAM  -> false;
            default -> false;
        };
    }
}
