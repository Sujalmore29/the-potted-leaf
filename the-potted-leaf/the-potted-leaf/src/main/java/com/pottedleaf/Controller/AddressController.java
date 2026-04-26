package com.pottedleaf.Controller;

import com.pottedleaf.DTO.AddressDTO;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Services.AddressService;
import com.pottedleaf.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;
    private final UserService userService;

    @PostMapping("/add-address")
    public ResponseEntity<?> addAdress(@RequestBody AddressDTO dto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(addressService.addAddress(user.getId(), dto));
    }

    @GetMapping("get-address")
    public ResponseEntity<?> getAddress(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(addressService.getUserAddresses(user.getId()));

    }
}
