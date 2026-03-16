package com.pottedleaf.Repositories;

import com.pottedleaf.Entities.Order;
import com.pottedleaf.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUser(User user);

    boolean existsByPaymentId(String getPaymentIntent);
}
