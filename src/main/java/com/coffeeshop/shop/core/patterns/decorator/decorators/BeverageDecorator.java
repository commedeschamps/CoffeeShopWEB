package com.coffeeshop.shop.core.patterns.decorator.decorators;

import com.coffeeshop.shop.core.model.beverage.Beverage;
import com.coffeeshop.shop.core.patterns.decorator.types.ToppingCompatible;
import com.coffeeshop.shop.core.patterns.decorator.types.ToppingType;

public abstract class BeverageDecorator implements Beverage, ToppingCompatible {
    protected final Beverage delegate;

    protected BeverageDecorator(Beverage delegate) {
        this.delegate = delegate;
    }

    @Override
    public String getDescription() { return delegate.getDescription(); }

    @Override
    public double getBaseCost() { return delegate.getBaseCost(); }

    @Override
    public boolean supports(ToppingType topping) {
        if (delegate instanceof ToppingCompatible compat) {
            return compat.supports(topping);
        }
        return false;
    }
}
