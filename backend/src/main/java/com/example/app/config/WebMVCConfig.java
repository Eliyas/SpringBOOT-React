package com.example.app.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Set up static resource path
 *
 */
@Configuration
@ComponentScan({"com.example.app.controller","com.example.app.service","com.example.app.domain"})
public class WebMVCConfig extends WebMvcConfigurerAdapter {
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/static")
				.setViewName("forward:/index.html");
	}
}
