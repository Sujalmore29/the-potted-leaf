package com.pottedleaf.DTO;

import com.pottedleaf.Entities.Address;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class OrderResponseDTO {

    private Long orderId;
    private String plantName;
    private String potSize;
    private String potColor;
    private String potMaterial;
    private Integer quantity;
    private BigDecimal price;
    private String status;
    private LocalDateTime orderDate;
    private AddressDTO addressDTO;
}
