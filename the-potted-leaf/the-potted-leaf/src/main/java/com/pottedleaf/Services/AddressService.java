package com.pottedleaf.Services;

import com.pottedleaf.DTO.AddressDTO;
import com.pottedleaf.Entities.Address;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Repositories.AddressRepository;
import com.pottedleaf.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public Address addAddress(Long userId, AddressDTO dto){
        User user = userRepository.findById(userId).orElseThrow();

        Address address = Address.builder()
                .country(dto.getCountry())
                .state(dto.getState())
                .city(dto.getCity())
                .streetAddress(dto.getStreetAddress())
                .zipCode(dto.getZipCode())
                .user(user)
                .build();

        return addressRepository.save(address);
    }

    public Address getUserAddresses(Long userId){
        return addressRepository.findByUserId(userId);
    }
}
