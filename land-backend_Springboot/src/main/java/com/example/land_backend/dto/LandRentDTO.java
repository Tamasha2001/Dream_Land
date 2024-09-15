package com.example.land_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LandRentDTO {
    private int landId;
    private String address;
    private String type;
    private int size;
    private String description;
    private double price;
    private String image;
    private int contact;
    private String postedDate;
}
