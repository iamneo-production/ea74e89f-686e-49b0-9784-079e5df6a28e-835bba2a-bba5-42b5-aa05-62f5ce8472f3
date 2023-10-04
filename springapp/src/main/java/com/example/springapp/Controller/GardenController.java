package com.example.plantpro.Controller;

import com.example.plantpro.Model.Garden;
import com.example.plantpro.Service.GardenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("https://localhost:3000")
@RequestMapping("/api/gardens")
public class GardenController {
    private final GardenService gardenService;

    @Autowired
    public GardenController(GardenService gardenService) {
        this.gardenService = gardenService;
    }

    @GetMapping
    public ResponseEntity<List<Garden>> getAllGardens() {
        List<Garden> gardens = gardenService.getAllGardens();
        return new ResponseEntity<>(gardens, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Garden> getGardenById(@PathVariable Long id) {
        Optional<Garden> garden = gardenService.getGardenById(id);
        return garden.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Garden> createGarden(@RequestBody Garden garden) {
        Garden createdGarden = gardenService.createGarden(garden);
        return new ResponseEntity<>(createdGarden, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Garden> updateGarden(@PathVariable Long id, @RequestBody Garden garden) {
        Garden updatedGarden = gardenService.updateGarden(id, garden);
        return new ResponseEntity<>(updatedGarden, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGarden(@PathVariable Long id) {
        gardenService.deleteGarden(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
