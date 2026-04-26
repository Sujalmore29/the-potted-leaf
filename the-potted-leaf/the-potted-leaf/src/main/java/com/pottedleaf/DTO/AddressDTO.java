package com.pottedleaf.DTO;

import lombok.Data;

@Data
public class AddressDTO {
    private Long id;
    private String country;
    private String state;
    private String city;
    private String streetAddress;
    private String zipCode;
}
