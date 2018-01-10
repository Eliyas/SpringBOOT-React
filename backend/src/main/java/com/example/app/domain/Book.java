package com.example.app.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "book")
public class Book {

    @Id
    public String id;

    public String author;
    public String series;
    public String name;

    public Book(String name, String author, String series) {
        this.author = author;
        this.series = series;
        this.name = name;
    }


    @Override
    public String toString() {
        return "Colleague{" +
                ", name='" + name + '\'' +
                ", author=" + author + '\'' +
                ",series=" + series +
                '}';
    }


}