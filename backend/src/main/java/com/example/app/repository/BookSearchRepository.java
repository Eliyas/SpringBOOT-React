package com.example.app.repository;

import com.example.app.domain.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

/**
 * Created by Mohamed Eliyas on 09-01-2018.
 */

@Repository
public class BookSearchRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public Collection searchBooks(String text) {
        return mongoTemplate.find(
                Query.query(new Criteria()
                        .orOperator(Criteria.where("author").regex(text, "i"),
                                Criteria.where("name").regex(text, "i"))
                ).limit(15)
                , Book.class);
    }
}
