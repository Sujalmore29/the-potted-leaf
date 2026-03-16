package com.pottedleaf.Services;

import com.pottedleaf.DTO.PlantResponseDTO;
import com.pottedleaf.Entities.Plant;
import com.pottedleaf.Repositories.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                .potSize(plant.getPotSize())
                .potColor(plant.getPotColor())
                .price(plant.getPrice())
                .imageUrl(plant.getImageUrl())
                .build();
    }

    public Plant getPlantById(Long plant_id){
        return plantRepository.findById(plant_id).orElseThrow(() -> new RuntimeException("Plant not found"));
    }

    public Plant savePlant(Plant plant){
        return plantRepository.save(plant);
    }
}
