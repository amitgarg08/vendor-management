package com.vendormanagement.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.vendormanagement.repository")
@EnableTransactionManagement
public class JpaConfig {
    // Let Spring Boot auto-configuration handle DataSource, EntityManagerFactory, and TransactionManager
}