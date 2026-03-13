package com.pottedleaf.Controller;

import com.pottedleaf.Entities.User;
import com.pottedleaf.Services.CustomUserDetails;
import com.pottedleaf.Services.PaymentService;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-session/{plantId}")
    public ResponseEntity<?> createSession(@PathVariable Long plantId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getUser().getId();
        try{
            String url = paymentService.createCheckoutSession(plantId,userId);
            return ResponseEntity.ok(url);
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Payment session creation failed");
        }
    }
}
