

# 🎓 SmartERP - Complete College Management System
## AI Agent Development Instructions

---

## 📋 PROJECT BRIEF

Build a **fully functional, production-ready** college management system with clean, modern UI. This is a multi-page web application using **HTML5, CSS3, and Vanilla JavaScript** with localStorage for data persistence.

**Target Quality**: Professional SaaS product with smooth UX, no bugs, and beautiful design.

---

## 🎨 DESIGN SYSTEM

### Color Palette
```css
:root {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --primary-light: #dbeafe;
  --secondary: #8b5cf6;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --dark: #1e293b;
  --gray: #64748b;
  --light-gray: #f1f5f9;
  --border: #e2e8f0;
  --white: #ffffff;
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

### Typography
- **Font Family**: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Font Sizes**: 
  - Small: 0.875rem (14px)
  - Base: 1rem (16px)
  - Large: 1.125rem (18px)
  - H1: 2rem (32px)
  - H2: 1.5rem (24px)
  - H3: 1.25rem (20px)

### UI Components Style
- **Buttons**: Rounded corners (6px), padding (12px 24px), smooth hover transitions
- **Cards**: White background, subtle shadow, 8px border-radius
- **Inputs**: Border on focus, error states in red, 40px height
- **Tables**: Zebra striping, hover effects, sticky headers
- **Modals**: Backdrop blur, slide-in animation, center positioning
- **Notifications**: Top-right toast, auto-dismiss after 4 seconds

---

## 🔐 AUTHENTICATION SYSTEM

### Demo Accounts (Pre-load in fake-data.js)
```javascript
const demoUsers = [
  {
    id: "ADM001",
    email: "admin@college.edu",
    password: "Admin@123",
    role: "admin",
    name: "Dr. Rajesh Kumar",
    phone: "9876543210",
    department: "Administration"
  },
  {
    id: "STF001",
    email: "staff@college.edu",
    password: "Staff@123",
    role: "staff",
    name: "Prof. Priya Sharma",
    phone: "9876543211",
    department: "Library"
  },
  {
    id: "STU001",
    email: "student@college.edu",
    password: "Student@123",
    role: "student",
    name: "Rahul Verma",
    phone: "9876543212",
    enrollmentNo: "2024CS001",
    course: "B.Tech Computer Science",
    semester: 3,
    cgpa: 8.5
  }
];
```

### Login Page (login.html)
**Features Required:**
- Email and password fields with validation
- Role selector (dropdown: Student/Staff/Admin)
- "Remember Me" checkbox
- Show/hide password toggle
- Form validation before submission
- Error messages for invalid credentials
- Redirect to appropriate dashboard based on role
- Smooth animations and loading state

**Design**: Modern centered form with college branding, gradient background

---

## 🏠 LANDING PAGE (index.html)

**Sections:**
1. **Hero Section**: College name, tagline, two CTA buttons (Login, Apply Now)
2. **Features Grid**: 6 feature cards (Admissions, Fees, Hostel, Library, Exams, Reports)
3. **Stats Section**: 4 stat counters (Students, Faculty, Courses, Placements)
4. **Footer**: Contact info, quick links, social media icons

**Design**: Modern, clean, professional with smooth scroll animations

---

## 📊 DASHBOARDS

### Student Dashboard (pages/student-dashboard.html)
**Layout**: Sidebar + Main Content Area

**Sidebar Menu:**
- Dashboard (active)
- My Profile
- Admissions
- Fee Payment
- Hostel
- Library
- Examinations
- Logout

**Main Content - Overview Cards:**
1. Fee Status Card: Outstanding amount, due date, Pay Now button
2. Hostel Status Card: Room details or Apply button
3. Library Card: Books issued count, due dates
4. Exam Card: Upcoming exams, hall ticket download

**Quick Stats:**
- Current Semester CGPA
- Attendance Percentage (fake)
- Total Books Issued
- Fee Status

**Recent Activity Feed:**
- Last 5 activities across all modules

**Design**: Clean dashboard with colorful cards, icons for each module

---

### Admin Dashboard (pages/admin-dashboard.html)
**Layout**: Sidebar + Main Content

**Overview Cards (Top Row):**
1. Total Students: 1,245 (+12 this month)
2. Pending Admissions: 45
3. Fee Collection: ₹45,23,000 (this month)
4. Hostel Occupancy: 85%

**Charts Section:**
1. Admission Trends (Line Chart) - Last 6 months
2. Course Distribution (Pie Chart)
3. Fee Collection (Bar Chart) - Monthly
4. Library Activity (Line Chart) - Weekly

**Quick Actions:**
- Approve Pending Admissions (badge with count)
- View Fee Defaulters
- Allocate Hostel Rooms
- Publish Results

**Recent Applications Table:**
- Last 10 applications with quick approve/reject buttons

**Use Chart.js or create simple CSS-based charts**

---

### Staff Dashboard (pages/staff-dashboard.html)
**Similar to Admin but limited access:**
- Library management section
- Hostel allocation view
- No financial data
- No user management

---

## 📝 ADMISSIONS MODULE

### Apply Page (pages/admissions/apply.html)
**Multi-step form with progress indicator**

**Step 1: Personal Information**
- Full Name* (text, letters only)
- Date of Birth* (date picker, age 16-35)
- Gender* (radio: Male/Female/Other)
- Email* (email validation, unique check)
- Mobile* (10 digits, starts with 6-9)
- Aadhar Number* (12 digits)
- Category (dropdown: General/OBC/SC/ST)
- Address* (textarea)
- City*, State*, PIN Code*

**Step 2: Academic Details**
- Previous School/College*
- Board/University*
- 10th Percentage* (0-100)
- 12th Percentage* (0-100)
- Stream* (Science/Commerce/Arts)
- Preferred Course* (dropdown: B.Tech/BBA/B.Sc)
- Preferred Branch* (CS/Mech/EC/Civil)

**Step 3: Documents**
- Photo Upload (jpg/png, max 500KB)
- 10th Marksheet (pdf, max 2MB)
- 12th Marksheet (pdf, max 2MB)
- Aadhar Card (pdf, max 1MB)

**Step 4: Review & Submit**
- Show all entered data
- Declaration checkbox*
- Terms & Conditions checkbox*
- Submit button

**On Submit:**
- Generate unique Application ID (APP + timestamp)
- Save to localStorage
- Show success modal with Application ID
- Send to my-application.html

**Validation**: Real-time validation with error messages below fields

---

### Applications List (pages/admissions/applications.html) - ADMIN ONLY
**Features:**
- Search bar (by name, email, application ID)
- Filters: Status (All/Pending/Approved/Rejected), Course, Date Range
- Data table with columns:
  - Checkbox (for bulk actions)
  - Application ID
  - Name
  - Email
  - Course
  - Percentage
  - Applied Date
  - Status (badge: yellow=pending, green=approved, red=rejected)
  - Actions (View, Approve, Reject buttons)
- Pagination: 10/25/50 per page
- Export to CSV button
- Bulk approve/reject for selected

**Design**: Professional table with hover effects, sortable columns

---

### Application Detail (pages/admissions/detail.html) - ADMIN
**URL**: ?id=APP1234567890

**Layout**: Two columns
- **Left (70%)**: Full application details in sections (Personal, Academic, Documents)
- **Right (30%)**: Action Panel

**Action Panel:**
- Status Badge (current status)
- Merit Score Display (calculated from percentage)
- Approve Button (green, large)
- Reject Button (red, large)
- Reject opens modal asking for reason
- Admin Notes textarea
- Timeline of status changes

**On Approve:**
- Generate Student ID (Year + Course + Number)
- Change status to approved
- Create student record in system
- Show success notification
- Redirect to applications list

---

### My Application (pages/admissions/my-application.html) - STUDENT
**Features:**
- Status tracker (visual timeline: Submitted → Under Review → Decision)
- Application details (read-only view)
- Download Application PDF button
- Edit button (if status is pending)
- Withdraw button (if status is pending)
- Admin notes/feedback (if any)

**Design**: Clean, card-based layout with status prominently displayed

---

## 💰 FEES MODULE

### Fee Structure (pages/fees/structure.html)
**Features:**
- Course tabs (B.Tech, BBA, B.Sc, etc.)
- Fee breakdown table for each course:
  - Tuition Fee
  - Development Fee
  - Library Fee
  - Lab Fee
  - Sports Fee
  - Examination Fee
  - **Total**
- Semester-wise breakdown
- Payment schedule information
- Downloadable fee structure PDF

---

### Pay Fees (pages/fees/pay.html) - STUDENT
**Layout**: Two columns

**Left Side - Fee Summary:**
- Student details card
- Fee breakdown table
- Total Payable
- Already Paid
- Outstanding Amount
- Due Date with countdown

**Right Side - Payment Form:**
- Payment method: Full/Partial (radio buttons)
- Partial amount input (if selected)
- Card Details:
  - Cardholder Name*
  - Card Number* (16 digits, show card type icon)
  - Expiry Date* (MM/YY format)
  - CVV* (3 digits, password field)
- Terms checkbox
- Pay Button (large, prominent)

**Payment Processing:**
1. Show loading modal (2-3 seconds)
2. Simulate success (90% of the time)
3. Generate Transaction ID (TXN + timestamp + random)
4. Save payment record
5. Show success modal with transaction details
6. Automatically redirect to receipt page

**Payment Failure (10%):**
- Show error modal
- Display fake error message
- Offer retry button

---

### Payment History (pages/fees/history.html) - STUDENT
**Features:**
- Table with all payment records:
  - Date & Time
  - Transaction ID
  - Amount Paid
  - Payment Method
  - Status (Success/Failed)
  - Receipt (Download button)
- Total paid summary
- Outstanding balance card
- Filter by date range
- Search by transaction ID

**Receipt Generation:**
- Modal/new page with printable format
- College header
- Student & transaction details
- Fee breakdown
- Amount in words
- QR code (fake)
- Download PDF button

---

### Admin Fees (pages/fees/admin-fees.html) - ADMIN
**Dashboard with:**
1. Summary Cards:
   - Today's Collection
   - This Month's Collection
   - Pending Amount
   - Total Defaulters

2. Collection Chart (bar/line chart by month)

3. Defaulters List Table:
   - Student Name
   - Enrollment No
   - Course
   - Outstanding Amount
   - Due Date
   - Days Overdue
   - Actions (Send Reminder, View Details)

4. Filters: Course, Semester, Payment Status
5. Export Reports (CSV/PDF)

---

## 🏠 HOSTEL MODULE

### Apply for Hostel (pages/hostel/apply.html) - STUDENT
**Form Fields:**
- Hostel Preference* (Boys/Girls dropdown)
- Room Type* (2-Seater/3-Seater radio)
- Special Requirements (textarea)
- Emergency Contact Name*
- Emergency Contact Number*
- Parent Approval checkbox*
- Declaration checkbox*

**On Submit:**
- Generate Application ID
- Save to pending applications
- Show success message
- Redirect to my-room.html

---

### Manage Hostel (pages/hostel/manage.html) - ADMIN/STAFF
**Two Sections:**

**1. Pending Applications Table:**
- Application ID
- Student Name
- Course
- Preference
- Applied Date
- Actions (Approve with room allocation, Reject)

**2. Room Allocation Grid:**
- Visual grid of all rooms
- Color coded: Green=Available, Orange=Partially Occupied, Red=Full, Gray=Maintenance
- Click room to see details and allocate students
- Drag-drop student cards to rooms
- Filter: By hostel, floor, availability

**Room Allocation Modal:**
- Room details
- Current occupants list
- Available beds count
- Select student dropdown (from pending applications)
- Allocate button

---

### My Room (pages/hostel/my-room.html) - STUDENT
**If Not Allocated:**
- Application status
- Apply button (if not applied)

**If Allocated:**
- Room details card:
  - Hostel Name
  - Room Number & Floor
  - Bed Number
  - Room Type
- Roommates list with photos (placeholder)
- Facilities list (checkmarks)
- Warden contact details
- Hostel rules section
- Raise complaint button

---

## 📚 LIBRARY MODULE

### Book Catalog (pages/library/catalog.html) - ALL USERS
**Features:**
- Search bar (by title, author, ISBN)
- Category filter (Fiction, Non-Fiction, Academic, Reference)
- Subject filter (for academic books)
- Availability filter (Available/Issued)
- Grid/List view toggle
- Sort by: Name, Author, Recently Added

**Book Card (Grid View):**
- Book cover placeholder
- Title
- Author
- Category
- Available copies indicator
- Issue button (if available)

**Book Card (List View):**
- Same info in table row format

---

### Issue Book (pages/library/issue.html) - STUDENT
**Request Form:**
- Search and select book (autocomplete dropdown)
- Expected return date (default 14 days from today)
- Submit button

**My Issued Books Section:**
- Table showing currently issued books
- Columns: Book, Issue Date, Due Date, Status (overdue warning), Return button

---

### My Books (pages/library/my-books.html) - STUDENT
**Tabs:**
1. Currently Issued: Books in possession with due dates
2. History: All past issues and returns
3. Fines: Overdue fines (₹5/day calculation)

**Return Process:**
- Click return button
- Confirmation modal
- If overdue: Show fine amount, link to pay
- Complete return

---

### Manage Library (pages/library/manage.html) - ADMIN/STAFF
**Four Tabs:**

**1. Books Catalog:**
- Add New Book button (opens modal with form)
- Edit/Delete buttons on each book
- Bulk upload CSV option

**2. Issue Requests:**
- Pending requests table
- Student name, book, request date
- Approve/Reject buttons
- On approve: Set issue date and due date

**3. Currently Issued:**
- Table of all issued books
- Student, Book, Issue Date, Due Date, Status
- Filter: Overdue/Due Today/Due Soon
- Mark as returned button

**4. Reports:**
- Most issued books chart
- Issue/return trends chart
- Overdue fines summary
- Student-wise issue history

---

## 📝 EXAMINATION MODULE

### Exam Registration (pages/exams/register.html) - STUDENT
**Form:**
- Semester* (dropdown)
- Exam Type* (Regular/Supplementary)
- Subjects (checkboxes - pre-loaded based on course)
- Exam Center Preference (dropdown with centers)
- Photo Upload*
- Fee payment status check (must be paid)
- Declaration checkbox*

**On Submit:**
- Generate Registration ID
- Save registration
- Show success with registration ID
- Button to download hall ticket (after approval)

---

### Hall Ticket (pages/exams/hall-ticket.html) - STUDENT
**Printable Format:**
- College header with logo
- Student photo and details
- Enrollment number, course, semester
- Hall ticket number (unique)
- Exam schedule table:
  - Date, Subject, Time, Room Number
- Exam center address
- Instructions list
- Barcode/QR code placeholder
- Download/Print buttons

**Generate on first view, save for re-download**

---

### Results (pages/exams/results.html) - STUDENT
**Features:**
- Semester selector dropdown
- Result cards for each semester
- Subject-wise marks table:
  - Subject Code
  - Subject Name
  - Marks Obtained
  - Total Marks
  - Grade (A+, A, B+, B, C, F)
  - Status (Pass/Fail)
- SGPA/CGPA display (large, prominent)
- Overall status (Pass/Fail)
- Progress chart (semester-wise CGPA)
- Download marksheet PDF button

---

### Upload Results (pages/exams/upload-results.html) - ADMIN
**Two Options:**

**1. Bulk Upload:**
- CSV file upload
- Format: EnrollmentNo, SubjectCode, Marks
- Validate and show errors
- Preview before saving
- Publish button

**2. Manual Entry:**
- Select semester and exam
- Select student (dropdown)
- Enter marks for each subject
- Auto-calculate grade and status
- Save button

**Published Results Section:**
- Table of published result sets
- Semester, Exam Type, Published Date
- Unpublish option
- View statistics

---

## 💾 DATA MANAGEMENT (assets/js/storage.js)

### localStorage Keys Structure:
```javascript
{
  "smarterp_users": [],           // All users
  "smarterp_session": {},          // Current logged-in user
  "smarterp_students": [],         // Student records
  "smarterp_applications": [],     // Admission applications
  "smarterp_payments": [],         // Fee payments
  "smarterp_hostel_applications": [],
  "smarterp_hostel_rooms": [],
  "smarterp_hostel_allocations": [],
  "smarterp_books": [],            // Library books
  "smarterp_book_issues": [],      // Issue records
  "smarterp_exam_registrations": [],
  "smarterp_results": [],
  "smarterp_notifications": []
}
```

### Required Functions:
```javascript
// Generic CRUD
function saveData(key, data) { }
function getData(key) { }
function updateData(key, id, updates) { }
function deleteData(key, id) { }
function findById(key, id) { }
function findByField(key, field, value) { }

