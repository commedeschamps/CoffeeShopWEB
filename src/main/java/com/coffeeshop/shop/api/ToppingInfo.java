package com.coffeeshop.shop.api;

import java.util.List;

public class ToppingInfo {
    private boolean milkAllowed;
    private boolean syrupAllowed;
    private boolean extraShotAllowed;
    private boolean whippedCreamAllowed;
    private boolean cinnamonAllowed;

    private List<String> allowedToppings; // для совместимости с ToppingType

    public ToppingInfo(boolean milkAllowed, boolean syrupAllowed, boolean extraShotAllowed,
                       boolean whippedCreamAllowed, boolean cinnamonAllowed) {
        this.milkAllowed = milkAllowed;
        this.syrupAllowed = syrupAllowed;
        this.extraShotAllowed = extraShotAllowed;
        this.whippedCreamAllowed = whippedCreamAllowed;
        this.cinnamonAllowed = cinnamonAllowed;
    }

    public boolean isMilkAllowed() { return milkAllowed; }
    public void setMilkAllowed(boolean milkAllowed) { this.milkAllowed = milkAllowed; }

    public boolean isSyrupAllowed() { return syrupAllowed; }
    public void setSyrupAllowed(boolean syrupAllowed) { this.syrupAllowed = syrupAllowed; }

    public boolean isExtraShotAllowed() { return extraShotAllowed; }
    public void setExtraShotAllowed(boolean extraShotAllowed) { this.extraShotAllowed = extraShotAllowed; }

    public boolean isWhippedCreamAllowed() { return whippedCreamAllowed; }
    public void setWhippedCreamAllowed(boolean whippedCreamAllowed) { this.whippedCreamAllowed = whippedCreamAllowed; }

    public boolean isCinnamonAllowed() { return cinnamonAllowed; }
    public void setCinnamonAllowed(boolean cinnamonAllowed) { this.cinnamonAllowed = cinnamonAllowed; }

    public List<String> getAllowedToppings() { return allowedToppings; }
    public void setAllowedToppings(List<String> allowedToppings) { this.allowedToppings = allowedToppings; }
}

