package com.pottedleaf.Controller;

import com.pottedleaf.DTO.AuthRequest;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Services.CustomUserDetailsServiceImpl;
import com.pottedleaf.Services.UserService;
import com.pottedleaf.Utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsServiceImpl customUserDetailsServiceImpl;
    private final JwtUtils jwtUtils;

    @GetMapping("/health-check")
    public String healthCheck(){
        return "OK";
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
        try{
            userService.saveUser(user);
            return ResponseEntity.ok("User registered");
        }catch (Exception e){
            System.out.println("Exception occured while saving user" + e);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
       try{
           authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
           String token = jwtUtils.generateToken(request.getEmail());
           return new ResponseEntity<>(token,HttpStatus.OK);
       }catch (Exception e){
           log.error("Error Occured while login",e);
       }
       return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
