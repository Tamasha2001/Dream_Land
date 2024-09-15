package com.example.land_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LandDTO {
    private int LandID;
    private String Address;
    private String Type;
    private int Size;
    private String Description;
    private double Price;
    private String image;
    private int Contact;
    private String postedDate;
}
