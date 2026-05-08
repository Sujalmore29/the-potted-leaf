package com.pottedleaf.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"plant", "user"})
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plant_id",nullable = false)
    @JsonIgnore
    private Plant plant;

    @Column(name = "potSize")
    private String selectedSize;

    @Column(name = "potColor")
    private String selectedColor;

    @Column(name = "potMaterial")
    private String selectedMaterial;

    @Column(name = "payment_id")
    private String paymentId;

    @Column(nullable = false)
    private String status;

    @Column(name = "order_date",nullable = false)
    private LocalDateTime orderDate;

}
