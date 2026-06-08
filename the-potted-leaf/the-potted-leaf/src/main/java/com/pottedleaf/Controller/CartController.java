package com.pottedleaf.Controller;

import com.pottedleaf.DTO.AddToCartDTO;
import com.pottedleaf.DTO.UpdateQuantityDTO;
import com.pottedleaf.Services.CartService;
import com.pottedleaf.Services.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {

    private final CartService cartService;

    @PostMapping("/add-to-cart")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartDTO dto) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails detials = (CustomUserDetails) authentication.getPrincipal();

            cartService.addToCart(detials.getUser(),dto);

            return ResponseEntity.ok("Item added to cart");
        }catch (Exception e){
            log.error("Error occurred while adding item to cart",e);
        }
        return ResponseEntity.badRequest().body("Add to cart failed");
    }

    @GetMapping("/get-cart")
    public ResponseEntity<?> getCart(){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails details = (CustomUserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(cartService.getCart(details.getUser()));
        }catch (Exception e){
            log.error("Exception occurred while getting cart items",e);
        }
        return ResponseEntity.badRequest().body("Error while getting cart items");
    }

    @PutMapping("/update-quantity/{cartItemId}")
    public ResponseEntity<?> updateQuantity(@PathVariable Long cartItemId, @RequestBody UpdateQuantityDTO dto){
        try{
            cartService.updateQuantity(cartItemId, dto.getQuantity());
            return ResponseEntity.ok("Quantity updated");
        }catch (Exception e){
            log.error("Quantity update failed",e);

            return ResponseEntity.badRequest().body("Failed to update quantity");
        }
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<?> removeItem(@PathVariable Long cartItemId){
        try{
            cartService.removeItem(cartItemId);
            return ResponseEntity.ok("Item removed");
        } catch (Exception e){
            log.error("Item remove failed",e);
            return ResponseEntity.badRequest().body("Failed to remove item");
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(){

        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails details = (CustomUserDetails) authentication.getPrincipal();
            cartService.clearCart(details.getUser());

            return ResponseEntity.ok("Cart cleared");
        } catch (Exception e){
            log.error("Cart clear failed",e);
            return ResponseEntity.badRequest().body("Failed to clear cart");
        }
    }
}
