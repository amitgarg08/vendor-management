package com.vendormanagement.repository;

import com.vendormanagement.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    Page<Service> findByVendorId(Long vendorId, Pageable pageable);
    
    @Query("SELECT s FROM Service s WHERE s.expiryDate BETWEEN :startDate AND :endDate")
    List<Service> findServicesExpiringBetween(@Param("startDate") LocalDate startDate, 
                                            @Param("endDate") LocalDate endDate);
    
    @Query("SELECT s FROM Service s WHERE s.paymentDueDate BETWEEN :startDate AND :endDate")
    List<Service> findServicesWithPaymentDueBetween(@Param("startDate") LocalDate startDate, 
                                                   @Param("endDate") LocalDate endDate);
    
    @Query("SELECT s FROM Service s WHERE s.status = :status")
    Page<Service> findByStatus(@Param("status") Service.ServiceStatus status, Pageable pageable);
}
