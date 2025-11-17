package com.example.practice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.example.practice.entity.Festival;
import com.example.practice.service.FestivalService;



@RestController
@RequestMapping("/festivalapi")
@CrossOrigin(origins = "*")
public class FestivalController {

    @Autowired
    private FestivalService festivalService;

    @GetMapping("/")
    public String home() {
        return "Festival Management API is running successfully!";
    }

    @PostMapping("/add")
    public ResponseEntity<Festival> addFestival(@RequestBody Festival festival) {
        Festival savedFestival = festivalService.addFestival(festival);
        return new ResponseEntity<>(savedFestival, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Festival>> getAllFestivals() {
        List<Festival> list = festivalService.getAllFestivals();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getFestivalById(@PathVariable int id) {
        Festival fest = festivalService.getFestivalById(id);
        if (fest != null) {
            return new ResponseEntity<>(fest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Festival with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateFestival(@RequestBody Festival festival) {
        Festival existing = festivalService.getFestivalById(festival.getFestivalId());
        if (existing != null) {
            Festival updatedFestival = festivalService.updateFestival(festival);
            return new ResponseEntity<>(updatedFestival, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Festival with ID " + festival.getFestivalId() + " not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFestival(@PathVariable int id) {
        Festival existing = festivalService.getFestivalById(id);
        if (existing != null) {
            festivalService.deleteFestivalById(id);
            return new ResponseEntity<>("Festival with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Festival with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
