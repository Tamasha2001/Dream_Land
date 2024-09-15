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
@Table(name = "Land")
public class Land {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto generate ID - Primary Key in JAVA
    private int LandID;
    private String Address;
    private String Type;
    private int Size;
    private String Description;
    private double Price;
    private int Contact;
    private String image;

    @Column(name = "posted_date", columnDefinition = "TIMESTAMP") // Specifies the column type as TIMESTAMP
    private LocalDateTime postedDate;
}
