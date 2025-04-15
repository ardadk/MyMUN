// Yeni oluşturulması gereken dosya: src/main/java/project/oop/models/startModel.java
package project.oop.models;

public class startModel {
    private int id;
    private String countryName;

    public startModel() {
    }

    public startModel(int id, String countryName) {
        this.id = id;
        this.countryName = countryName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }
}