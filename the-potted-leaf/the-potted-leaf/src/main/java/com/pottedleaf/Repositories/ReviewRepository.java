package com.pottedleaf.Repositories;

import com.pottedleaf.Entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPlantId(Long plantId);
    boolean existsByUser_IdAndPlant_Id(Long userId, Long plantId);
}
