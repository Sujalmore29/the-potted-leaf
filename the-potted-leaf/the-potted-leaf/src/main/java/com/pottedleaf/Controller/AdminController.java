package com.pottedleaf.Controller;

import com.pottedleaf.Services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(){
        return ResponseEntity.ok(adminService.getDashboardStats());
    }
    @GetMapping("/users")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/promote/{id}")
    public ResponseEntity<?> promote(@PathVariable Long id){
        adminService.promoteUser(id);
        return ResponseEntity.ok("User promoted");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        adminService.deleteUser(id);
        return ResponseEntity.ok("Deleted");
    }

    @GetMapping("/orders")
    public ResponseEntity<?> orders(){
        return ResponseEntity.ok(adminService.getAllOrders());
    }

    @PutMapping("/order-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,@RequestParam String status){
        adminService.updateOrderStatus(id, status);
        return ResponseEntity.ok().body("Order status updated");
    }
}
