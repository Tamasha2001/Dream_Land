package com.example.land_backend.service;

import com.example.land_backend.dto.LandDTO;
import com.example.land_backend.entity.Land;
import com.example.land_backend.repository.LandRepository;
import com.example.land_backend.utill.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class LandService {

    @Autowired
    private LandRepository landRepository;

    @Autowired
    private ModelMapper modelMapper;

    private final Path rootLocation = Paths.get("land-images");

    public String saveLand(LandDTO landDTO, MultipartFile file) {
        try {
            // Handle file upload
            if (file != null && !file.isEmpty()) {
                Files.createDirectories(rootLocation);
                Path destinationFile = this.rootLocation.resolve(Paths.get(file.getOriginalFilename()))
                        .normalize().toAbsolutePath();
                file.transferTo(destinationFile);
                landDTO.setImage(file.getOriginalFilename());
            }

            // Map DTO to entity
            Land land = modelMapper.map(landDTO, Land.class);
            // Set postedDate
            land.setPostedDate(LocalDateTime.now());

            landRepository.save(land);
            return VarList.RSP_SUCCESS;
        } catch (IOException e) {
            e.printStackTrace();
            return VarList.RSP_ERROR;
        }
    }

    public String updateLand(LandDTO landDTO, MultipartFile file) {
        if (landRepository.existsById(landDTO.getLandID())) {
            Land existingLand = landRepository.findById(landDTO.getLandID()).orElse(null);

            if (existingLand != null) {
                // Update fields
                existingLand.setAddress(landDTO.getAddress());
                existingLand.setType(landDTO.getType());
                existingLand.setSize(landDTO.getSize());
                existingLand.setDescription(landDTO.getDescription());
                existingLand.setPrice(landDTO.getPrice());
                existingLand.setContact(landDTO.getContact());

                // Handle file upload
                if (file != null && !file.isEmpty()) {
                    try {
                        Files.createDirectories(rootLocation);
                        Path destinationFile = this.rootLocation.resolve(Paths.get(file.getOriginalFilename()))
                                .normalize().toAbsolutePath();
                        file.transferTo(destinationFile);
                        existingLand.setImage(file.getOriginalFilename());
                    } catch (IOException e) {
                        e.printStackTrace();
                        return VarList.RSP_ERROR;
                    }
                } else {
                    existingLand.setImage(landDTO.getImage());
                }

                landRepository.save(existingLand);
                return VarList.RSP_SUCCESS;
            }
        }
        return VarList.RSP_NO_DATA_FOUND;
    }

    public List<LandDTO> getAllLands() {
        List<Land> landList = landRepository.findAll();
        return modelMapper.map(landList, new TypeToken<ArrayList<LandDTO>>(){}.getType());
    }

    public LandDTO searchLand(int landID) {
        if (landRepository.existsById(landID)) {
            Land land = landRepository.findById(landID).orElse(null);
            return modelMapper.map(land, LandDTO.class);
        } else {
            return null;
        }
    }

    public String deleteLand(int landID) {
        if (landRepository.existsById(landID)) {
            landRepository.deleteById(landID);
            return VarList.RSP_SUCCESS;
        } else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}
