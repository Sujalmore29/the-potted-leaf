package com.pottedleaf.DTO;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class PlantResponseDTO {

    private Long id;
    private String name;
    private String shortDescription;
    private String longDescription;
    private List<String> sizes;
    private List<String> colors;
    private List<String> materials;
    private BigDecimal price;
    private Double rating;
    private String imageUrl;
}
