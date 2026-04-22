package com.pottedleaf.Controller;

import com.pottedleaf.DTO.UserDTO;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/getUser")
    public ResponseEntity<?> getUser(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userService.getUserByEmail(email);
            UserDTO userDTO = userService.mapToDTO(user);
            return ResponseEntity.ok(userDTO);
        } catch (Exception e){
           log.error("Error occurred while fetching user",e);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userService.getUserByEmail(email);
            userService.updateUser(user,userDTO);
            return ResponseEntity.ok("User updated");
        } catch (Exception e){
            log.error("Exception occurred while updating user");
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody String password){
       try{
           Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
           String email = authentication.getName();
           User user = userService.getUserByEmail(email);
           userService.changePassword(user,password);
           return ResponseEntity.ok("Password change successfully");
       } catch (Exception e){
           log.error("Error occurred while changing password");
       }
       return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
