// Fake Data Generator for ERP System Demo

class FakeDataGenerator {
  constructor() {
    this.init();
  }

  init() {
    // Initialize fake data if not exists
    if (!localStorage.getItem('erpData')) {
      this.generateInitialData();
    }
  }

  // Generate initial fake data
  generateInitialData() {
    const data = {
      students: this.generateStudents(50),
      staff: this.generateStaff(15),
      courses: this.generateCourses(20),
      admissions: this.generateAdmissions(25),
      fees: this.generateFees(50),
      library: this.generateLibraryData(100),
      hostel: this.generateHostelData(30),
      exams: this.generateExamData(10),
      announcements: this.generateAnnouncements(10)
    };

    localStorage.setItem('erpData', JSON.stringify(data));
  }

  // Get data from localStorage
  getData(type) {
    const data = JSON.parse(localStorage.getItem('erpData') || '{}');
    return data[type] || [];
  }

  // Save data to localStorage
  saveData(type, data) {
    const allData = JSON.parse(localStorage.getItem('erpData') || '{}');
    allData[type] = data;
    localStorage.setItem('erpData', JSON.stringify(allData));
  }

  // Generate students data
  generateStudents(count) {
    const students = [];
    const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Business Administration', 'Psychology', 'Biology', 'Chemistry'];
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'James', 'Mary', 'William', 'Jennifer', 'Richard', 'Patricia', 'Joseph', 'Linda'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'];

    for (let i = 1; i <= count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const year = Math.floor(Math.random() * 4) + 1;
      
      students.push({
        id: i,
        studentId: `STU${new Date().getFullYear()}${String(i).padStart(3, '0')}`,
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.college.edu`,
        phone: this.generatePhone(),
        department: department,
        year: year,
        semester: Math.floor(Math.random() * 2) + 1,
        gpa: (Math.random() * 3 + 1).toFixed(2),
        status: this.randomChoice(['Active', 'Inactive', 'Graduated', 'Suspended'], [0.7, 0.1, 0.15, 0.05]),
        enrollmentDate: this.randomDate(new Date(2020, 0, 1), new Date()),
        address: this.generateAddress(),
        dateOfBirth: this.randomDate(new Date(1995, 0, 1), new Date(2005, 11, 31)),
        guardianName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        guardianPhone: this.generatePhone(),
        avatar: `/assets/images/avatars/student-${i % 10 + 1}.jpg`
      });
    }

    return students;
  }

  // Generate staff data
  generateStaff(count) {
    const staff = [];
    const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Business Administration', 'Psychology', 'Biology', 'Chemistry', 'Administration', 'Library'];
    const positions = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Administrative Officer', 'Lab Assistant', 'Librarian'];
    const firstNames = ['Dr. John', 'Dr. Sarah', 'Prof. Michael', 'Dr. Emily', 'Mr. David', 'Ms. Lisa', 'Dr. Robert', 'Prof. Mary'];
    const lastNames = ['Anderson', 'Wilson', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'White', 'Harris', 'Clark'];

    for (let i = 1; i <= count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const position = positions[Math.floor(Math.random() * positions.length)];
      
      staff.push({
        id: i,
        employeeId: `EMP${String(i).padStart(4, '0')}`,
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase().replace(/[^a-z]/g, '')}.${lastName.toLowerCase()}@college.edu`,
        phone: this.generatePhone(),
        department: department,
        position: position,
        salary: Math.floor(Math.random() * 50000) + 30000,
        hireDate: this.randomDate(new Date(2015, 0, 1), new Date()),
        status: this.randomChoice(['Active', 'On Leave', 'Inactive'], [0.85, 0.1, 0.05]),
        address: this.generateAddress(),
        dateOfBirth: this.randomDate(new Date(1970, 0, 1), new Date(1990, 11, 31)),
        qualification: this.randomChoice(['PhD', 'Masters', 'Bachelors'], [0.4, 0.4, 0.2]),
        avatar: `/assets/images/avatars/staff-${i % 8 + 1}.jpg`
      });
    }

    return staff;
  }

