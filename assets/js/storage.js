// Local Storage Management for ERP System

class StorageManager {
  constructor() {
    this.prefix = 'erp_';
    this.init();
  }

  init() {
    this.checkStorageSupport();
    this.cleanupExpiredData();
  }

  // Check if localStorage is supported
  checkStorageSupport() {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      this.storageSupported = true;
    } catch (e) {
      this.storageSupported = false;
      console.warn('localStorage is not supported');
    }
  }

  // Generate storage key with prefix
  getKey(key) {
    return this.prefix + key;
  }

  // Set item in localStorage
  setItem(key, value, expirationMinutes = null) {
    if (!this.storageSupported) return false;

    try {
      const item = {
        value: value,
        timestamp: Date.now(),
        expiration: expirationMinutes ? Date.now() + (expirationMinutes * 60 * 1000) : null
      };

      localStorage.setItem(this.getKey(key), JSON.stringify(item));
      return true;
    } catch (e) {
      console.error('Error saving to localStorage:', e);
      return false;
    }
  }

  // Get item from localStorage
  getItem(key) {
    if (!this.storageSupported) return null;

    try {
      const itemStr = localStorage.getItem(this.getKey(key));
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      
      // Check if item has expired
      if (item.expiration && Date.now() > item.expiration) {
        this.removeItem(key);
        return null;
      }

      return item.value;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return null;
    }
  }

  // Remove item from localStorage
  removeItem(key) {
    if (!this.storageSupported) return false;

    try {
      localStorage.removeItem(this.getKey(key));
      return true;
    } catch (e) {
      console.error('Error removing from localStorage:', e);
      return false;
    }
  }

  // Clear all items with our prefix
  clear() {
    if (!this.storageSupported) return false;

    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (e) {
      console.error('Error clearing localStorage:', e);
      return false;
    }
  }

  // Check if key exists
  hasItem(key) {
    return this.getItem(key) !== null;
  }

  // Get all keys with our prefix
  getAllKeys() {
    if (!this.storageSupported) return [];

    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.replace(this.prefix, ''));
      }
    }
    return keys;
  }

  // Get storage usage information
  getStorageInfo() {
    if (!this.storageSupported) {
      return { supported: false };
    }

    let totalSize = 0;
    let itemCount = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        const value = localStorage.getItem(key);
        totalSize += (key + value).length;
        itemCount++;
      }
    }

    return {
      supported: true,
      itemCount: itemCount,
      totalSize: totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2)
    };
  }

  // Clean up expired data
  cleanupExpiredData() {
    if (!this.storageSupported) return;

    const keysToRemove = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        try {
          const itemStr = localStorage.getItem(key);
          const item = JSON.parse(itemStr);
          
          if (item.expiration && Date.now() > item.expiration) {
            keysToRemove.push(key);
          }
        } catch (e) {
          // If we can't parse the item, remove it
          keysToRemove.push(key);
        }
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  // Store user session data
  setSession(sessionData) {
    return this.setItem('session', sessionData, 480); // 8 hours
  }

  // Get user session data
  getSession() {
    return this.getItem('session');
  }

  // Clear user session
  clearSession() {
    return this.removeItem('session');
  }

  // Store user preferences
  setPreferences(preferences) {
    return this.setItem('preferences', preferences);
  }

  // Get user preferences
  getPreferences() {
    return this.getItem('preferences') || {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: true,
      pageSize: 10
    };
  }

  // Update user preferences
  updatePreferences(newPreferences) {
    const currentPreferences = this.getPreferences();
    const updatedPreferences = { ...currentPreferences, ...newPreferences };
    return this.setPreferences(updatedPreferences);
  }

  // Store form data temporarily
  setFormData(formId, formData) {
    return this.setItem(`form_${formId}`, formData, 60); // 1 hour
  }

  // Get form data
  getFormData(formId) {
    return this.getItem(`form_${formId}`);
  }

  // Clear form data
  clearFormData(formId) {
    return this.removeItem(`form_${formId}`);
  }

  // Store search history
  addSearchHistory(searchTerm, searchType = 'general') {
    const history = this.getSearchHistory(searchType);
    
    // Remove if already exists
    const filteredHistory = history.filter(item => item.term !== searchTerm);
    
    // Add to beginning
    filteredHistory.unshift({
      term: searchTerm,
      timestamp: Date.now()
    });

    // Keep only last 20 searches
    const limitedHistory = filteredHistory.slice(0, 20);
    
    return this.setItem(`search_history_${searchType}`, limitedHistory);
  }

  // Get search history
  getSearchHistory(searchType = 'general') {
    return this.getItem(`search_history_${searchType}`) || [];
  }

  // Clear search history
  clearSearchHistory(searchType = 'general') {
    return this.removeItem(`search_history_${searchType}`);
  }

  // Store cached data
  setCachedData(key, data, expirationMinutes = 30) {
    return this.setItem(`cache_${key}`, data, expirationMinutes);
  }

  // Get cached data
  getCachedData(key) {
    return this.getItem(`cache_${key}`);
  }

  // Clear cached data
  clearCachedData(key) {
    return this.removeItem(`cache_${key}`);
  }

  // Clear all cached data
  clearAllCache() {
    const keys = this.getAllKeys();
    const cacheKeys = keys.filter(key => key.startsWith('cache_'));
    
    cacheKeys.forEach(key => this.removeItem(key));
    return cacheKeys.length;
  }

  // Store navigation history
  addNavigationHistory(url, title) {
    const history = this.getNavigationHistory();
    
    // Remove if already exists
    const filteredHistory = history.filter(item => item.url !== url);
    
    // Add to beginning
    filteredHistory.unshift({
      url: url,
      title: title,
      timestamp: Date.now()
    });

    // Keep only last 50 pages
    const limitedHistory = filteredHistory.slice(0, 50);
    
    return this.setItem('navigation_history', limitedHistory);
  }

  // Get navigation history
  getNavigationHistory() {
    return this.getItem('navigation_history') || [];
  }

  // Clear navigation history
  clearNavigationHistory() {
    return this.removeItem('navigation_history');
  }

  // Store recent items (students, courses, etc.)
  addRecentItem(type, item) {
    const recent = this.getRecentItems(type);
    
    // Remove if already exists
    const filteredRecent = recent.filter(recentItem => recentItem.id !== item.id);
    
    // Add to beginning
    filteredRecent.unshift({
      ...item,
      accessedAt: Date.now()
    });

    // Keep only last 10 items
    const limitedRecent = filteredRecent.slice(0, 10);
    
    return this.setItem(`recent_${type}`, limitedRecent);
  }

  // Get recent items
  getRecentItems(type) {
    return this.getItem(`recent_${type}`) || [];
  }

  // Clear recent items
  clearRecentItems(type) {
    return this.removeItem(`recent_${type}`);
  }

  // Store notification settings
  setNotificationSettings(settings) {
    return this.setItem('notification_settings', settings);
  }

  // Get notification settings
  getNotificationSettings() {
    return this.getItem('notification_settings') || {
      emailNotifications: true,
      pushNotifications: true,
      academicUpdates: true,
      feeReminders: true,
      examAlerts: true,
      libraryReminders: true,
      generalAnnouncements: true
    };
  }

  // Store dashboard layout
  setDashboardLayout(layout) {
    return this.setItem('dashboard_layout', layout);
  }

  // Get dashboard layout
  getDashboardLayout() {
    return this.getItem('dashboard_layout');
  }

  // Store table preferences (sorting, column visibility, etc.)
  setTablePreferences(tableId, preferences) {
    return this.setItem(`table_${tableId}`, preferences);
  }

  // Get table preferences
  getTablePreferences(tableId) {
    return this.getItem(`table_${tableId}`) || {
      sortColumn: null,
      sortDirection: 'asc',
      visibleColumns: [],
      pageSize: 10
    };
  }

  // Store offline data for sync
  addOfflineAction(action) {
    const actions = this.getOfflineActions();
    actions.push({
      ...action,
      id: Date.now() + Math.random(),
      timestamp: Date.now()
    });
    return this.setItem('offline_actions', actions);
  }

  // Get offline actions
  getOfflineActions() {
    return this.getItem('offline_actions') || [];
  }

  // Clear offline actions
  clearOfflineActions() {
    return this.removeItem('offline_actions');
  }

  // Remove specific offline action
  removeOfflineAction(actionId) {
    const actions = this.getOfflineActions();
    const filteredActions = actions.filter(action => action.id !== actionId);
    return this.setItem('offline_actions', filteredActions);
  }

  // Export all data
  exportData() {
    if (!this.storageSupported) return null;

    const data = {};
    const keys = this.getAllKeys();
    
    keys.forEach(key => {
      data[key] = this.getItem(key);
    });

    return {
      exported_at: new Date().toISOString(),
      data: data
    };
  }

  // Import data
  importData(exportedData) {
    if (!this.storageSupported || !exportedData.data) return false;

    try {
      Object.keys(exportedData.data).forEach(key => {
        this.setItem(key, exportedData.data[key]);
      });
      return true;
    } catch (e) {
      console.error('Error importing data:', e);
      return false;
    }
  }

  // Backup data to file
  backupToFile() {
    const data = this.exportData();
    if (!data) return false;

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `erp_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  }

  // Restore data from file
  restoreFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          const success = this.importData(data);
          resolve(success);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
}

// Initialize storage manager
const storageManager = new StorageManager();

// Auto-save form data
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form[data-auto-save]');
  
  forms.forEach(form => {
    const formId = form.id || form.dataset.formId;
    if (!formId) return;

    // Load saved data
    const savedData = storageManager.getFormData(formId);
    if (savedData) {
      Object.keys(savedData).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field && field.type !== 'password') {
          field.value = savedData[fieldName];
        }
      });
    }

    // Save data on input
    form.addEventListener('input', function() {
      const formData = new FormData(form);
      const data = {};
      
      for (let [key, value] of formData.entries()) {
        if (key !== 'password' && key !== 'confirmPassword') {
          data[key] = value;
        }
      }
      
      storageManager.setFormData(formId, data);
    });

    // Clear saved data on successful submit
    form.addEventListener('submit', function() {
      setTimeout(() => {
        if (form.querySelector('.alert-success')) {
          storageManager.clearFormData(formId);
        }
      }, 1000);
    });
  });
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
}