// Utility
function generateId(prefix) { }
function getCurrentUser() { }
function checkAuth() { }
function hasRole(allowedRoles) { }
```

---

## 🎭 FAKE DATA GENERATION (assets/js/fake-data.js)

### Generate on First Load:
1. **100 Students** with realistic Indian names
2. **50 Admission Applications** (30 pending, 15 approved, 5 rejected)
3. **200 Fee Payments** across students
4. **2 Hostels** with 50 rooms each (various occupancy)
5. **500 Books** across categories
6. **150 Book Issue Records**
7. **80 Exam Registrations**
8. **100 Result Entries**

### Data Patterns:
- Names: Use common Indian first/last names
- Emails: firstname.lastname@email.com format
- Phone: 98XXXXXXXX format
- Percentages: 45-98% (bell curve distribution)
- Dates: Spread across last 6 months
- Realistic course/branch distribution

---

## 🎨 STYLING GUIDELINES (assets/css/style.css)

### Global Styles:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--dark);
  background: var(--light-gray);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
```

### Component Classes to Create:
- `.btn` `.btn-primary` `.btn-secondary` `.btn-success` `.btn-danger`
- `.card` `.card-header` `.card-body` `.card-footer`
- `.form-group` `.form-control` `.form-error`
- `.table` `.table-striped` `.table-hover`
- `.modal` `.modal-backdrop` `.modal-content`
- `.toast` `.toast-success` `.toast-error` `.toast-warning`
- `.badge` `.badge-success` `.badge-warning` `.badge-danger`
- `.sidebar` `.sidebar-nav` `.sidebar-item`
- `.navbar` `.navbar-brand` `.navbar-menu`

