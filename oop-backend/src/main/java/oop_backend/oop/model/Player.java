package oop_backend.oop.model;

public class Player {
    private int id;
    private String name;
    private String country;

    // Default constructor
    public Player() {
    }

    // Constructor with fields
    public Player(int id, String country) {
        this.id = id;
        this.name = "Player " + id;
        this.country = country;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", country='" + country + '\'' +
                '}';
    }
}