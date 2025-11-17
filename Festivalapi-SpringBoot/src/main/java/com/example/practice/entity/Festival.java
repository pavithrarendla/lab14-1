package com.example.practice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "festival_table")
public class Festival {

    @Id
    @Column(name = "festival_id")
    private int festivalId;

    @Column(name = "festival_name", nullable = false, length = 50)
    private String name;

    @Column(name = "festival_type", nullable = false, length = 30)
    private String type;

    @Column(name = "festival_description", nullable = false, length = 200)
    private String description;

    @Column(name = "festival_duration", nullable = false, length = 20)
    private String duration;

    @Column(name = "festival_country", nullable = false, length = 30)
    private String country;

    // Getters and Setters
    public int getFestivalId() {
        return festivalId;
    }

    public void setFestivalId(int festivalId) {
        this.festivalId = festivalId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "Festival [festivalId=" + festivalId + ", name=" + name + ", type=" + type + 
               ", description=" + description + ", duration=" + duration + ", country=" + country + "]";
    }
}
