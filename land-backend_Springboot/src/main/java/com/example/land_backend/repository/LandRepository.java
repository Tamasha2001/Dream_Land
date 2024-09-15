package com.example.land_backend.repository;

import com.example.land_backend.entity.Land;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LandRepository extends JpaRepository<Land, Integer> {

}

