package com.pottedleaf.DTO;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PlantResponseDTO {

    private Long id;
    private String name;
    private String shortDescription;
    private String longDescription;
    private String potSize;
    private String potColor;
    private BigDecimal price;
    private Double rating;
    private String imageUrl;
}
