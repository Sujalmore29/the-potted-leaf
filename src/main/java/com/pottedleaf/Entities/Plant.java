package com.pottedleaf.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "plants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 150)
    private String name;

    @Column(name = "short_description",columnDefinition = "TEXT")
    private String shortDescription;

    @Column(name = "long_description",columnDefinition = "TEXT")
    private String longDescription;

    @Column(name = "pot_size")
    private String potSize;

    @Column(name = "pot_color")
    private String potColor;

    @Column(nullable = false,precision = 10,scale = 2)
    private BigDecimal price;

    private Double rating;

    @Column(name = "imageUrl")
    private String imageUrl;

    @OneToMany(mappedBy = "plant")
    private List<Order> orders;
}
