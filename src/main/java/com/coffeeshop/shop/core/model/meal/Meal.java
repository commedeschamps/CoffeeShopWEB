package com.coffeeshop.shop.core.model.meal;

import com.coffeeshop.shop.core.model.menu.MenuItem;

public interface Meal extends MenuItem {
    String getDescription();
    double getBaseCost();
}
