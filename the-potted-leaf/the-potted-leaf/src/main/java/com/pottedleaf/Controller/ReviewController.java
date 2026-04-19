package com.pottedleaf.Controller;

import com.pottedleaf.DTO.ApiResponse;
import com.pottedleaf.DTO.ReviewDTO;
import com.pottedleaf.DTO.ReviewResponseDTO;
import com.pottedleaf.Entities.Review;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Services.ReviewService;
import com.pottedleaf.Services.UserService;
import com.pottedleaf.Utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
@Slf4j
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/add")
    public ResponseEntity<?> addReview(@RequestBody ReviewDTO reviewDTO, HttpServletRequest request){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userService.getUserByEmail(email);

            if(!reviewService.hasPurchased(user.getId(), reviewDTO.getPlantId())){
                return ResponseEntity.badRequest().body(new ApiResponse(false, "You must purchase before reviewing",null));
            }

            if(!reviewService.checkAlready_ReviewedOrNot(user.getId(), reviewDTO.getPlantId())) {
                return ResponseEntity.badRequest().body(new ApiResponse(false, "You already reviewed this product", null));
            }


            Review review = reviewService.addReview(user.getId(),reviewDTO);

            return ResponseEntity.ok(new ApiResponse(true, "Review added successfully", review));

        } catch (Exception e){
            log.error("Cannot add review",e);
            return ResponseEntity.internalServerError().body(new ApiResponse(false, "Something went wrong",null));
        }
    }

    @GetMapping("/{plantId}")
    public List<ReviewResponseDTO> getReviews(@PathVariable Long plantId){
        return reviewService.getReviews(plantId);
    }
}
