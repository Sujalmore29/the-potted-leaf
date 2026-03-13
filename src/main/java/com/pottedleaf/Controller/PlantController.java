package com.pottedleaf.Controller;

import com.pottedleaf.DTO.PlantResponseDTO;
import com.pottedleaf.Entities.Plant;
import com.pottedleaf.Entities.User;
import com.pottedleaf.Services.CustomUserDetails;
import com.pottedleaf.Services.PlantService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/plant")
public class PlantController {

    private final PlantService plantService;
    @PostMapping
    public ResponseEntity<?> createPlant(@RequestBody Plant plant){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
            User user = userDetails.getUser();
            if(user.getRole().contains("ADMIN")){
                return ResponseEntity.ok(plantService.savePlant(plant));
            }else {
                return new ResponseEntity<>("You can't add plant,You are not an Admin", HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            log.error("Error occurred while creating plant",e);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/getAllPlants")
    public ResponseEntity<?> getAllPlants() {
        try{
            List<PlantResponseDTO> allPlants = plantService.getAllPlants();
            return new ResponseEntity<>(allPlants,HttpStatus.OK);
        }catch (Exception e){
            log.error("Exception occurred while fetching plants");
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPlantById(@PathVariable Long id){
       try{
           Plant plant = plantService.getPlantById(id);
           return ResponseEntity.ok(plant);
       }catch (Exception e){
           log.error("error occured while fetching planty by id",e);
       }
       return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
