// Main JavaScript file for ERP System

// Main application class
class ERPApp {
  constructor() {
    this.currentUser = null;
    this.currentModule = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.loadUserData();
  }

  // Setup global event listeners
  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      this.handleDOMLoaded();
    });

    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('.mobile-menu-btn') || e.target.closest('.mobile-menu-btn')) {
        this.toggleMobileMenu();
      }

      if (e.target.matches('.sidebar-overlay')) {
        this.closeMobileMenu();
      }
    });

    // Modal handling
    document.addEventListener('click', (e) => {
      if (e.target.matches('.modal-overlay')) {
        this.closeModal();
      }

      if (e.target.matches('.modal-close') || e.target.closest('.modal-close')) {
        this.closeModal();
      }
    });

    // Form handling
    document.addEventListener('submit', (e) => {
      this.handleFormSubmit(e);
    });
  }

  // Handle DOM loaded event
  handleDOMLoaded() {
    this.initializePage();
    this.loadPageData();
    this.setupPageSpecificFeatures();
  }

  // Initialize page components
  initializePage() {
    this.setupNavigation();
    this.setupSearch();
    this.setupNotifications();
    this.setupTooltips();
  }

  // Setup navigation
  setupNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.includes(href)) {
        link.classList.add('active');
      }
    });
  }

  // Setup search functionality
  setupSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        this.handleSearch(e.target.value, e.target.dataset.searchType);
      });
    });
  }

  // Handle search
  handleSearch(query, searchType = 'all') {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;

    if (query.length < 2) {
      searchResults.innerHTML = '';
      searchResults.style.display = 'none';
      return;
    }

    // Perform search based on type
    const results = this.performSearch(query, searchType);
    this.displaySearchResults(results, searchResults);
  }

  // Perform search
  performSearch(query, type) {
    const allData = {
      students: fakeData.getStudents(),
      staff: fakeData.getStaff(),
      courses: fakeData.getCourses(),
      books: fakeData.getLibraryBooks()
    };

    let results = [];
    const lowerQuery = query.toLowerCase();

    if (type === 'all' || type === 'students') {
      const studentResults = allData.students.filter(student => 
        student.fullName.toLowerCase().includes(lowerQuery) ||
        student.studentId.toLowerCase().includes(lowerQuery) ||
        student.email.toLowerCase().includes(lowerQuery)
      ).map(student => ({...student, type: 'student'}));
      results = results.concat(studentResults);
    }

    if (type === 'all' || type === 'staff') {
      const staffResults = allData.staff.filter(staff => 
        staff.fullName.toLowerCase().includes(lowerQuery) ||
        staff.employeeId.toLowerCase().includes(lowerQuery) ||
        staff.email.toLowerCase().includes(lowerQuery)
      ).map(staff => ({...staff, type: 'staff'}));
      results = results.concat(staffResults);
    }

    if (type === 'all' || type === 'courses') {
      const courseResults = allData.courses.filter(course => 
        course.courseName.toLowerCase().includes(lowerQuery) ||
        course.courseCode.toLowerCase().includes(lowerQuery)
      ).map(course => ({...course, type: 'course'}));
      results = results.concat(courseResults);
    }

    return results.slice(0, 10); // Limit to 10 results
  }

  // Display search results
  displaySearchResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<div class="p-4 text-center text-secondary">No results found</div>';
    } else {
      container.innerHTML = results.map(result => `
        <div class="search-result-item p-4 border-bottom" data-type="${result.type}" data-id="${result.id}">
          <div class="d-flex align-items-center">
            <div class="search-result-avatar me-3">
              <img src="${result.avatar || '/assets/images/default-avatar.jpg'}" alt="${result.fullName || result.courseName}" class="rounded-circle" width="40" height="40">
            </div>
            <div class="search-result-info">
              <div class="search-result-title fw-bold">${result.fullName || result.courseName}</div>
              <div class="search-result-subtitle text-muted small">
                ${result.type === 'student' ? `Student ID: ${result.studentId}` : 
                  result.type === 'staff' ? `Employee ID: ${result.employeeId}` : 
                  result.type === 'course' ? `Course Code: ${result.courseCode}` : ''}
              </div>
            </div>
            <div class="search-result-type ms-auto">
              <span class="badge badge-${result.type === 'student' ? 'primary' : result.type === 'staff' ? 'success' : 'warning'}">${result.type}</span>
            </div>
          </div>
        </div>
      `).join('');
    }
    
    container.style.display = 'block';

    // Add click handlers for search results
    container.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.dataset.type;
        const id = item.dataset.id;
        this.handleSearchResultClick(type, id);
      });
    });
  }

  // Handle search result click
  handleSearchResultClick(type, id) {
    const routes = {
      student: `/pages/students/detail.html?id=${id}`,
      staff: `/pages/staff/detail.html?id=${id}`,
      course: `/pages/courses/detail.html?id=${id}`
    };

    if (routes[type]) {
      window.location.href = routes[type];
    }
  }

  // Setup notifications
  setupNotifications() {
    this.loadNotifications();
    this.setupNotificationHandlers();
  }

  // Load notifications
  loadNotifications() {
    const notificationBell = document.querySelector('.notification-bell');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    if (!notificationBell || !notificationDropdown) return;

    // Mock notifications
    const notifications = [
      {
        id: 1,
        title: 'New Assignment Posted',
        message: 'CS101 Assignment 3 has been posted',
        time: '2 hours ago',
        type: 'info',
        read: false
      },
      {
        id: 2,
        title: 'Fee Payment Due',
        message: 'Your semester fee payment is due in 3 days',
        time: '1 day ago',
        type: 'warning',
        read: false
      },
      {
        id: 3,
        title: 'Grade Updated',
        message: 'Your grade for Midterm Exam has been updated',
        time: '2 days ago',
        type: 'success',
        read: true
      }
    ];

    // Update notification count
    const unreadCount = notifications.filter(n => !n.read).length;
    const countBadge = notificationBell.querySelector('.notification-count');
    if (countBadge) {
      countBadge.textContent = unreadCount;
      countBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }

    // Update notification dropdown
    const notificationList = notificationDropdown.querySelector('.notification-list');
    if (notificationList) {
      notificationList.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.read ? 'read' : 'unread'}" data-id="${notification.id}">
          <div class="notification-content">
            <div class="notification-title">${notification.title}</div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-time">${notification.time}</div>
          </div>
          <div class="notification-type">
            <span class="badge badge-${notification.type}"></span>
          </div>
        </div>
      `).join('');
    }
  }

  // Setup notification handlers
  setupNotificationHandlers() {
    const notificationBell = document.querySelector('.notification-bell');
    const notificationDropdown = document.querySelector('.notification-dropdown');

    if (notificationBell && notificationDropdown) {
      notificationBell.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('show');
      });

      document.addEventListener('click', () => {
        notificationDropdown.classList.remove('show');
      });
    }
  }

  // Setup tooltips
  setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target, e.target.dataset.tooltip);
      });

      element.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  // Show tooltip
  showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-popup';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
    tooltip.style.zIndex = '9999';
  }

  // Hide tooltip
  hideTooltip() {
    const tooltip = document.querySelector('.tooltip-popup');
    if (tooltip) {
      tooltip.remove();
    }
  }

  // Toggle mobile menu
  toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && overlay) {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    }
  }

  // Close mobile menu
  closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && overlay) {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  }

  // Load page data
  loadPageData() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
      case 'admin-dashboard.html':
        this.loadDashboardData('admin');
        break;
      case 'staff-dashboard.html':
        this.loadDashboardData('staff');
        break;
      case 'student-dashboard.html':
        this.loadDashboardData('student');
        break;
      default:
        this.loadGenericPageData();
    }
  }

  // Load dashboard data
  loadDashboardData(userType) {
    const stats = this.calculateDashboardStats(userType);
    this.updateStatsCards(stats);
    this.loadRecentActivity();
    this.loadUpcomingEvents();
  }

  // Calculate dashboard stats
  calculateDashboardStats(userType) {
    const students = fakeData.getStudents();
    const staff = fakeData.getStaff();
    const courses = fakeData.getCourses();
    const admissions = fakeData.getAdmissions();

    const baseStats = {
      totalStudents: students.filter(s => s.status === 'Active').length,
      totalStaff: staff.filter(s => s.status === 'Active').length,
      totalCourses: courses.filter(c => c.status === 'Active').length,
      pendingAdmissions: admissions.filter(a => a.status === 'Pending').length
    };

    // Customize stats based on user type
    switch (userType) {
      case 'admin':
        return {
          ...baseStats,
          totalRevenue: '$' + (Math.floor(Math.random() * 500000) + 100000).toLocaleString(),
          activeApplications: admissions.filter(a => ['Pending', 'Under Review'].includes(a.status)).length
        };
      case 'staff':
        return {
          myStudents: Math.floor(Math.random() * 150) + 50,
          myCourses: Math.floor(Math.random() * 5) + 2,
          pendingGrades: Math.floor(Math.random() * 20) + 5,
          upcomingClasses: Math.floor(Math.random() * 10) + 3
        };
      case 'student':
        return {
          currentCourses: Math.floor(Math.random() * 6) + 4,
          currentGPA: (Math.random() * 2 + 2).toFixed(2),
          pendingFees: '$' + (Math.floor(Math.random() * 5000) + 500).toLocaleString(),
          libraryBooks: Math.floor(Math.random() * 5) + 1
        };
      default:
        return baseStats;
    }
  }

  // Update stats cards
  updateStatsCards(stats) {
    Object.keys(stats).forEach(key => {
      const element = document.querySelector(`[data-stat="${key}"]`);
      if (element) {
        element.textContent = stats[key];
      }
    });
  }

  // Load recent activity
  loadRecentActivity() {
    const activityContainer = document.querySelector('.recent-activity');
    if (!activityContainer) return;

    const activities = [
      {
        type: 'enrollment',
        message: 'New student enrolled in Computer Science',
        time: '2 hours ago',
        icon: 'user-plus'
      },
      {
        type: 'grade',
        message: 'Grades updated for CS101 Midterm',
        time: '4 hours ago',
        icon: 'edit'
      },
      {
        type: 'payment',
        message: 'Fee payment received from John Doe',
        time: '6 hours ago',
        icon: 'credit-card'
      }
    ];

    activityContainer.innerHTML = activities.map(activity => `
      <div class="activity-item">
        <div class="activity-icon">
          <i class="fas fa-${activity.icon}"></i>
        </div>
        <div class="activity-content">
          <div class="activity-message">${activity.message}</div>
          <div class="activity-time">${activity.time}</div>
        </div>
      </div>
    `).join('');
  }

  // Load upcoming events
  loadUpcomingEvents() {
    const eventsContainer = document.querySelector('.upcoming-events');
    if (!eventsContainer) return;

    const events = [
      {
        title: 'Semester Registration',
        date: '2024-01-15',
        time: '09:00 AM',
        type: 'academic'
      },
      {
        title: 'Faculty Meeting',
        date: '2024-01-16',
        time: '02:00 PM',
        type: 'meeting'
      },
      {
        title: 'Campus Job Fair',
        date: '2024-01-20',
        time: '10:00 AM',
        type: 'event'
      }
    ];

    eventsContainer.innerHTML = events.map(event => `
      <div class="event-item">
        <div class="event-date">
          <div class="event-day">${new Date(event.date).getDate()}</div>
          <div class="event-month">${new Date(event.date).toLocaleDateString('en', {month: 'short'})}</div>
        </div>
        <div class="event-details">
          <div class="event-title">${event.title}</div>
          <div class="event-time">${event.time}</div>
        </div>
        <div class="event-type">
          <span class="badge badge-${event.type === 'academic' ? 'primary' : event.type === 'meeting' ? 'warning' : 'success'}">${event.type}</span>
        </div>
      </div>
    `).join('');
  }

  // Load generic page data
  loadGenericPageData() {
    // Load common data for all pages
    this.loadUserProfile();
  }

  // Load user profile
  loadUserProfile() {
    if (authManager && authManager.isAuthenticated()) {
      const user = authManager.getCurrentUser();
      this.updateUserProfile(user);
    }
  }

  // Update user profile in UI
  updateUserProfile(user) {
    const profileElements = {
      name: document.querySelectorAll('.user-name'),
      email: document.querySelectorAll('.user-email'),
      avatar: document.querySelectorAll('.user-avatar'),
      type: document.querySelectorAll('.user-type')
    };

    profileElements.name.forEach(el => el.textContent = user.name);
    profileElements.email.forEach(el => el.textContent = user.email);
    profileElements.type.forEach(el => el.textContent = user.type.charAt(0).toUpperCase() + user.type.slice(1));
    profileElements.avatar.forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = user.avatar;
        el.alt = user.name;
      }
    });
  }

  // Setup page specific features
  setupPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Data tables
    if (document.querySelector('.data-table')) {
      this.initializeDataTables();
    }

    // Charts
    if (document.querySelector('.chart-container')) {
      this.initializeCharts();
    }

    // Forms
    if (document.querySelector('.form-validation')) {
      this.initializeFormValidation();
    }
  }

  // Initialize data tables
  initializeDataTables() {
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
      this.enhanceTable(table);
    });
  }

  // Enhance table with sorting and filtering
  enhanceTable(table) {
    const headers = table.querySelectorAll('th[data-sortable]');
    headers.forEach(header => {
      header.style.cursor = 'pointer';
      header.addEventListener('click', () => {
        this.sortTable(table, header);
      });
    });
  }

  // Sort table
  sortTable(table, header) {
    const columnIndex = Array.from(header.parentNode.children).indexOf(header);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAscending = !header.classList.contains('sort-asc');

    // Remove previous sort classes
    table.querySelectorAll('th').forEach(th => {
      th.classList.remove('sort-asc', 'sort-desc');
    });

    // Add new sort class
    header.classList.add(isAscending ? 'sort-asc' : 'sort-desc');

    // Sort rows
    rows.sort((a, b) => {
      const cellA = a.children[columnIndex].textContent.trim();
      const cellB = b.children[columnIndex].textContent.trim();
      
      if (isAscending) {
        return cellA.localeCompare(cellB, undefined, { numeric: true });
      } else {
        return cellB.localeCompare(cellA, undefined, { numeric: true });
      }
    });

    // Reorder rows in DOM
    rows.forEach(row => tbody.appendChild(row));
  }

  // Initialize charts (placeholder for chart library integration)
  initializeCharts() {
    // This would integrate with Chart.js or similar library
    console.log('Charts would be initialized here');
  }

  // Initialize form validation
  initializeFormValidation() {
    const forms = document.querySelectorAll('.form-validation');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });
    });
  }

  // Validate form
  validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        this.showFieldError(field, 'This field is required');
        isValid = false;
      } else {
        this.clearFieldError(field);
      }
    });

    return isValid;
  }

  // Show field error
  showFieldError(field, message) {
    field.classList.add('is-invalid');
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error text-danger small mt-1';
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  // Clear field error
  clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  // Handle form submit
  handleFormSubmit(e) {
    const form = e.target;
    if (form.classList.contains('ajax-form')) {
      e.preventDefault();
      this.submitAjaxForm(form);
    }
  }

  // Submit AJAX form
  async submitAjaxForm(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Processing...';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      this.showAlert('Form submitted successfully!', 'success');
      form.reset();
    } catch (error) {
      this.showAlert('An error occurred. Please try again.', 'danger');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  // Show alert
  showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} fade-in`;
    alert.innerHTML = `
      <span>${message}</span>
      <button type="button" class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;

    const container = document.querySelector('.main-content') || document.body;
    container.insertBefore(alert, container.firstChild);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (alert.parentNode) {
        alert.remove();
      }
    }, 5000);
  }

  // Show modal
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  // Close modal
  closeModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
  }

  // Load user data
  loadUserData() {
    if (authManager && authManager.isAuthenticated()) {
      this.currentUser = authManager.getCurrentUser();
    }
  }

  // Utility method to format date
  formatDate(date, format = 'short') {
    const options = {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
      time: { hour: '2-digit', minute: '2-digit' }
    };

    return new Date(date).toLocaleDateString('en-US', options[format]);
  }

  // Utility method to format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }
}

// Initialize the application
const erpApp = new ERPApp();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ERPApp;
}
