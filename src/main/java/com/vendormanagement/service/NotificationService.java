package com.vendormanagement.service;

import com.vendormanagement.entity.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import java.time.LocalDate;
import java.util.List;

@org.springframework.stereotype.Service
public class NotificationService {

    @Autowired
    private ServiceManagementService serviceManagementService;

    @Autowired
    private JavaMailSender mailSender;

    @Scheduled(cron = "0 0 9 * * ?") // Daily at 9 AM
    public void checkAndSendNotifications() {
        checkExpiringServices();
        checkPaymentDueServices();
    }

    private void checkExpiringServices() {
        List<Service> expiringServices = serviceManagementService.getServicesExpiringInNext15Days();
        
        for (Service service : expiringServices) {
            sendExpiryNotification(service);
        }
    }

    private void checkPaymentDueServices() {
        List<Service> paymentDueServices = serviceManagementService.getServicesWithPaymentDueInNext15Days();
        
        for (Service service : paymentDueServices) {
            sendPaymentDueNotification(service);
        }
    }

    private void sendExpiryNotification(Service service) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(service.getVendor().getEmail());
            message.setSubject("Service Expiry Notification - " + service.getServiceName());
            message.setText(String.format(
                "Dear %s,\n\n" +
                "This is a reminder that your service '%s' is expiring on %s.\n" +
                "Please take necessary action to renew the service.\n\n" +
                "Best regards,\n" +
                "Vendor Management System",
                service.getVendor().getContactPerson(),
                service.getServiceName(),
                service.getExpiryDate()
            ));
            
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send expiry notification: " + e.getMessage());
        }
    }

    private void sendPaymentDueNotification(Service service) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(service.getVendor().getEmail());
            message.setSubject("Payment Due Notification - " + service.getServiceName());
            message.setText(String.format(
                "Dear %s,\n\n" +
                "This is a reminder that payment for service '%s' is due on %s.\n" +
                "Amount: $%.2f\n" +
                "Please make the payment by the due date.\n\n" +
                "Best regards,\n" +
                "Vendor Management System",
                service.getVendor().getContactPerson(),
                service.getServiceName(),
                service.getPaymentDueDate(),
                service.getAmount()
            ));
            
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send payment due notification: " + e.getMessage());
        }
    }
}
