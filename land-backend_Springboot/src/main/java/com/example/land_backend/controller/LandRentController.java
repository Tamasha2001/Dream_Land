package com.example.land_backend.controller;

import com.example.land_backend.dto.LandRentDTO;
import com.example.land_backend.entity.LandRent;
import com.example.land_backend.service.LandRentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/land_rent")
public class LandRentController {

    @Autowired
    private LandRentService landRentService;

    // Create or update LandRent
    @PostMapping
    public ResponseEntity<LandRent> saveLandRent(@RequestBody LandRentDTO landRentDTO) {
        LandRent savedLandRent = landRentService.saveLandRent(landRentDTO);
        return ResponseEntity.ok(savedLandRent);
    }

    // Get all LandRents
    @GetMapping
    public ResponseEntity<List<LandRent>> getAllLandRents() {
        List<LandRent> landRents = landRentService.getAllLandRents();
        return ResponseEntity.ok(landRents);
    }

    // Get a LandRent by ID
    @GetMapping("/{id}")
    public ResponseEntity<LandRent> getLandRentById(@PathVariable int id) {
        return landRentService.getLandRentById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a LandRent by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLandRentById(@PathVariable int id) {
        if (landRentService.getLandRentById(id).isPresent()) {
            landRentService.deleteLandRentById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
