package com.example.land_backend.repository;

import com.example.land_backend.entity.Report;
import com.example.land_backend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

}
