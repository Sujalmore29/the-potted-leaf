package com.pottedleaf.DTO;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class OrderResponseDTO {

    private Long orderId;
    private String plantName;
    private BigDecimal price;
    private String status;
    private LocalDateTime orderDate;
}
