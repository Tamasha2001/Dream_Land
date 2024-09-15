package com.example.land_backend.controller;

import com.example.land_backend.dto.LandDTO;
import com.example.land_backend.dto.ResponseDTO;
import com.example.land_backend.service.LandService;
import com.example.land_backend.utill.VarList;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/land")
public class LandController {

    @Autowired
    private LandService landService;

    @Autowired
    private ResponseDTO responseDTO;

    @PostMapping("/saveLand")
    public ResponseEntity<ResponseDTO> saveLand(
            @RequestParam("file") MultipartFile file,
            @RequestParam("landDTO") String landDTOJson) {
        try {
            LandDTO landDTO = new ObjectMapper().readValue(landDTOJson, LandDTO.class);
            String res = landService.saveLand(landDTO, file);

            if (VarList.RSP_SUCCESS.equals(res)) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Land saved successfully.");
                responseDTO.setContent(landDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
            } else if (VarList.RSP_DUPLICATED.equals(res)) {
                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("Land already registered.");
                responseDTO.setContent(landDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error saving land.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updateLand")
    public ResponseEntity<ResponseDTO> updateLand(
            @RequestParam("landDTO") String landDTOJson,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            LandDTO landDTO = new ObjectMapper().readValue(landDTOJson, LandDTO.class);
            String result = landService.updateLand(landDTO, file);

            if (VarList.RSP_SUCCESS.equals(result)) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Land updated successfully.");
                responseDTO.setContent(landDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else if (VarList.RSP_NO_DATA_FOUND.equals(result)) {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No land found with the provided ID.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_FOUND);
            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Failed to update land.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllLands")
    public ResponseEntity<ResponseDTO> getAllLands() {
        try {
            List<LandDTO> landDTOList = landService.getAllLands();
            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("Lands retrieved successfully.");
            responseDTO.setContent(landDTOList);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/searchLand/{landID}")
    public ResponseEntity<ResponseDTO> searchLand(@PathVariable int landID) {
        try {
            LandDTO landDTO = landService.searchLand(landID);

            if (landDTO != null) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Land found.");
                responseDTO.setContent(landDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No land found with this ID.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteLand/{landID}")
    public ResponseEntity<ResponseDTO> deleteLand(@PathVariable int landID) {
        try {
            String result = landService.deleteLand(landID);

            if (VarList.RSP_SUCCESS.equals(result)) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Land deleted successfully.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No land found with this ID.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
