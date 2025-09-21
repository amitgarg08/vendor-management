package com.vendormanagement.repository;

import com.vendormanagement.entity.Vendor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    Page<Vendor> findByStatus(Vendor.Status status, Pageable pageable);
    
    @Query("SELECT v FROM Vendor v JOIN v.services s WHERE s.status = 'ACTIVE'")
    Page<Vendor> findVendorsWithActiveServices(Pageable pageable);
}
