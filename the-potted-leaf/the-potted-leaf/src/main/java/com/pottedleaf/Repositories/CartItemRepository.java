package com.pottedleaf.Repositories;

import com.pottedleaf.Entities.Cart;
import com.pottedleaf.Entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    List<CartItem> findByCart(Cart cart);

}
