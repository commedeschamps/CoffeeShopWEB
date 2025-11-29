package com.coffeeshop.shop.core;

import com.coffeeshop.shop.core.patterns.adapter.adapters.KaspiPaymentAdapter;
import com.coffeeshop.shop.core.patterns.adapter.standart.PaymentProcessor;
import com.coffeeshop.shop.core.patterns.facade.CoffeeShopFacade;
import com.coffeeshop.shop.core.patterns.factory.MenuFactory;
import com.coffeeshop.shop.core.patterns.factory.StandardMenuFactory;
import com.coffeeshop.shop.core.patterns.strategy.NoDiscountStrategy;
import com.coffeeshop.shop.core.patterns.strategy.PricingStrategy;

public class CoffeeShopConfig {
    public static CoffeeShopFacade createDefault() {
        MenuFactory factory = new StandardMenuFactory();
        PricingStrategy strategy = new NoDiscountStrategy();
        PaymentProcessor payment = new KaspiPaymentAdapter();

        return new CoffeeShopFacade(factory, strategy, payment);
    }
}

