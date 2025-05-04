package oop_backend.oop.model;

public class ChatOption {
    private String text;
    private String next;

    public ChatOption() {
    }

    public ChatOption(String text, String next) {
        this.text = text;
        this.next = next;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }
}