package com.pottedleaf.Services;

import com.pottedleaf.DTO.AddToCartDTO;
import com.pottedleaf.DTO.CartItemResponseDTO;
import com.pottedleaf.Entities.Cart;
import com.pottedleaf.Entities.CartItem;
import com.pottedleaf.Entities.Plant;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Repositories.CartItemRepository;
import com.pottedleaf.Repositories.CartRepository;
import com.pottedleaf.Repositories.PlantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final PlantRepository plantRepository;

    public void addToCart(User user, AddToCartDTO dto){
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .user(user)
                            .build();
                    return cartRepository.save(newCart);
                });

        Plant plant = plantRepository.findById(dto.getPlantId()).orElseThrow();

        CartItem item = CartItem.builder()
                .cart(cart)
                .plant(plant)
                .quantity(dto.getQuantity())
                .selectedSize(dto.getSelectedSize())
                .selectedColor(dto.getSelectedColor())
                .selectedMaterial(dto.getSelectedMaterial())
                .build();

        cartItemRepository.save(item);
    }

    private CartItemResponseDTO mapToDTO(CartItem cartItem){
        return CartItemResponseDTO.builder()
                .cartItemId(cartItem.getId())
                .plantId(cartItem.getPlant().getId())
                .plantName(cartItem.getPlant().getName())
                .price(cartItem.getPlant().getPrice())
                .imageUrl(cartItem.getPlant().getImageUrl())
                .quantity(1)
                .selectedSize(cartItem.getSelectedSize())
                .selectedColor(cartItem.getSelectedColor())
                .selectedMaterial(cartItem.getSelectedMaterial())
                .build();
    }
    public List<CartItemResponseDTO> getCart(User user){
        Cart cart = cartRepository.findByUser(user).orElseThrow();

        return cartItemRepository.findByCart(cart)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public void updateQuantity(Long cartItemId,Integer quantity){

        CartItem item = cartItemRepository.findById(cartItemId).orElseThrow(() -> new RuntimeException("Cart item not found"));

        item.setQuantity(quantity);
        cartItemRepository.save(item);

    }

    public void removeItem(Long cartItemId){
        CartItem item = cartItemRepository.findById(cartItemId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        cartItemRepository.delete(item);
    }

    public void clearCart(User user){
        Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new RuntimeException("Cart not found"));
        cartItemRepository.deleteByCart(cart);
    }

}
