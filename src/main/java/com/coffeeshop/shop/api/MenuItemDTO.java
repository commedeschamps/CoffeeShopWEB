package com.coffeeshop.shop.api;

public class MenuItemDTO {
    private String code;
    private String name;
    private String description;
    private String category; // "beverage", "dessert", "meal"
    private double price;
    private String imageUrl;
    private boolean customizable;
    private ToppingInfo toppingInfo; // Новое поле для ограничений

    public MenuItemDTO(String code, String name, String description, String category,
                       double price, String imageUrl, boolean customizable) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
        this.customizable = customizable;
    }

    // Getters and setters
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public boolean isCustomizable() { return customizable; }
    public void setCustomizable(boolean customizable) { this.customizable = customizable; }

    public ToppingInfo getToppingInfo() { return toppingInfo; }
    public void setToppingInfo(ToppingInfo toppingInfo) { this.toppingInfo = toppingInfo; }
}
