package com.example.app.config;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.WriteConcern;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * Mongo DB Configuration: 
 * Set Mongo DB client address and port
 */
@Configuration
@EnableMongoRepositories("com.example.app.repository")
public class MongoDBConfig extends AbstractMongoConfiguration {

	@Override
	protected String getDatabaseName() {
		return "bookStore";
	}

	@Override
	public Mongo mongo() throws Exception {
		ServerAddress serverAdress = new ServerAddress("localhost", 27017);
		Mongo mongo = new MongoClient(serverAdress);
		mongo.setWriteConcern(WriteConcern.SAFE);
		return mongo;

	}

	@Override
	protected String getMappingBasePackage() {
		return "com.example.app.domain";
	}
	
    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongo(), getDatabaseName());
    }
}
