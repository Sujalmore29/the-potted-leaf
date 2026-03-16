package com.pottedleaf.Services;

import com.pottedleaf.DTO.OrderResponseDTO;
import com.pottedleaf.Entities.Order;
import com.pottedleaf.Entities.Plant;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Repositories.OrderRepository;
import com.pottedleaf.Repositories.PlantRepository;
import com.pottedleaf.Repositories.UserRepository;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {


    private final OrderRepository orderRepository;

    private final UserRepository userRepository;

    private final PlantRepository plantRepository;

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
                .plantName(order.getPlant().getName())
                .price(order.getPlant().getPrice())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .build();
    }

    public Order createOrderAfterPayment(Long userId,Long plantId,String paymentIntent){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Plant plant = plantRepository.findById(plantId).orElseThrow(() -> new RuntimeException("Plant not found"));

        Order order = Order.builder()
                .user(user)
                .plant(plant)
                .paymentId(paymentIntent)
                .status("PAID")
                .orderDate(LocalDateTime.now())
                .build();

        return orderRepository.save(order);
    }

    public boolean existByPaymentId(String getPaymentIntent){
       return orderRepository.existsByPaymentId(getPaymentIntent);
    }
}
