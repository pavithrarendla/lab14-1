package com.example.practice.service;

import java.util.List;

import com.example.practice.entity.Festival;


public interface FestivalService {
    Festival addFestival(Festival festival);
    List<Festival> getAllFestivals();
    Festival getFestivalById(int id);
    Festival updateFestival(Festival festival);
    void deleteFestivalById(int id);
}
