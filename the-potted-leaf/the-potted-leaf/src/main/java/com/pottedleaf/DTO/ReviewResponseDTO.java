package com.pottedleaf.DTO;

import lombok.*;

@Data
@AllArgsConstructor
public class ReviewResponseDTO {

    private Long id;
    private int rating;
    private String comment;
    private String username;
}
