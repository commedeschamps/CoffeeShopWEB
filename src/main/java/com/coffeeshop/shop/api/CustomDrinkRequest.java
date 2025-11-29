package com.coffeeshop.shop.api;

public class CustomDrinkRequest {
    private String code;
    private int quantity;

    private boolean withMilk;
    private String milkType;

    private boolean withSyrup;
    private String syrupType;

    private boolean withExtraShot;
    private boolean withWhippedCream;
    private boolean withCinnamon;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isWithMilk() {
        return withMilk;
    }

    public void setWithMilk(boolean withMilk) {
        this.withMilk = withMilk;
    }

    public String getMilkType() {
        return milkType;
    }

    public void setMilkType(String milkType) {
        this.milkType = milkType;
    }

    public boolean isWithSyrup() {
        return withSyrup;
    }

    public void setWithSyrup(boolean withSyrup) {
        this.withSyrup = withSyrup;
    }

    public String getSyrupType() {
        return syrupType;
    }

    public void setSyrupType(String syrupType) {
        this.syrupType = syrupType;
    }

    public boolean isWithExtraShot() {
        return withExtraShot;
    }

    public void setWithExtraShot(boolean withExtraShot) {
        this.withExtraShot = withExtraShot;
    }

    public boolean isWithWhippedCream() {
        return withWhippedCream;
    }

    public void setWithWhippedCream(boolean withWhippedCream) {
        this.withWhippedCream = withWhippedCream;
    }

    public boolean isWithCinnamon() {
        return withCinnamon;
    }

    public void setWithCinnamon(boolean withCinnamon) {
        this.withCinnamon = withCinnamon;
    }
}

