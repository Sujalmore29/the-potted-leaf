package com.pottedleaf.Services;

import com.pottedleaf.DTO.OrderResponseDTO;
import com.pottedleaf.Entities.*;
import com.pottedleaf.Repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {


    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PlantRepository plantRepository;
    private final PlantService plantService;



    public Order createOrder(User user,Long plant_id){
        Plant plant = plantRepository.findById(plant_id).orElseThrow(() -> new RuntimeException("Plant not fount"));

        Order order = Order.builder()
                .user(user)
                .plant(plant)
                .status("SUCCESS")
                .orderDate(LocalDateTime.now())
                .build();

        return orderRepository.save(order);
    }

    public List<OrderResponseDTO> getUserOrders(User user){
        return orderRepository.findByUser(user)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    private OrderResponseDTO mapToDTO(Order order){
        return OrderResponseDTO.builder()
                .orderId(order.getId())
                .imageUrl(order.getPlant().getImageUrl())
                .plantName(order.getPlant().getName())
                .potSize(order.getSelectedSize())
                .potColor(order.getSelectedColor())
                .potMaterial(order.getSelectedMaterial())
                .quantity(order.getQuantity())
                .paymentId(order.getPaymentId())
                .price(order.getPlant().getPrice())
                .status(order.getStatus())
                .addressId(order.getAddress().getId())
                .streetAddress(order.getAddress().getStreetAddress())
                .city(order.getAddress().getCity())
                .state(order.getAddress().getState())
                .country(order.getAddress().getCountry())
                .zipCode(order.getAddress().getZipCode())
                .orderDate(order.getOrderDate())
                .build();
    }

    public void createOrderAfterPayment(Long userId, Long plantId, String size, String color, String material,Integer quantity, Long addressId, String paymentIntent){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Plant plant = plantRepository.findById(plantId).orElseThrow(() -> new RuntimeException("Plant not found"));
        Address address = addressRepository.findById(addressId).orElseThrow(() -> new RuntimeException("Address not found"));

        Order order = Order.builder()
                .user(user)
                .plant(plant)
                .selectedSize(size)
                .selectedColor(color)
                .selectedMaterial(material)
                .paymentId(paymentIntent)
                .quantity(quantity)
                .address(address)
                .status("PAID")
                .orderDate(LocalDateTime.now())
                .build();

        orderRepository.save(order);
    }

    public void createOrdersFromCart(Long userId, Long addressId, String paymentIntent){
        User user = userRepository.findById(userId).orElseThrow();

        Address address = addressRepository.findById(addressId).orElseThrow();

        Cart cart = cartRepository.findByUser(user).orElseThrow();

        List<CartItem> items = cartItemRepository.findByCart(cart);

        for(CartItem item : items){

            Order order = Order.builder()
                    .user(user)
                    .plant(item.getPlant())
                    .address(address)
                    .selectedSize(item.getSelectedSize())
                    .selectedColor(item.getSelectedColor())
                    .selectedMaterial(item.getSelectedMaterial())
                    .quantity(item.getQuantity())
                    .paymentId(paymentIntent)
                    .status("PAID")
                    .orderDate(LocalDateTime.now())
                    .build();

            plantService.reduceStock(item.getPlant().getId(), item.getQuantity());
            orderRepository.save(order);

        }
        cartItemRepository.deleteAll(items);
    }

    public boolean existByPaymentId(String getPaymentIntent){
       return orderRepository.existsByPaymentId(getPaymentIntent);
    }

    public List<OrderResponseDTO> getLatestOrders(User user){
        return orderRepository
                .findByUserOrderByOrderDateDesc(user)
                .stream()
                .limit(5)
                .map(this::mapToDTO)
                .toList();
    }
}
