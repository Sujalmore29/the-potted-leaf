package com.pottedleaf.DTO;

import lombok.Data;

@Data
public class AddToCartDTO {

    private Long plantId;

    private Integer quantity;

    private String selectedSize;

    private String selectedColor;

    private String selectedMaterial;
}
