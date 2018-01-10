package com.example.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.core.mapping.event.LoggingEventListener;

/**
 *  This configuration is to set up Spring boot and indicate the application property file
 */
@PropertySource("classpath:application.properties")
public class ApplicationConfig {
	public @Bean
	LoggingEventListener mongoEventListener() {
		return new LoggingEventListener();
	}
	
}
