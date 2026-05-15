package com.pottedleaf.Repositories;

import com.pottedleaf.DTO.PlantResponseDTO;
import com.pottedleaf.Entities.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantRepository extends JpaRepository<Plant,Long> {

    Plant getPlantById(Long plantID);
}