### Animations:
```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide in from right */
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

/* Button hover effect */
.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
}
```

---

## 📱 RESPONSIVE DESIGN (assets/css/responsive.css)

### Breakpoints:
```css
/* Mobile: 320px - 767px */
@media (max-width: 767px) {
  /* Stack columns */
  /* Hide sidebar, show hamburger menu */
  /* Full-width cards */
  /* Smaller fonts */
}

/* Tablet: 768px - 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  /* 2 column grid */
  /* Collapsible sidebar */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  /* Full sidebar visible */
  /* 3-4 column grids */
}
```

---

## ⚡ CORE FUNCTIONALITY (assets/js/main.js)

### Page Load:
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize fake data if first visit
  if (!localStorage.getItem('smarterp_initialized')) {
    initializeFakeData();
    localStorage.setItem('smarterp_initialized', 'true');
  }
  
  // Check authentication (except login and index pages)
  if (!isPublicPage()) {
    checkAuthAndRedirect();
  }
  
  // Load user info in header
  loadUserInfo();
  
  // Initialize page-specific functionality
  initPage();
});
```

### Common Functions:
```javascript
// Show toast notification
function showToast(message, type) { }

// Show modal
function showModal(title, content, buttons) { }

// Format date
function formatDate(date) { }

// Format currency
function formatCurrency(amount) { }

