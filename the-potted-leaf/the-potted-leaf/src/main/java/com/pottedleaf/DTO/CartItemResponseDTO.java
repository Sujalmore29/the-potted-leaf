package com.pottedleaf.DTO;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CartItemResponseDTO {

    private Long cartItemId;

    private Long plantId;

    private String plantName;

    private String imageUrl;

    private BigDecimal price;

    private Integer quantity;

    private String selectedSize;

    private String selectedColor;

    private String selectedMaterial;

    private Integer stockQuantity;
}
