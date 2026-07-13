package com.pottedleaf.Services;

import com.pottedleaf.DTO.PlantResponseDTO;
import com.pottedleaf.Entities.Plant;
import com.pottedleaf.Repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;


    public List<PlantResponseDTO> getAllPlants(){

        return plantRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    private PlantResponseDTO mapToDTO(Plant plant){
        return PlantResponseDTO.builder()
                .id(plant.getId())
                .name(plant.getName())
                .shortDescription(plant.getShortDescription())
                .longDescription(plant.getLongDescription())
                .sizes(Arrays.asList(plant.getSizes().split(",")))
                .colors(Arrays.asList(plant.getColors().split(",")))
                .materials(Arrays.asList(plant.getMaterials().split(",")))
                .price(plant.getPrice())
                .rating(plant.getRating())
                .imageUrl(plant.getImageUrl())
                .stockQuantity(plant.getStockQuantity())
                .build();
    }

    public PlantResponseDTO getPlant(Long plantId){
        Plant plant = plantRepository.getPlantById(plantId);
        return mapToDTO(plant);
    }

    public Plant getPlantById(Long plant_id){
        return plantRepository.findById(plant_id).orElseThrow(() -> new RuntimeException("Plant not found"));
    }

    public Plant savePlant(Plant plant){
        return plantRepository.save(plant);
    }

    @Transactional
    public void reduceStock(Long plantId, Integer quantity){
        Plant plant = plantRepository.findById(plantId).orElseThrow(() -> new RuntimeException("Plant not found"));

        if(plant.getStockQuantity() < quantity){
            throw new RuntimeException("Only " + plant.getStockQuantity() + "plant(s) left in stock");
        }

        plant.setStockQuantity(plant.getStockQuantity() - quantity);
        plantRepository.save(plant);
    }

    public boolean inStock(Long plantId,Integer quantity){
        Plant plant = plantRepository.findById(plantId).orElseThrow(() -> new RuntimeException("Plant not found"));
        return plant.getStockQuantity() >= quantity;
    }

    public Integer remainingStock(Long plantId){
        return plantRepository.findById(plantId).orElseThrow().getStockQuantity();
    }
}
