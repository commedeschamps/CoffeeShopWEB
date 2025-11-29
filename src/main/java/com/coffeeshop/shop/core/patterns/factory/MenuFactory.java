package com.coffeeshop.shop.core.patterns.factory;

import com.coffeeshop.shop.core.model.beverage.Beverage;
import com.coffeeshop.shop.core.model.dessert.Dessert;
import com.coffeeshop.shop.core.model.meal.Meal;

public interface MenuFactory {
    Beverage createBeverage(String code);
    Dessert createDessert(String code);
    Meal createMeal(String code);
}