// Validate form
function validateForm(formId) { }

// Export to CSV
function exportToCSV(data, filename) { }

// Generate PDF (use window.print())
function generatePDF() { }
```

---

## ✅ VALIDATION RULES (assets/js/validation.js)

### Regex Patterns:
```javascript
const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[6-9]\d{9}$/,
  aadhar: /^\d{12}$/,
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  pin: /^\d{6}$/,
  cardNumber: /^\d{16}$/,
  cvv: /^\d{3}$/,
  expiryDate: /^(0[1-9]|1[0-2])\/\d{2}$/
};

function validateField(value, type) {
  // Return true/false and error message
}
```

---

## 🔔 NOTIFICATION SYSTEM

### Toast Notifications:
- Position: Fixed top-right
- Auto-dismiss: 4 seconds
- Stack multiple notifications
- Types: success (green), error (red), warning (orange), info (blue)
- Slide-in animation from right
- Close button (×)

### Usage:
```javascript
showToast('Application submitted successfully!', 'success');
showToast('Invalid email address', 'error');
showToast('Fee payment due in 3 days', 'warning');
```

---

## 🎯 QUALITY CHECKLIST

### Functionality:
- [ ] All forms submit and save data correctly
- [ ] All validations work (client-side)
- [ ] Role-based access control enforced
- [ ] Data persists across page refreshes
- [ ] All CRUD operations work
- [ ] Search and filters functional
- [ ] Pagination works
- [ ] No console errors

### Design:
- [ ] Consistent color scheme throughout
- [ ] Professional, modern look
- [ ] Smooth animations and transitions
- [ ] Proper spacing and alignment
- [ ] Icons for all actions
- [ ] Loading states for async operations
- [ ] Empty states with helpful messages
- [ ] Error states with clear messages

### Responsive:
- [ ] Works on mobile (320px+)
- [ ] Works on tablet (768px+)
- [ ] Works on desktop (1024px+)
- [ ] Hamburger menu on mobile
- [ ] Touch-friendly buttons on mobile
- [ ] Readable text on all screen sizes

### User Experience:
- [ ] Intuitive navigation
- [ ] Clear call-to-action buttons
- [ ] Helpful error messages
- [ ] Success confirmations
- [ ] Smooth page transitions
- [ ] Fast load times
- [ ] No broken links
- [ ] Keyboard accessible

---

## 🚀 DEVELOPMENT PRIORITY ORDER

1. ✅ Setup demo users and authentication (login.html + auth.js)
2. ✅ Create fake data generator (fake-data.js)
3. ✅ Build global CSS components (style.css)
4. ✅ Create landing page (index.html)
5. ✅ Build all 3 dashboards
6. ✅ Complete Admissions module (all 4 pages)
7. ✅ Complete Fees module (all 4 pages)
8. ✅ Complete Hostel module (all 3 pages)
9. ✅ Complete Library module (all 4 pages)
10. ✅ Complete Examination module (all 4 pages)
11. ✅ Add responsive CSS (responsive.css)
12. ✅ Test all functionality
13. ✅ Polish UI/UX
14. ✅ Write README.md

---

## 📝 README.md CONTENT

```markdown
# 🎓 SmartERP - College Management System

