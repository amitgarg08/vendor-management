package com.vendormanagement.service;

import com.vendormanagement.entity.Service;
import com.vendormanagement.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceManagementService {

    @Autowired
    private ServiceRepository serviceRepository;

    public Page<Service> getAllServices(Pageable pageable) {
        return serviceRepository.findAll(pageable);
    }

    public Page<Service> getServicesByVendorId(Long vendorId, Pageable pageable) {
        return serviceRepository.findByVendorId(vendorId, pageable);
    }

    public Optional<Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service serviceDetails) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));

        service.setServiceName(serviceDetails.getServiceName());
        service.setStartDate(serviceDetails.getStartDate());
        service.setExpiryDate(serviceDetails.getExpiryDate());
        service.setPaymentDueDate(serviceDetails.getPaymentDueDate());
        service.setAmount(serviceDetails.getAmount());
        service.setStatus(serviceDetails.getStatus());

        return serviceRepository.save(service);
    }

    public Service updateServiceStatus(Long id, Service.ServiceStatus status) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
        
        service.setStatus(status);
        return serviceRepository.save(service);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    public List<Service> getServicesExpiringInNext15Days() {
        LocalDate today = LocalDate.now();
        LocalDate fifteenDaysLater = today.plusDays(15);
        return serviceRepository.findServicesExpiringBetween(today, fifteenDaysLater);
    }

    public List<Service> getServicesWithPaymentDueInNext15Days() {
        LocalDate today = LocalDate.now();
        LocalDate fifteenDaysLater = today.plusDays(15);
        return serviceRepository.findServicesWithPaymentDueBetween(today, fifteenDaysLater);
    }
}
