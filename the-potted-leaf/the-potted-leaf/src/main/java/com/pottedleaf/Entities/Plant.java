package com.pottedleaf.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "plants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"reviews"})
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