A complete web-based college management system built with HTML, CSS, and JavaScript.

## 🚀 Features

- Student Admissions Management
- Online Fee Collection
- Hostel Allocation System
- Library Management
- Examination & Results
- Role-based Dashboards

## 💻 Demo Accounts

**Admin:**
- Email: admin@college.edu
- Password: Admin@123

**Staff:**
- Email: staff@college.edu
- Password: Staff@123

**Student:**
- Email: student@college.edu
- Password: Student@123

## 🛠️ Setup

1. Clone/download the repository
2. Open `index.html` in a web browser
3. No server or installation required!

## 📁 Project Structure

See folder structure above...

## 🎨 Technologies

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- localStorage for data persistence

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

MIT License
```

---

## 🎨 SPECIAL UI REQUIREMENTS

### Use These UI Patterns:

1. **Sidebar Navigation**: Fixed left sidebar (250px wide) with icons + text
2. **Top Navbar**: Fixed top with logo, search bar, notifications bell, user menu
3. **Cards**: Elevated cards with hover effect for dashboard stats
4. **Data Tables**: Striped rows, hover effect, sortable headers with arrows
5. **Forms**: Floating labels, inline validation, clear error messages
6. **Buttons**: Primary (blue), Secondary (gray), Success (green), Danger (red)
7. **Modals**: Center screen, backdrop blur, smooth slide-in animation
8. **Toast**: Top-right corner, stack multiple, auto-dismiss with progress bar
9. **Empty States**: Friendly illustrations/icons with helpful text
10. **Loading States**: Spinner or skeleton screens

### Icons:
Use Unicode characters or create simple CSS icons:
- Dashboard: ■
- Profile: 👤
- Admissions: 📝
- Fees: 💰
- Hostel: 🏠
- Library: 📚
- Exams: 📄
- Logout: ⎋
- Search: 🔍
- Notifications: 🔔
- Download: ⬇
- Edit: ✎
- Delete: 🗑
- Check: ✓
- Close: ✕

---

## 🎯 FINAL INSTRUCTIONS FOR AI AGENT

**Your Task:**
Generate complete, production-ready code for all HTML, CSS, and JavaScript files following this specification exactly.

**Requirements:**
1. Write clean, well-commented code
2. Follow the exact folder structure provided
3. Implement ALL features mentioned above
4. Create beautiful, modern UI matching the design system
5. Ensure responsive design works perfectly
6. Add smooth animations and transitions
7. Include proper error handling
8. Test all functionality before delivery
9. Make it bug-free and production-ready

**Code Style:**
- Use descriptive variable/function names
- Add comments for complex logic
- Keep functions small and focused
- Use ES6+ features (arrow functions, const/let, template literals)
- Format code consistently with 2-space indentation

**Testing:**
Before delivery, verify:
- All pages load without errors
- All forms submit correctly
- Data persists in localStorage
- Role-based access works
- Responsive design works on mobile
- No console errors
- All links work

**Deliverables:**
Generate all files with complete code ready to run. Each file should be production-ready with no placeholders or TODOs.

---

## 🎉 SUCCESS CRITERIA

The project is successful when:
✅ All 30+ pages are fully functional
✅ Beautiful, professional UI throughout
✅ Smooth, bug-free user experience
✅ All CRUD operations work correctly
✅ Role-based access properly enforced
✅ Data persists correctly
✅ Responsive on all devices
✅ No console errors
✅ Code is clean and well-organized
✅ Ready for immediate use/demo

---

**NOW BUILD IT! 🚀**