package com.vendormanagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class VendorManagementApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(VendorManagementApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		System.out.println("Encoded 'password': " + encoder.encode("password"));
		System.out.println("Encoded 'admin': " + encoder.encode("admin"));


	}
}