  // Generate courses data
  generateCourses(count) {
    const courses = [];
    const courseNames = [
      'Introduction to Programming', 'Data Structures', 'Database Systems', 'Web Development',
      'Machine Learning', 'Computer Networks', 'Software Engineering', 'Operating Systems',
      'Digital Electronics', 'Circuit Analysis', 'Control Systems', 'Power Systems',
      'Thermodynamics', 'Fluid Mechanics', 'Heat Transfer', 'Manufacturing Processes',
      'Structural Analysis', 'Concrete Technology', 'Transportation Engineering', 'Geotechnical Engineering'
    ];

    for (let i = 1; i <= count; i++) {
      const courseName = courseNames[i - 1] || `Course ${i}`;
      const credits = Math.floor(Math.random() * 3) + 2;
      
      courses.push({
        id: i,
        courseCode: `CS${String(i).padStart(3, '0')}`,
        courseName: courseName,
        credits: credits,
        department: this.randomChoice(['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering']),
        instructor: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`,
        semester: this.randomChoice(['Fall', 'Spring', 'Summer']),
        year: new Date().getFullYear(),
        maxStudents: Math.floor(Math.random() * 50) + 30,
        enrolledStudents: Math.floor(Math.random() * 40) + 15,
        schedule: {
          days: this.randomChoice([['Monday', 'Wednesday'], ['Tuesday', 'Thursday'], ['Monday', 'Wednesday', 'Friday']]),
          time: this.randomChoice(['09:00-10:30', '11:00-12:30', '14:00-15:30', '16:00-17:30'])
        },
        room: `Room ${Math.floor(Math.random() * 50) + 101}`,
        description: `This course covers fundamental concepts in ${courseName.toLowerCase()}.`,
        prerequisites: i > 5 ? [`CS${String(Math.floor(Math.random() * 5) + 1).padStart(3, '0')}`] : [],
        status: this.randomChoice(['Active', 'Inactive'], [0.9, 0.1])
      });
    }

    return courses;
  }

  // Generate admissions data
  generateAdmissions(count) {
    const admissions = [];
    const programs = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Business Administration'];
    const statuses = ['Pending', 'Under Review', 'Accepted', 'Rejected', 'Waitlisted'];

    for (let i = 1; i <= count; i++) {
      const firstName = ['John', 'Jane', 'Michael', 'Sarah', 'David'][Math.floor(Math.random() * 5)];
      const lastName = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)];
      
      admissions.push({
        id: i,
        applicationId: `APP${new Date().getFullYear()}${String(i).padStart(4, '0')}`,
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
        phone: this.generatePhone(),
        program: programs[Math.floor(Math.random() * programs.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        applicationDate: this.randomDate(new Date(2024, 0, 1), new Date()),
        highSchoolGPA: (Math.random() * 2 + 2).toFixed(2),
        testScore: Math.floor(Math.random() * 800) + 1200,
        address: this.generateAddress(),
        dateOfBirth: this.randomDate(new Date(2000, 0, 1), new Date(2008, 11, 31)),
        guardianName: `${['Robert', 'Mary', 'James', 'Patricia'][Math.floor(Math.random() * 4)]} ${lastName}`,
        guardianPhone: this.generatePhone(),
        documents: {
          transcript: Math.random() > 0.3,
          testScores: Math.random() > 0.2,
          recommendation1: Math.random() > 0.4,
          recommendation2: Math.random() > 0.5,
          essay: Math.random() > 0.3
        }
      });
    }

    return admissions;
  }

  // Generate fees data
  generateFees(count) {
    const fees = [];
    const feeTypes = ['Tuition', 'Lab Fee', 'Library Fee', 'Sports Fee', 'Development Fee', 'Exam Fee'];

    for (let i = 1; i <= count; i++) {
      const studentId = Math.floor(Math.random() * 50) + 1;
      const feeType = feeTypes[Math.floor(Math.random() * feeTypes.length)];
      const amount = Math.floor(Math.random() * 5000) + 500;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 60));
      
      fees.push({
        id: i,
        studentId: studentId,
        feeType: feeType,
        amount: amount,
        dueDate: dueDate,
        paidDate: Math.random() > 0.3 ? this.randomDate(new Date(2024, 0, 1), new Date()) : null,
        status: Math.random() > 0.3 ? 'Paid' : 'Pending',
        semester: this.randomChoice(['Fall 2024', 'Spring 2024', 'Summer 2024']),
        paymentMethod: Math.random() > 0.3 ? this.randomChoice(['Credit Card', 'Bank Transfer', 'Cash', 'Check']) : null,
        transactionId: Math.random() > 0.3 ? `TXN${Math.floor(Math.random() * 1000000)}` : null
      });
    }

    return fees;
  }

  // Generate library data
  generateLibraryData(count) {
    const books = [];
    const bookTitles = [
      'Introduction to Algorithms', 'Clean Code', 'Design Patterns', 'The Pragmatic Programmer',
      'Code Complete', 'Refactoring', 'The Clean Coder', 'JavaScript: The Good Parts',
      'Python Crash Course', 'Head First Design Patterns', 'Effective Java', 'The Art of Computer Programming',
      'Computer Networks', 'Operating System Concepts', 'Database System Concepts', 'Artificial Intelligence',
      'Machine Learning Yearning', 'Deep Learning', 'Pattern Recognition', 'Computer Vision'
    ];
    const authors = [
      'Thomas H. Cormen', 'Robert C. Martin', 'Gang of Four', 'Andy Hunt',
      'Steve McConnell', 'Martin Fowler', 'Douglas Crockford', 'Eric Matthes',
      'Joshua Bloch', 'Donald E. Knuth', 'Andrew S. Tanenbaum', 'Abraham Silberschatz',
      'Stuart Russell', 'Andrew Ng', 'Ian Goodfellow', 'Christopher Bishop'
    ];

    for (let i = 1; i <= count; i++) {
      const title = bookTitles[i - 1] || `Book Title ${i}`;
      const author = authors[Math.floor(Math.random() * authors.length)];
      
      books.push({
        id: i,
        isbn: `978-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 10)}`,
        title: title,
        author: author,
        category: this.randomChoice(['Computer Science', 'Engineering', 'Mathematics', 'Physics', 'General']),
        publisher: this.randomChoice(['MIT Press', 'Addison-Wesley', 'O\'Reilly', 'Pearson', 'Wiley']),
        publishYear: Math.floor(Math.random() * 20) + 2000,
        copies: Math.floor(Math.random() * 5) + 1,
        availableCopies: Math.floor(Math.random() * 3) + 1,
        location: `Section ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}${Math.floor(Math.random() * 10) + 1}`,
        status: this.randomChoice(['Available', 'Checked Out', 'Reserved'], [0.6, 0.3, 0.1])
      });
    }

    return books;
  }

  // Generate hostel data
  generateHostelData(count) {
    const rooms = [];
    const hostels = ['Hostel A', 'Hostel B', 'Hostel C', 'Girls Hostel', 'Boys Hostel'];

    for (let i = 1; i <= count; i++) {
      const hostel = hostels[Math.floor(Math.random() * hostels.length)];
      const floor = Math.floor(Math.random() * 3) + 1;
      const roomNumber = `${floor}${String(i % 20 + 1).padStart(2, '0')}`;
      const capacity = this.randomChoice([1, 2, 3], [0.3, 0.5, 0.2]);
      const occupied = Math.floor(Math.random() * (capacity + 1));
      
      rooms.push({
        id: i,
        hostel: hostel,
        roomNumber: roomNumber,
        floor: floor,
        capacity: capacity,
        occupied: occupied,
        available: capacity - occupied,
        type: capacity === 1 ? 'Single' : capacity === 2 ? 'Double' : 'Triple',
        rent: capacity === 1 ? 5000 : capacity === 2 ? 3500 : 2500,
        facilities: this.randomChoice([
          ['WiFi', 'AC', 'Attached Bathroom'],
          ['WiFi', 'Fan', 'Common Bathroom'],
          ['WiFi', 'AC', 'Attached Bathroom', 'Balcony']
        ]),
        status: occupied === capacity ? 'Full' : 'Available',
        residents: this.generateResidents(occupied)
      });
    }

    return rooms;
  }

  // Generate residents for hostel rooms
  generateResidents(count) {
    const residents = [];
    const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'];
    
    for (let i = 0; i < count; i++) {
      residents.push({
        name: names[Math.floor(Math.random() * names.length)],
        studentId: `STU${Math.floor(Math.random() * 1000) + 1}`,
        checkInDate: this.randomDate(new Date(2023, 8, 1), new Date())
      });
    }
    
    return residents;
  }

  // Generate exam data
  generateExamData(count) {
    const exams = [];
    const examTypes = ['Midterm', 'Final', 'Quiz', 'Assignment'];
    const courses = ['CS101', 'CS102', 'CS201', 'CS202', 'EE101', 'ME101'];

    for (let i = 1; i <= count; i++) {
      const course = courses[Math.floor(Math.random() * courses.length)];
      const examType = examTypes[Math.floor(Math.random() * examTypes.length)];
      const examDate = new Date();
      examDate.setDate(examDate.getDate() + Math.floor(Math.random() * 30));
      
      exams.push({
        id: i,
        examCode: `EX${String(i).padStart(3, '0')}`,
        course: course,
        examType: examType,
        title: `${course} ${examType}`,
        date: examDate,
        startTime: this.randomChoice(['09:00', '11:00', '14:00', '16:00']),
        duration: this.randomChoice([60, 90, 120, 180]),
        room: `Room ${Math.floor(Math.random() * 50) + 101}`,
        instructor: `Dr. ${['Smith', 'Johnson', 'Williams'][Math.floor(Math.random() * 3)]}`,
        maxMarks: this.randomChoice([50, 75, 100]),
        status: this.randomChoice(['Scheduled', 'Completed', 'Cancelled'], [0.6, 0.3, 0.1]),
        instructions: 'Please bring your student ID and writing materials.',
        registeredStudents: Math.floor(Math.random() * 40) + 10
      });
    }

    return exams;
  }

  // Generate announcements
  generateAnnouncements(count) {
    const announcements = [];
    const titles = [
      'Semester Registration Open',
      'Library Hours Extended',
      'New Course Offerings',
      'Campus Maintenance Notice',
      'Scholarship Applications',
      'Sports Event Schedule',
      'Career Fair Announcement',
      'Exam Schedule Released',
      'Holiday Schedule',
      'Fee Payment Deadline'
    ];

    for (let i = 1; i <= count; i++) {
      const title = titles[i - 1] || `Announcement ${i}`;
      const publishDate = this.randomDate(new Date(2024, 0, 1), new Date());
      
      announcements.push({
        id: i,
        title: title,
        content: `This is the content for ${title.toLowerCase()}. Important information for all students and staff.`,
        author: 'Administration',
        publishDate: publishDate,
        category: this.randomChoice(['Academic', 'Administrative', 'Events', 'General']),
        priority: this.randomChoice(['Low', 'Medium', 'High'], [0.5, 0.3, 0.2]),
        audience: this.randomChoice(['All', 'Students', 'Staff'], [0.4, 0.4, 0.2]),
        status: 'Published',
        expiryDate: new Date(publishDate.getTime() + (30 * 24 * 60 * 60 * 1000)) // 30 days from publish
      });
    }

    return announcements;
  }

  // Helper methods
  randomChoice(choices, weights = null) {
    if (weights) {
      const random = Math.random();
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (random <= sum) {
          return choices[i];
        }
      }
    }
    return choices[Math.floor(Math.random() * choices.length)];
  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  generatePhone() {
    return `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
  }

  generateAddress() {
    const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Maple Dr'];
    const cities = ['Springfield', 'Franklin', 'Georgetown', 'Madison', 'Arlington'];
    const states = ['CA', 'NY', 'TX', 'FL', 'IL'];
    
    return {
      street: `${Math.floor(Math.random() * 9999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`,
      city: cities[Math.floor(Math.random() * cities.length)],
      state: states[Math.floor(Math.random() * states.length)],
      zipCode: String(Math.floor(Math.random() * 90000) + 10000)
    };
  }

  // Methods to get specific data types
  getStudents() { return this.getData('students'); }
  getStaff() { return this.getData('staff'); }
  getCourses() { return this.getData('courses'); }
  getAdmissions() { return this.getData('admissions'); }
  getFees() { return this.getData('fees'); }
  getLibraryBooks() { return this.getData('library'); }
  getHostelRooms() { return this.getData('hostel'); }
  getExams() { return this.getData('exams'); }
  getAnnouncements() { return this.getData('announcements'); }

  // Method to reset all data
  resetData() {
    localStorage.removeItem('erpData');
    this.generateInitialData();
  }
}

// Initialize fake data generator
const fakeData = new FakeDataGenerator();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FakeDataGenerator;
}
