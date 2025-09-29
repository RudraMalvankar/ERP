// Authentication Management for ERP System

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('erpUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.updateUI();
    }
  }

  // Login function
  async login(email, password, userType) {
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await this.mockLogin(email, password, userType);
      
      if (response.success) {
        this.currentUser = response.user;
        localStorage.setItem('erpUser', JSON.stringify(this.currentUser));
        this.updateUI();
        this.redirectToDashboard();
        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }

  // Mock login for demo purposes
  mockLogin(email, password, userType) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Demo users
        const users = {
          'admin@college.edu': {
            id: 1,
            name: 'Admin User',
            email: 'admin@college.edu',
            type: 'admin',
            avatar: '/assets/images/admin-avatar.jpg',
            permissions: ['all']
          },
          'staff@college.edu': {
            id: 2,
            name: 'Staff Member',
            email: 'staff@college.edu',
            type: 'staff',
            avatar: '/assets/images/staff-avatar.jpg',
            permissions: ['students', 'courses', 'grades']
          },
          'student@college.edu': {
            id: 3,
            name: 'John Student',
            email: 'student@college.edu',
            type: 'student',
            studentId: 'STU2023001',
            avatar: '/assets/images/student-avatar.jpg',
            permissions: ['profile', 'grades', 'fees', 'library']
          }
        };

        const user = users[email];
        if (user && password === 'password123') {
          resolve({ success: true, user: user });
        } else {
          resolve({ success: false, message: 'Invalid credentials' });
        }
      }, 1000);
    });
  }

  // Logout function
  logout() {
    this.currentUser = null;
    localStorage.removeItem('erpUser');
    window.location.href = '/login.html';
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null;
  }

  // Check user permissions
  hasPermission(permission) {
    if (!this.currentUser) return false;
    return this.currentUser.permissions.includes('all') || 
           this.currentUser.permissions.includes(permission);
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Update UI based on authentication state
  updateUI() {
    if (this.currentUser) {
      // Update user info in navigation
      const userNameElements = document.querySelectorAll('.user-name');
      const userEmailElements = document.querySelectorAll('.user-email');
      const userAvatarElements = document.querySelectorAll('.user-avatar');

      userNameElements.forEach(el => el.textContent = this.currentUser.name);
      userEmailElements.forEach(el => el.textContent = this.currentUser.email);
      userAvatarElements.forEach(el => {
        if (el.tagName === 'IMG') {
          el.src = this.currentUser.avatar;
          el.alt = this.currentUser.name;
        }
      });

      // Show/hide elements based on user type
      this.updatePermissionBasedUI();
    }
  }

  // Update UI elements based on user permissions
  updatePermissionBasedUI() {
    const restrictedElements = document.querySelectorAll('[data-permission]');
    restrictedElements.forEach(element => {
      const requiredPermission = element.getAttribute('data-permission');
      if (this.hasPermission(requiredPermission)) {
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    });
  }

  // Redirect to appropriate dashboard
  redirectToDashboard() {
    const userType = this.currentUser.type;
    const dashboardUrls = {
      'admin': '/pages/admin-dashboard.html',
      'staff': '/pages/staff-dashboard.html',
      'student': '/pages/student-dashboard.html'
    };

    window.location.href = dashboardUrls[userType] || '/pages/student-dashboard.html';
  }

  // Protect routes
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '/login.html';
      return false;
    }
    return true;
  }

  // Require specific permission
  requirePermission(permission) {
    if (!this.requireAuth()) return false;
    
    if (!this.hasPermission(permission)) {
      this.showAccessDenied();
      return false;
    }
    return true;
  }

  // Show access denied message
  showAccessDenied() {
    const alert = document.createElement('div');
    alert.className = 'alert alert-danger';
    alert.innerHTML = `
      <strong>Access Denied!</strong> You don't have permission to access this resource.
    `;
    
    const container = document.querySelector('.main-content') || document.body;
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  // Change password
  async changePassword(oldPassword, newPassword) {
    try {
      // Simulate API call
      const response = await this.mockChangePassword(oldPassword, newPassword);
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      return { success: false, message: 'Failed to change password' };
    }
  }

  // Mock change password
  mockChangePassword(oldPassword, newPassword) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (oldPassword === 'password123') {
          resolve({ success: true, message: 'Password changed successfully' });
        } else {
          resolve({ success: false, message: 'Current password is incorrect' });
        }
      }, 1000);
    });
  }

  // Update profile
  async updateProfile(profileData) {
    try {
      // Simulate API call
      const response = await this.mockUpdateProfile(profileData);
      if (response.success) {
        // Update current user data
        Object.assign(this.currentUser, profileData);
        localStorage.setItem('erpUser', JSON.stringify(this.currentUser));
        this.updateUI();
      }
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'Failed to update profile' };
    }
  }

  // Mock update profile
  mockUpdateProfile(profileData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Profile updated successfully' });
      }, 1000);
    });
  }
}

// Initialize auth manager
const authManager = new AuthManager();

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const userType = document.getElementById('userType').value;
      const submitBtn = document.getElementById('loginBtn');
      const errorDiv = document.getElementById('loginError');
      
      // Show loading state
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="spinner"></span> Signing in...';
      submitBtn.disabled = true;
      
      // Clear previous errors
      if (errorDiv) {
        errorDiv.style.display = 'none';
      }
      
      try {
        const result = await authManager.login(email, password, userType);
        
        if (result.success) {
          // Success - redirect will happen automatically
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
        } else {
          // Show error
          if (errorDiv) {
            errorDiv.textContent = result.message;
            errorDiv.style.display = 'block';
          }
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        console.error('Login error:', error);
        if (errorDiv) {
          errorDiv.textContent = 'An error occurred. Please try again.';
          errorDiv.style.display = 'block';
        }
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Handle logout buttons
  const logoutButtons = document.querySelectorAll('.logout-btn');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (confirm('Are you sure you want to logout?')) {
        authManager.logout();
      }
    });
  });

  // Protect pages that require authentication
  const protectedPages = [
    'admin-dashboard.html',
    'staff-dashboard.html',
    'student-dashboard.html'
  ];
  
  const currentPage = window.location.pathname.split('/').pop();
  if (protectedPages.includes(currentPage)) {
    authManager.requireAuth();
  }

  // Update UI on page load
  authManager.updateUI();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthManager;
}
