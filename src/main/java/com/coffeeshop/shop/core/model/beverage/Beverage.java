package com.coffeeshop.shop.core.model.beverage;

import com.coffeeshop.shop.core.model.menu.MenuItem;


public interface Beverage extends MenuItem {
    String getDescription();
    double getBaseCost();
}
