package com.example.practice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.practice.entity.Festival;
import com.example.practice.repository.FestivalRepository;



@Service
public class FestivalServiceImpl implements FestivalService {

    @Autowired
    private FestivalRepository festivalRepository;

    @Override
    public Festival addFestival(Festival festival) {
        return festivalRepository.save(festival);
    }

    @Override
    public List<Festival> getAllFestivals() {
        return festivalRepository.findAll();
    }

    @Override
    public Festival getFestivalById(int id) {
        Optional<Festival> opt = festivalRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Festival updateFestival(Festival festival) {
        return festivalRepository.save(festival);
    }

    @Override
    public void deleteFestivalById(int id) {
        festivalRepository.deleteById(id);
    }
}
