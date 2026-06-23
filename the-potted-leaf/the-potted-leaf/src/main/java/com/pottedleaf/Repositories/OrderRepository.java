package com.pottedleaf.Repositories;

import com.pottedleaf.Entities.Order;
import com.pottedleaf.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUser(User user);

    boolean existsByPaymentId(String getPaymentIntent);

    boolean existsByUserIdAndPlantId(Long userId, Long plantId);

}
