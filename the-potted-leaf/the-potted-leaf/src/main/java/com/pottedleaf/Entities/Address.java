package com.pottedleaf.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String country;
    private String state;
    private String city;
    private String streetAddress;
    private String zipCode;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
