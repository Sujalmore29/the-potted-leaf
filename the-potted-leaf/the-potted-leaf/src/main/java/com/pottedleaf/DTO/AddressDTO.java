package com.pottedleaf.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressDTO {
    private Long id;
    private String type;
    private String country;
    private String state;
    private String city;
    private String streetAddress;
    private String zipCode;
}
