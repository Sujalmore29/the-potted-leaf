package com.pottedleaf.Controller;

import com.pottedleaf.DTO.AddToCartDTO;
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
}
