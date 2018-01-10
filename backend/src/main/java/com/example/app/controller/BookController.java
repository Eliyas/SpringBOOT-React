package com.example.app.controller;

import com.example.app.domain.Book;
import com.example.app.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(value="/book/{authorName}",  method = RequestMethod.GET)
    public List<Book> getRecognition(@PathVariable("authorName") String authorName) {
        return bookService.searchBooks(authorName);
    }

}