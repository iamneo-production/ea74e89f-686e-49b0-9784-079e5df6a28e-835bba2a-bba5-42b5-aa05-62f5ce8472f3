package com.example.plantpro.Service;

import com.example.plantpro.Model.Garden;
import com.example.plantpro.Repository.GardenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GardenService {
    private final GardenRepository gardenRepository;

    @Autowired
    public GardenService(GardenRepository gardenRepository) {
        this.gardenRepository = gardenRepository;
    }

    public List<Garden> getAllGardens() {
        return gardenRepository.findAll();
    }

    public Optional<Garden> getGardenById(Long id) {
        return gardenRepository.findById(id);
    }

    public Garden createGarden(Garden garden) {
        return gardenRepository.save(garden);
    }

    public Garden updateGarden(Long id, Garden updatedGarden) {
        updatedGarden.setId(id);
        return gardenRepository.save(updatedGarden);
    }

    public void deleteGarden(Long id) {
        gardenRepository.deleteById(id);
    }
}
