package com.vendormanagement.controller;

import com.vendormanagement.entity.Service;
import com.vendormanagement.service.ServiceManagementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin
public class ServiceController {

    @Autowired
    private ServiceManagementService serviceManagementService;

    @GetMapping
    public ResponseEntity<Page<Service>> getAllServices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(serviceManagementService.getAllServices(pageable));
    }

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<Page<Service>> getServicesByVendorId(
            @PathVariable Long vendorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(serviceManagementService.getServicesByVendorId(vendorId, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {
        return serviceManagementService.getServiceById(id)
                .map(service -> ResponseEntity.ok().body(service))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/expiring-soon")
    public ResponseEntity<List<Service>> getServicesExpiringSoon() {
        return ResponseEntity.ok(serviceManagementService.getServicesExpiringInNext15Days());
    }

    @GetMapping("/payment-due-soon")
    public ResponseEntity<List<Service>> getServicesWithPaymentDueSoon() {
        return ResponseEntity.ok(serviceManagementService.getServicesWithPaymentDueInNext15Days());
    }

    @PostMapping
    public ResponseEntity<Service> createService(@Valid @RequestBody Service service) {
        return ResponseEntity.ok(serviceManagementService.createService(service));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(@PathVariable Long id, @Valid @RequestBody Service serviceDetails) {
        try {
            return ResponseEntity.ok(serviceManagementService.updateService(id, serviceDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Service> updateServiceStatus(
            @PathVariable Long id, 
            @RequestParam Service.ServiceStatus status) {
        try {
            return ResponseEntity.ok(serviceManagementService.updateServiceStatus(id, status));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        serviceManagementService.deleteService(id);
        return ResponseEntity.ok().build();
    }
}
