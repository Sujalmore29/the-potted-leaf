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

    public Address addAddress(User user, AddressDTO dto){

        Address address = Address.builder()
                .type(dto.getType())
                .country(dto.getCountry())
                .state(dto.getState())
                .city(dto.getCity())
                .streetAddress(dto.getStreetAddress())
                .zipCode(dto.getZipCode())
                .user(user)
                .build();

        return addressRepository.save(address);
    }

    public List<Address> getUserAddresses(Long userId){
        return addressRepository.findByUserId(userId);
    }
    public Address getAddressByID(Long addrId){
        return addressRepository.findById(addrId).orElseThrow();
    }

    public void saveAddress(Address addr){
        addressRepository.save(addr);
    }
}
