package com.pottedleaf.DTO;

import com.pottedleaf.Entities.Address;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class OrderResponseDTO {

    private String imageUrl;
    private Long orderId;
    private String plantName;
    private String potSize;
    private String potColor;
    private String potMaterial;
    private Integer quantity;
    private String paymentId;
    private BigDecimal price;
    private String status;
    private Long addressId;
    private String streetAddress;
    private String city;
    private String state;
    private String country;
    private String zipCode;
    private LocalDateTime orderDate;
}
