package com.coffeeshop.shop.core.patterns.decorator.decorators;

import com.coffeeshop.shop.core.model.beverage.Beverage;

public class CinnamonDecorator extends BeverageDecorator {
    public CinnamonDecorator(Beverage delegate) { super(delegate); }
    @Override
    public String getDescription() { return delegate.getDescription() + ", cinnamon"; }
    @Override
    public double getBaseCost() { return delegate.getBaseCost() + 120; }
}
