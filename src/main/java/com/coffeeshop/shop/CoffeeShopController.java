package com.coffeeshop.shop;

import com.coffeeshop.shop.api.AdvancedOrderRequest;
import com.coffeeshop.shop.api.MenuItemDTO;
import com.coffeeshop.shop.api.OrderRequest;
import com.coffeeshop.shop.api.OrderResponse;
import com.coffeeshop.shop.service.CoffeeShopService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CoffeeShopController {

    private final CoffeeShopService service = new CoffeeShopService();

    @GetMapping("/menu")
    public Map<String, Double> getMenu() {
        return service.getMenu();
    }

    @PostMapping("/order")
    public OrderResponse createOrder(@RequestBody OrderRequest request) {
        return service.createOrder(request);
    }

    @PostMapping("/order/custom")
    public OrderResponse createAdvancedOrder(@RequestBody AdvancedOrderRequest request) {
        return service.createAdvancedOrder(request);
    }

    @GetMapping("/catalog")
    public List<MenuItemDTO> getCatalog() {
        return service.getFullCatalog();
    }
}
