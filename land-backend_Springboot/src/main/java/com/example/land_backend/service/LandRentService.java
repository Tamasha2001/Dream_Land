package com.example.land_backend.service;

import com.example.land_backend.dto.LandRentDTO;
import com.example.land_backend.entity.LandRent;
import com.example.land_backend.repository.LandRentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class LandRentService {

    @Autowired
    private LandRentRepository landRentRepository;

    // DateTimeFormatter to parse the date string
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    // Create or update LandRent
    public LandRent saveLandRent(LandRentDTO landRentDTO) {
        LandRent landRent;

        // Convert postedDate string to LocalDateTime
        LocalDateTime postedDate = LocalDateTime.parse(landRentDTO.getPostedDate(), DATE_FORMATTER);

        if (landRentDTO.getLandId() > 0) {
            // Update existing LandRent
            Optional<LandRent> existingLandRent = landRentRepository.findById(landRentDTO.getLandId());
            if (existingLandRent.isPresent()) {
                landRent = existingLandRent.get();
                landRent.setAddress(landRentDTO.getAddress());
                landRent.setType(landRentDTO.getType());
                landRent.setSize(landRentDTO.getSize());
                landRent.setDescription(landRentDTO.getDescription());
                landRent.setPrice(landRentDTO.getPrice());
                landRent.setImage(landRentDTO.getImage());
                landRent.setContact(landRentDTO.getContact());
                landRent.setPostedDate(postedDate);
            } else {
                // If not found, create a new LandRent
                landRent = new LandRent(
                        landRentDTO.getLandId(),
                        landRentDTO.getAddress(),
                        landRentDTO.getType(),
                        landRentDTO.getSize(),
                        landRentDTO.getDescription(),
                        landRentDTO.getPrice(),
                        landRentDTO.getImage(),
                        landRentDTO.getContact(),
                        postedDate
                );
            }
        } else {
            // Create new LandRent
            landRent = new LandRent(
                    landRentDTO.getLandId(),
                    landRentDTO.getAddress(),
                    landRentDTO.getType(),
                    landRentDTO.getSize(),
                    landRentDTO.getDescription(),
                    landRentDTO.getPrice(),
                    landRentDTO.getImage(),
                    landRentDTO.getContact(),
                    postedDate
            );
        }

        return landRentRepository.save(landRent);
    }

    // Get all LandRents
    public List<LandRent> getAllLandRents() {
        return landRentRepository.findAll();
    }

    // Get a LandRent by ID
    public Optional<LandRent> getLandRentById(int id) {
        return landRentRepository.findById(id);
    }

    // Delete a LandRent by ID
    public void deleteLandRentById(int id) {
        landRentRepository.deleteById(id);
    }
}
