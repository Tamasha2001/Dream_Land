package com.example.land_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "LandRent")
public class LandRent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int landId;
    private String address;
    private String type;
    private int size;
    private String description;
    private double price;
    private String image;
    private int contact;

    @Column(name = "posted_date", columnDefinition = "TIMESTAMP") // Specifies the column type as TIMESTAMP
    private LocalDateTime postedDate; // Consistent with LocalDateTime in DTO
}
