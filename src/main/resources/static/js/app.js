$(document).ready(function() {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    // Set up AJAX defaults
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        error: function(xhr) {
            if (xhr.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login.html';
            }
        }
    });

    // Global variables
    let currentVendorPage = 0;
    let currentServicePage = 0;
    const pageSize = 10;

    // Navigation
    $('.nav-link').click(function(e) {
        e.preventDefault();
        const section = $(this).data('section');
        
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        
        $('.section').addClass('hidden');
        $('#' + section).removeClass('hidden');
        
        // Load data based on section
        switch(section) {
            case 'vendors':
                loadVendors();
                break;
            case 'services':
                loadServices();
                loadVendorsForDropdown();
                break;
            case 'notifications':
                loadNotifications();
                break;
        }
    });

    // Load initial data
    $('.nav-link[data-section="vendors"]').click();

    // Logout
    $('#logoutBtn').click(function() {
        localStorage.removeItem('token');
        window.location.href = '/login.html';
    });

    // Vendor Management
    function loadVendors(page = 0) {
        $.get(`/api/vendors?page=${page}&size=${pageSize}`)
            .done(function(data) {
                displayVendors(data.content);
                updateVendorPagination(data);
                currentVendorPage = page;
            });
    }

    function displayVendors(vendors) {
        const tbody = $('#vendorsTable tbody');
        tbody.empty();
        
        vendors.forEach(vendor => {
            const row = `
                <tr>
                    <td>${vendor.name}</td>
                    <td>${vendor.contactPerson}</td>
                    <td>${vendor.email}</td>
                    <td>${vendor.phone || 'N/A'}</td>
                    <td><span class="status-${vendor.status.toLowerCase()}">${vendor.status}</span></td>
                    <td>
                        <button class="btn-warning" onclick="editVendor(${vendor.id})">Edit</button>
                        <button class="btn-danger" onclick="deleteVendor(${vendor.id})">Delete</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    function updateVendorPagination(data) {
        $('#vendorPageInfo').text(`Page ${data.number + 1} of ${data.totalPages}`);
        $('#prevVendors').prop('disabled', data.first);
        $('#nextVendors').prop('disabled', data.last);
    }

    // Service Management
    function loadServices(page = 0) {
        $.get(`/api/services?page=${page}&size=${pageSize}`)
            .done(function(data) {
                displayServices(data.content);
                updateServicePagination(data);
                currentServicePage = page;
            });
    }

    function displayServices(services) {
        const tbody = $('#servicesTable tbody');
        tbody.empty();
        
        services.forEach(service => {
            const today = new Date();
            const expiryDate = new Date(service.expiryDate);
            const paymentDue = new Date(service.paymentDueDate);
            const daysToExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            const daysToPayment = Math.ceil((paymentDue - today) / (1000 * 60 * 60 * 24));
            
            let rowClass = '';
            if (daysToExpiry <= 15 && daysToExpiry > 0) {
                rowClass = 'expiring-soon';
            } else if (daysToPayment <= 15 && daysToPayment > 0) {
                rowClass = 'payment-due-soon';
            }
            
            const row = `
                <tr class="${rowClass}">
                    <td>${service.serviceName}</td>
                    <td>${service.vendor ? service.vendor.name : 'N/A'}</td>
                    <td>${service.startDate}</td>
                    <td>${service.expiryDate}</td>
                    <td>${service.paymentDueDate}</td>
                    <td>$${service.amount}</td>
                    <td><span class="status-${service.status.toLowerCase().replace('_', '-')}">${service.status.replace('_', ' ')}</span></td>
                    <td>
                        <button class="btn-warning" onclick="editService(${service.id})">Edit</button>
                        <button class="btn-danger" onclick="deleteService(${service.id})">Delete</button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    function updateServicePagination(data) {
        $('#servicePageInfo').text(`Page ${data.number + 1} of ${data.totalPages}`);
        $('#prevServices').prop('disabled', data.first);
        $('#nextServices').prop('disabled', data.last);
    }

    // Load vendors for dropdown
    function loadVendorsForDropdown() {
        $.get('/api/vendors?size=1000')
            .done(function(data) {
                const select = $('#serviceVendor');
                const filterSelect = $('#serviceVendorFilter');
                
                select.empty().append('<option value="">Select Vendor</option>');
                filterSelect.empty().append('<option value="">All Vendors</option>');
                
                data.content.forEach(vendor => {
                    select.append(`<option value="${vendor.id}">${vendor.name}</option>`);
                    filterSelect.append(`<option value="${vendor.id}">${vendor.name}</option>`);
                });
            });
    }

    // Notification Management
    function loadNotifications() {
        loadExpiringServices();
        loadPaymentDueServices();
    }

    function loadExpiringServices() {
        $.get('/api/services/expiring-soon')
            .done(function(services) {
                displayExpiringServices(services);
            });
    }

    function loadPaymentDueServices() {
        $.get('/api/services/payment-due-soon')
            .done(function(services) {
                displayPaymentDueServices(services);
            });
    }

    function displayExpiringServices(services) {
        const tbody = $('#expiringServicesTable tbody');
        tbody.empty();
        
        services.forEach(service => {
            const today = new Date();
            const expiryDate = new Date(service.expiryDate);
            const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            
            const row = `
                <tr class="expiring-soon">
                    <td>${service.serviceName}</td>
                    <td>${service.vendor ? service.vendor.name : 'N/A'}</td>
                    <td>${service.expiryDate}</td>
                    <td>${daysLeft}</td>
                    <td><span class="status-${service.status.toLowerCase().replace('_', '-')}">${service.status.replace('_', ' ')}</span></td>
                </tr>
            `;
            tbody.append(row);
        });
        
        if (services.length === 0) {
            tbody.append('<tr><td colspan="5" style="text-align: center;">No services expiring soon</td></tr>');
        }
    }

    function displayPaymentDueServices(services) {
        const tbody = $('#paymentDueServicesTable tbody');
        tbody.empty();
        
        services.forEach(service => {
            const today = new Date();
            const paymentDue = new Date(service.paymentDueDate);
            const daysLeft = Math.ceil((paymentDue - today) / (1000 * 60 * 60 * 24));
            
            const row = `
                <tr class="payment-due-soon">
                    <td>${service.serviceName}</td>
                    <td>${service.vendor ? service.vendor.name : 'N/A'}</td>
                    <td>${service.paymentDueDate}</td>
                    <td>$${service.amount}</td>
                    <td>${daysLeft}</td>
                    <td><span class="status-${service.status.toLowerCase().replace('_', '-')}">${service.status.replace('_', ' ')}</span></td>
                </tr>
            `;
            tbody.append(row);
        });
        
        if (services.length === 0) {
            tbody.append('<tr><td colspan="6" style="text-align: center;">No payments due soon</td></tr>');
        }
    }

    // Event Handlers
    $('#prevVendors').click(() => loadVendors(currentVendorPage - 1));
    $('#nextVendors').click(() => loadVendors(currentVendorPage + 1));
    $('#prevServices').click(() => loadServices(currentServicePage - 1));
    $('#nextServices').click(() => loadServices(currentServicePage + 1));

    // Tab functionality
    $('.tab-btn').click(function() {
        const tab = $(this).data('tab');
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').addClass('hidden');
        $('#' + tab).removeClass('hidden');
    });

    // Modal functionality
    $('#addVendorBtn').click(function() {
        $('#vendorModalTitle').text('Add Vendor');
        $('#vendorForm')[0].reset();
        $('#vendorId').val('');
        $('#vendorModal').show();
    });

    $('#addServiceBtn').click(function() {
        $('#serviceModalTitle').text('Add Service');
        $('#serviceForm')[0].reset();
        $('#serviceId').val('');
        $('#serviceModal').show();
    });

    $('.close').click(function() {
        $('.modal').hide();
    });

    $(window).click(function(event) {
        if ($(event.target).hasClass('modal')) {
            $('.modal').hide();
        }
    });

    // Form submissions
    $('#vendorForm').submit(function(e) {
        e.preventDefault();
        
        const vendorData = {
            name: $('#vendorName').val(),
            contactPerson: $('#vendorContactPerson').val(),
            email: $('#vendorEmail').val(),
            phone: $('#vendorPhone').val(),
            status: $('#vendorStatus').val()
        };

        const vendorId = $('#vendorId').val();
        const url = vendorId ? `/api/vendors/${vendorId}` : '/api/vendors';
        const method = vendorId ? 'PUT' : 'POST';

        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: JSON.stringify(vendorData),
            success: function() {
                $('#vendorModal').hide();
                loadVendors(currentVendorPage);
                alert(vendorId ? 'Vendor updated successfully!' : 'Vendor created successfully!');
            },
            error: function() {
                alert('Error saving vendor');
            }
        });
    });

    $('#serviceForm').submit(function(e) {
        e.preventDefault();
        
        const serviceData = {
            serviceName: $('#serviceName').val(),
            startDate: $('#serviceStartDate').val(),
            expiryDate: $('#serviceExpiryDate').val(),
            paymentDueDate: $('#servicePaymentDue').val(),
            amount: $('#serviceAmount').val(),
            status: $('#serviceStatus').val(),
            vendor: {
                id: $('#serviceVendor').val()
            }
        };

        const serviceId = $('#serviceId').val();
        const url = serviceId ? `/api/services/${serviceId}` : '/api/services';
        const method = serviceId ? 'PUT' : 'POST';

        $.ajax({
            url: url,
            method: method,
            contentType: 'application/json',
            data: JSON.stringify(serviceData),
            success: function() {
                $('#serviceModal').hide();
                loadServices(currentServicePage);
                alert(serviceId ? 'Service updated successfully!' : 'Service created successfully!');
            },
            error: function() {
                alert('Error saving service');
            }
        });
    });

    // Global functions for edit/delete operations
    window.editVendor = function(id) {
        $.get(`/api/vendors/${id}`)
            .done(function(vendor) {
                $('#vendorModalTitle').text('Edit Vendor');
                $('#vendorId').val(vendor.id);
                $('#vendorName').val(vendor.name);
                $('#vendorContactPerson').val(vendor.contactPerson);
                $('#vendorEmail').val(vendor.email);
                $('#vendorPhone').val(vendor.phone);
                $('#vendorStatus').val(vendor.status);
                $('#vendorModal').show();
            });
    };

    window.deleteVendor = function(id) {
        if (confirm('Are you sure you want to delete this vendor?')) {
            $.ajax({
                url: `/api/vendors/${id}`,
                method: 'DELETE',
                success: function() {
                    loadVendors(currentVendorPage);
                    alert('Vendor deleted successfully!');
                },
                error: function() {
                    alert('Error deleting vendor');
                }
            });
        }
    };

    window.editService = function(id) {
        $.get(`/api/services/${id}`)
            .done(function(service) {
                $('#serviceModalTitle').text('Edit Service');
                $('#serviceId').val(service.id);
                $('#serviceName').val(service.serviceName);
                $('#serviceStartDate').val(service.startDate);
                $('#serviceExpiryDate').val(service.expiryDate);
                $('#servicePaymentDue').val(service.paymentDueDate);
                $('#serviceAmount').val(service.amount);
                $('#serviceStatus').val(service.status);
                if (service.vendor) {
                    $('#serviceVendor').val(service.vendor.id);
                }
                $('#serviceModal').show();
            });
    };

    window.deleteService = function(id) {
        if (confirm('Are you sure you want to delete this service?')) {
            $.ajax({
                url: `/api/services/${id}`,
                method: 'DELETE',
                success: function() {
                    loadServices(currentServicePage);
                    alert('Service deleted successfully!');
                },
                error: function() {
                    alert('Error deleting service');
                }
            });
        }
    };
});
