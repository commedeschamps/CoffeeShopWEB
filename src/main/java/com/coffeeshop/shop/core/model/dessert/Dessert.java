package com.coffeeshop.shop.core.model.dessert;

import com.coffeeshop.shop.core.model.menu.MenuItem;

public interface Dessert extends MenuItem {
    String getDescription();
    double getBaseCost();
}
