package com.pottedleaf.Services;

import com.pottedleaf.DTO.ReviewDTO;
import com.pottedleaf.DTO.ReviewResponseDTO;
import com.pottedleaf.Entities.Plant;
import com.pottedleaf.Entities.Review;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Repositories.OrderRepository;
import com.pottedleaf.Repositories.PlantRepository;
import com.pottedleaf.Repositories.ReviewRepository;
import com.pottedleaf.Repositories.UserRepository;
import com.stripe.model.Plan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private PlantRepository plantRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;

    public boolean checkAlready_ReviewedOrNot(Long userId,Long plantId) {

        return reviewRepository.existsByUser_IdAndPlant_Id(userId, plantId);
    }

    public boolean hasPurchased(Long userId, Long plantId){
       return orderRepository.existsByUserIdAndPlantId(userId, plantId);
    }

    public Review addReview(Long userId, ReviewDTO reviewdto){

        User user = userRepository.findById(userId).orElseThrow();
        Plant plant = plantRepository.findById(reviewdto.getPlantId()).orElseThrow();

        Review review = new Review();
        review.setUser(user);
        review.setPlant(plant);
        review.setRating(reviewdto.getRating());
        review.setComment(reviewdto.getComment());

        return reviewRepository.save(review);
    }

    public List<ReviewResponseDTO> getReviews(Long plantId){
        List<Review> reviews = reviewRepository.findByPlantId(plantId);

        return reviews.stream().map(r -> new ReviewResponseDTO(
                r.getId(),
                r.getRating(),
                r.getComment(),
                r.getUser().getName()
        )).toList();
    }

    private ReviewDTO mapToDTO(Review review){
        return ReviewDTO.builder()
                .plantId(review.getPlant().getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .build();
    }
}
