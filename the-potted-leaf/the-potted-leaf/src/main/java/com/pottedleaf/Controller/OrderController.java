package com.pottedleaf.Controller;

import com.pottedleaf.DTO.OrderResponseDTO;
import com.pottedleaf.Entities.Order;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Services.CustomUserDetails;
import com.pottedleaf.Services.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/buy/{plantId}")
    public ResponseEntity<?> buyPlant(@PathVariable Long plantId){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            User user = userDetails.getUser();
            orderService.createOrder(user, plantId);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            log.error("Exception Occured while creating order",e);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/getOrders")
    public ResponseEntity<?> myOrders(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            User user = userDetails.getUser();
            List<OrderResponseDTO> orders = orderService.getUserOrders(user);
            return new ResponseEntity<>(orders,HttpStatus.OK);
        }catch (Exception e){
            log.error("Exception occurred while fetching user orders",e);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
