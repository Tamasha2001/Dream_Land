package com.example.land_backend.repository;

import com.example.land_backend.entity.LandRent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandRentRepository extends JpaRepository<LandRent, Integer> {
    // Additional custom query methods (if needed) can be defined here
}
