package com.example.app.service;

import com.example.app.domain.Book;
import com.example.app.repository.BookRepository;
import com.example.app.repository.BookSearchRepository;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.util.JSON;
import io.vertx.core.json.JsonArray;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Mohamed Eliyas on 09-01-2018.
 */
@Service
public class BookService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BookService.class);
    final static String booksJsonFile = "Booklist.json";

    @Autowired
    private BookRepository bookRepository;

   @Autowired
    private BookSearchRepository bookSearchRepository;

    @PostConstruct
    private void loadBooks(){
        Mongo mongo = new Mongo("localhost", 27017);
        DB db = mongo.getDB("bookStore");
        DBCollection collection = db.getCollection("book");
        Long count = collection.count();
        if(count > 0) return;
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            File file = new File(classLoader.getResource(booksJsonFile).getFile());
            InputStream inputStream = new FileInputStream(file);
            String jsonContent = IOUtils.toString(inputStream);
            JsonArray bookList = new JsonArray(jsonContent);
            List books = new ArrayList();
            for(Object book : bookList){
                DBObject bookEntity = (DBObject) JSON.parse(String.valueOf(book));
                books.add(bookEntity);
            }
            collection.insert(books);
        } catch (Exception err){
            LOGGER.info("Error on file read ", err);
        }
    }

    @Transactional
    public List<Book> searchBooks(String name){
        List<Book> books = new ArrayList<>(bookSearchRepository.searchBooks(name));
        return books;
    }

}
