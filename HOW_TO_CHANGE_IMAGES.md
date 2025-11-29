# 🖼️ Как изменить изображения товаров

## Вариант 1: Использовать другие фото из Unsplash (бесплатно)

### Шаги:
1. Откройте https://unsplash.com
2. Найдите нужное фото (например "espresso", "latte", "cheesecake")
3. Скопируйте URL фото, добавьте `?w=400` в конец

### Примеры URL для замены:

#### Кофе:
```
Espresso: https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400
Latte: https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400
Cappuccino: https://images.unsplash.com/photo-1534778101976-62847782c213?w=400
Americano: https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400
```

#### Чаи:
```
Black Tea: https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400
Green Tea: https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400
```

#### Десерты:
```
Cheesecake: https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400
Brownie: https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400
Croissant: https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400
```

### Где менять:
Откройте файл: `src/main/java/com/coffeeshop/shop/service/CoffeeShopService.java`

Найдите строки типа:
```java
"https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400"
```

Замените на нужный URL.

---

## Вариант 2: Использовать локальные изображения

### Шаги:

1. **Создайте папку для изображений:**
```
src/main/resources/static/images/
```

2. **Скопируйте ваши изображения туда:**
```
src/main/resources/static/images/
    espresso.jpg
    latte.jpg
    cappuccino.jpg
    cheesecake.jpg
    ...
```

3. **Измените URL в CoffeeShopService.java:**
```java
// Вместо:
"https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400"

// Используйте:
"/images/espresso.jpg"
```

### Полный пример для локальных изображений:
```java
MenuItemDTO espresso = new MenuItemDTO("ESP", "Espresso", 
    "Classic Italian espresso shot", "beverage", 500,
    "/images/espresso.jpg", true);  // ← локальный путь
```

---

## Вариант 3: Использовать свой CDN или внешний сервер

Если у вас есть свой сервер с изображениями:
```java
"https://mycdn.com/coffeeshop/espresso.jpg"
```

---

## 🚀 После изменения:

1. **Перезапустите backend:**
```powershell
cd C:\Users\jungk\Downloads\shop
.\mvnw.cmd spring-boot:run
```

2. **Обновите браузер** (F5 или Ctrl+R)

3. **Изображения обновятся автоматически!**

---

## 💡 Советы:

- **Используйте квадратные изображения** (1:1) для лучшего отображения
- **Оптимальный размер:** 400x400px или 800x800px
- **Формат:** JPG или PNG
- **Добавляйте `?w=400`** к Unsplash URL для оптимизации загрузки

---

## 📝 Пример полной замены:

```java
// Старое:
MenuItemDTO latte = new MenuItemDTO("LAT", "Latte", "Smooth espresso with steamed milk", 
    "beverage", 900, 
    "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400", true);

// Новое (Unsplash):
MenuItemDTO latte = new MenuItemDTO("LAT", "Latte", "Smooth espresso with steamed milk", 
    "beverage", 900, 
    "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400", true);

// ИЛИ новое (локальное):
MenuItemDTO latte = new MenuItemDTO("LAT", "Latte", "Smooth espresso with steamed milk", 
    "beverage", 900, 
    "/images/latte.jpg", true);
```

