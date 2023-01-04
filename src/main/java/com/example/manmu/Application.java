package com.example.manmu;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Slf4j
@EnableJpaAuditing
@SpringBootApplication
public class Application {

//	springapplication.run()가 was실행
	public static void main(String[] args) {
		System.out.println("Application.main@@@@@@@@@@@@@@");
		SpringApplication.run(Application.class, args);
	}

}
