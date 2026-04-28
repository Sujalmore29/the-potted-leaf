package com.pottedleaf.Services;

import com.pottedleaf.DTO.UserDTO;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    public void saveUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        userRepository.save(user);
    }
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow();
    }

    public UserDTO mapToDTO(User user){
        return UserDTO.builder()
                .Id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .contact(user.getContact())
                .gender(user.getGender())
                .role(user.getRole())
                .build();
    }

    public void updateUser(User user, UserDTO userDTO){
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setContact(userDTO.getContact());
        user.setGender(userDTO.getGender());
        userRepository.save(user);
    }

    public void changePassword(User user,String password){
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

}
