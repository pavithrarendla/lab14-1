package com.example.practice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.practice.entity.Festival;


@Repository
public interface FestivalRepository extends JpaRepository<Festival, Integer> {
}
