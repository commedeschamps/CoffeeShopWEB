package com.coffeeshop.shop.core.patterns.factory;

import com.coffeeshop.shop.core.model.beverage.Beverage;
import com.coffeeshop.shop.core.model.beverage.seasonal.GingerTea;
import com.coffeeshop.shop.core.model.beverage.seasonal.PumpkinMacchiato;
import com.coffeeshop.shop.core.model.dessert.Dessert;
import com.coffeeshop.shop.core.model.dessert.seasonal.CaramelApplePie;
import com.coffeeshop.shop.core.model.dessert.seasonal.CinnamonRoll;
import com.coffeeshop.shop.core.model.meal.Meal;
import com.coffeeshop.shop.core.model.meal.seasonal.PumpkinSoup;


public class AutumnMenuFactory implements MenuFactory{
    private final MenuFactory normalFactory = new StandardMenuFactory();

    @Override
    public Beverage createBeverage(String code) {
        return switch (code.toUpperCase()){
        case "PUMPKIN_MACCHIATO" -> new PumpkinMacchiato();
        case "GINGER_TEA" -> new GingerTea();
        default -> normalFactory.createBeverage(code);
        };
    }

    @Override
    public Dessert createDessert(String code) {
        return switch (code.toUpperCase()){
            case "CARAMEL_APPLE_PIE" -> new CaramelApplePie();
            case "CINNAMON_ROLL" -> new CinnamonRoll();
            default -> normalFactory.createDessert(code);
        };
    }

    @Override
    public Meal createMeal(String code) {
        return switch (code.toUpperCase()){
            case "PUMPKIN_SOUP" -> new PumpkinSoup();
            default -> normalFactory.createMeal(code);
        };
    }
}
