package com.pottedleaf.Services;

import com.pottedleaf.DTO.AddressDTO;
import com.pottedleaf.DTO.DashboardStatsDTO;
import com.pottedleaf.DTO.OrderResponseDTO;
import com.pottedleaf.DTO.UserDTO;
import com.pottedleaf.Entities.Address;
import com.pottedleaf.Entities.Order;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Repositories.OrderRepository;
import com.pottedleaf.Repositories.PlantRepository;
import com.pottedleaf.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final PlantRepository plantRepository;
    private final OrderRepository orderRepository;
    private final AddressService addressService;
    public DashboardStatsDTO getDashboardStats(){

        return DashboardStatsDTO.builder()
                .totalUsers(userRepository.count())
                .totalPlants(plantRepository.count())
                .totalOrders(orderRepository.count())
                .totalRevenue(getTotalRevenue())
                .build();
    }

    public List<UserDTO> getAllUsers(){
        return userRepository.findAll()
                .stream().map(this::mapToDTO)
                .toList();
    }

    public UserDTO mapToDTO(User user){
        return UserDTO.builder()
                .Id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .contact(user.getContact())
                .gender(user.getGender())
                .role(user.getRole())
                .build();
    }

    public void promoteUser(Long userId){
        User user = userRepository.findById(userId).orElseThrow();
        user.setRole("ADMIN");
        userRepository.save(user);
    }

    public void deleteUser(Long userId){
        userRepository.deleteById(userId);
    }

    public List<OrderResponseDTO> getAllOrders(){
        return orderRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }
    private OrderResponseDTO mapToDTO(Order order){
        return OrderResponseDTO.builder()
                .orderId(order.getId())
                .plantName(order.getPlant().getName())
                .potSize(order.getSelectedSize())
                .potColor(order.getSelectedColor())
                .potMaterial(order.getSelectedMaterial())
                .quantity(order.getQuantity())
                .price(order.getPlant().getPrice())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .addressDTO(getAddress(order.getAddress().getId()))
                .build();
    }

    private AddressDTO getAddress(Long addressId){
        Address address = addressService.getAddressByID(addressId);
        return mapToDTO(address);
    }
    private AddressDTO mapToDTO(Address address){
        return AddressDTO.builder()
                .id(address.getId())
                .type(address.getType())
                .streetAddress(address.getStreetAddress())
                .city(address.getCity())
                .state(address.getState())
                .country(address.getCountry())
                .zipCode(address.getZipCode())
                .build();
    }

    public void updateOrderStatus(Long orderId, String status){
        Order order = orderRepository.findById(orderId)
                .orElseThrow();

        order.setStatus(status);
        orderRepository.save(order);
    }

    public BigDecimal getTotalRevenue() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream()
                .filter(order -> "PAID".equals(order.getStatus()))
                .map(order -> order.getPlant().getPrice())
                .reduce(BigDecimal.ZERO,
                        BigDecimal::add);
    }
}
