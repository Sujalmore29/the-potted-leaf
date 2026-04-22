package com.pottedleaf.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long Id;
    private String name;
    private String email;
    private String contact;
    private String gender;
    private String role;
}
