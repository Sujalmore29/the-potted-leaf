package com.pottedleaf.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@Entity
@ToString(exclude = {"user", "plant"})
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rating;

    private String comment;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "plant_id")
    @JsonIgnore
    private Plant plant;
    public Review() {
        this.createdAt = LocalDateTime.now();
    }
}
