package project.oop.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/test")
        public String deneme(){
            return "deneme";
        }    // Add your test methods here
    }
    
