package com.example.app.repository;

import com.example.app.domain.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {
    public List<Book> findByAuthor(String authorName);

}
