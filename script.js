// ===== Student Counselling Management System - Full Application JS =====

// ===== DATA STORE (localStorage) =====
const KEYS = {
    students: 'scms_students',
    sessions: 'scms_sessions',
    appointments: 'scms_appointments',
    counsellors: 'scms_counsellors'
};

function getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
function genId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// ===== LOGIN =====
const VALID_USERS = [
    { username: 'admin', password: 'admin123', name: 'Admin' },
    { username: 'malini', password: 'malini123', name: 'Ms. Malini' },
    { username: 'gowri', password: 'gowri123', name: 'Ms. Gowri' }
];

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    const btn = document.getElementById('loginBtn');

    btn.classList.add('loading');
    errorEl.textContent = '';

    setTimeout(() => {
        const user = VALID_USERS.find(u => u.username === username && u.password === password);
        if (user) {
            sessionStorage.setItem('scms_loggedin', 'true');
            sessionStorage.setItem('scms_user', user.name);
            showApp();
        } else {
            errorEl.textContent = 'Invalid username or password. Please try again.';
            btn.classList.remove('loading');
        }
    }, 600);
}

function togglePassword() {
    const inp = document.getElementById('loginPassword');
    const icon = document.getElementById('eyeIcon');
    if (inp.type === 'password') {
        inp.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        inp.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function showApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';
    seedDemoData();
    setupNavigation();
    renderDashboard();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('scms_loggedin') === 'true') {
        showApp();
    }
});

// ===== SEED DEMO DATA (only once) =====
function seedDemoData() {
    if (localStorage.getItem('scms_seeded')) return;

    const counsellors = [
        { id: genId(), name: 'Ms. Malini', designation: 'Senior Counsellor', department: 'Psychology', phone: '9876543211', email: 'malini@college.edu' },
        { id: genId(), name: 'Ms. Gowri', designation: 'Counsellor', department: 'Psychology', phone: '9876543212', email: 'gowri@college.edu' }
    ];
    setData(KEYS.counsellors, counsellors);

    const students = [
        { id: genId(), name: 'Priya Krishnan', regNo: '2024CSE001', department: 'CSE', year: 'III', phone: '9001001001', email: 'priya@student.edu', issue: 'Academic' },
        { id: genId(), name: 'Arun Vijay', regNo: '2024ECE015', department: 'ECE', year: 'II', phone: '9001001002', email: 'arun@student.edu', issue: 'Career' },
        { id: genId(), name: 'Ravi Babu', regNo: '2024MECH008', department: 'MECH', year: 'IV', phone: '9001001003', email: 'ravi@student.edu', issue: 'Personal' },
        { id: genId(), name: 'Meena Muthu', regNo: '2024IT022', department: 'IT', year: 'I', phone: '9001001004', email: 'meena@student.edu', issue: 'Mental Health' },
        { id: genId(), name: 'Karthik S.', regNo: '2024CSE045', department: 'CSE', year: 'III', phone: '9001001005', email: 'karthik@student.edu', issue: 'Academic' },
        { id: genId(), name: 'Divya R.', regNo: '2024EEE010', department: 'EEE', year: 'II', phone: '9001001006', email: 'divya@student.edu', issue: 'Financial' },
        { id: genId(), name: 'Surya K.', regNo: '2024AIDS003', department: 'AIDS', year: 'I', phone: '9001001007', email: 'surya@student.edu', issue: 'Career' },
        { id: genId(), name: 'Lakshmi P.', regNo: '2024CIVIL012', department: 'CIVIL', year: 'III', phone: '9001001008', email: 'lakshmi@student.edu', issue: 'Attendance' }
    ];
    setData(KEYS.students, students);

    const today = new Date().toISOString().split('T')[0];
    const sessions = [
        { id: genId(), date: today, time: '10:00', studentId: students[0].id, counsellorId: counsellors[0].id, problem: 'Academic', remarks: 'Student facing difficulty in Data Structures. Suggested extra tutorials.', action: 'Referred to peer tutoring program.', status: 'Completed', followupDate: '', followupStatus: 'Pending' },
        { id: genId(), date: today, time: '11:30', studentId: students[1].id, counsellorId: counsellors[1].id, problem: 'Career', remarks: 'Confused about placement vs higher studies.', action: 'Shared career resources and scheduled mock interview.', status: 'Completed', followupDate: '', followupStatus: 'Improving' },
        { id: genId(), date: today, time: '15:30', studentId: students[2].id, counsellorId: counsellors[1].id, problem: 'Personal', remarks: 'Family issues affecting concentration.', action: 'Recommended regular check-ins and stress management techniques.', status: 'In Progress', followupDate: today, followupStatus: 'Pending' },
        { id: genId(), date: today, time: '14:00', studentId: students[3].id, counsellorId: counsellors[0].id, problem: 'Mental Health', remarks: 'Exhibiting signs of anxiety.', action: 'Suggested relaxation exercises and follow-up session.', status: 'Completed', followupDate: '', followupStatus: 'Pending' }
    ];
    setData(KEYS.sessions, sessions);

    const appointments = [
        { id: genId(), date: today, time: '10:00', studentId: students[0].id, counsellorId: counsellors[0].id, purpose: 'Academic', status: 'Scheduled' },
        { id: genId(), date: today, time: '11:30', studentId: students[1].id, counsellorId: counsellors[1].id, purpose: 'Career', status: 'Scheduled' },
        { id: genId(), date: today, time: '14:00', studentId: students[3].id, counsellorId: counsellors[1].id, purpose: 'Mental Health', status: 'Scheduled' }
    ];
    setData(KEYS.appointments, appointments);

    localStorage.setItem('scms_seeded', 'true');
}

// ===== NAVIGATION =====
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(item.dataset.page);
        });
    });
}

function navigateTo(page) {
    // Update sidebar
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navLink = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (navLink) navLink.classList.add('active');

    // Show page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const pageEl = document.getElementById('page-' + page);
    if (pageEl) pageEl.classList.add('active');

    // Render page content
    switch (page) {
        case 'dashboard': renderDashboard(); break;
        case 'students': renderStudents(); break;
        case 'sessions': renderSessions(); break;
        case 'appointments': renderAppointments(); break;
        case 'counsellors': renderCounsellors(); break;
        case 'reports': renderReports(); break;
        case 'history': renderHistory(); break;
    }
}

// ===== MODAL HELPERS =====
function openModal(id) {
    document.getElementById(id).classList.add('open');
    // Populate select dropdowns
    populateStudentSelects();
    populateCounsellorSelects();
}
function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== POPULATE SELECT HELPERS =====
function populateStudentSelects() {
    const students = getData(KEYS.students);
    const selects = ['sessionStudent', 'apptStudent'];
    selects.forEach(selId => {
        const sel = document.getElementById(selId);
        if (!sel) return;
        const val = sel.value;
        sel.innerHTML = '<option value="">Select Student</option>';
        students.forEach(s => {
            sel.innerHTML += `<option value="${s.id}">${s.name} (${s.regNo})</option>`;
        });
        sel.value = val;
    });
}

function populateCounsellorSelects() {
    const counsellors = getData(KEYS.counsellors);
    const selects = ['sessionCounsellor', 'apptCounsellor'];
    selects.forEach(selId => {
        const sel = document.getElementById(selId);
        if (!sel) return;
        const val = sel.value;
        sel.innerHTML = '<option value="">Select Counsellor</option>';
        counsellors.forEach(c => {
            sel.innerHTML += `<option value="${c.id}">${c.name}</option>`;
        });
        sel.value = val;
    });
}

// ===== HELPER =====
function getStudentName(id) {
    const s = getData(KEYS.students).find(s => s.id === id);
    return s ? s.name : 'Unknown';
}
function getCounsellorName(id) {
    const c = getData(KEYS.counsellors).find(c => c.id === id);
    return c ? c.name : 'Unknown';
}
function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
}
function badgeClass(type) {
    return 'badge badge-' + type.toLowerCase().replace(/\s+/g, '-');
}
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ===== AVATAR COLORS =====
const avatarColors = [
    { bg: '#e8d5f5', fg: '#7c3aed' },
    { bg: '#d5e8f5', fg: '#2563eb' },
    { bg: '#fce4ec', fg: '#e91e63' },
    { bg: '#fff3e0', fg: '#e65100' },
    { bg: '#d1fae5', fg: '#047857' },
    { bg: '#fef3c7', fg: '#92400e' },
    { bg: '#ede9fe', fg: '#6d28d9' },
    { bg: '#fce7f3', fg: '#be185d' },
];
function getAvatarColor(index) { return avatarColors[index % avatarColors.length]; }

// =======================================================================
// ===== 1. DASHBOARD =====
// =======================================================================
function renderDashboard() {
    const students = getData(KEYS.students);
    const sessions = getData(KEYS.sessions);
    const appointments = getData(KEYS.appointments);
    const counsellors = getData(KEYS.counsellors);

    // Stats
    document.getElementById('totalStudentsCount').textContent = students.length;
    document.getElementById('totalSessionsCount').textContent = sessions.length;
    const pending = appointments.filter(a => a.status === 'Scheduled');
    document.getElementById('pendingApptsCount').textContent = pending.length;
    document.getElementById('activeCounsellorsCount').textContent = counsellors.length;

    // Today's sessions
    const today = new Date().toISOString().split('T')[0];
    const todaySessions = sessions.filter(s => s.date === today);
    const list = document.getElementById('todaySessionsList');
    if (todaySessions.length === 0) {
        list.innerHTML = '<p class="empty-state">No sessions scheduled today</p>';
    } else {
        list.innerHTML = todaySessions.map((s, i) => {
            const col = getAvatarColor(i);
            const studentName = getStudentName(s.studentId);
            const counsellorName = getCounsellorName(s.counsellorId);
            const timeStr = s.time ? new Date('2000-01-01T' + s.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '';
            return `
                <div class="session-item">
                    <div class="session-avatar" style="background:${col.bg};color:${col.fg};">${getInitials(studentName)}</div>
                    <div class="session-info">
                        <span class="session-name">${studentName}</span>
                        <span class="session-time">${timeStr} — ${counsellorName}</span>
                    </div>
                    <span class="${badgeClass(s.problem)}">${s.problem}</span>
                </div>`;
        }).join('');
    }

    // Concern Distribution
    const issueCount = {};
    sessions.forEach(s => { issueCount[s.problem] = (issueCount[s.problem] || 0) + 1; });
    students.forEach(s => { if (s.issue) issueCount[s.issue] = (issueCount[s.issue] || 0) + 1; });
    const total = Object.values(issueCount).reduce((a, b) => a + b, 0) || 1;
    const issueColors = { 'Academic': '#1e3a5f', 'Career': '#0d9488', 'Mental Health': '#dc2626', 'Personal': '#ea580c', 'Financial': '#2563eb', 'Attendance': '#64748b', 'Others': '#6b7280' };
    const sorted = Object.entries(issueCount).sort((a, b) => b[1] - a[1]);
    const chartEl = document.getElementById('concernChart');
    chartEl.innerHTML = sorted.map(([label, count]) => {
        const pct = Math.round(count / total * 100);
        const color = issueColors[label] || '#64748b';
        return `
            <div class="concern-item">
                <span class="concern-label">${label}</span>
                <div class="concern-bar-wrap">
                    <div class="concern-bar" style="width:${pct}%;background:${color};"></div>
                </div>
                <span class="concern-pct">${pct}%</span>
            </div>`;
    }).join('');

    // Alerts
    const alertsList = document.getElementById('alertsList');
    const alerts = [];

    // Check for students with multiple sessions & issues
    const studentSessionCount = {};
    sessions.forEach(s => { studentSessionCount[s.studentId] = (studentSessionCount[s.studentId] || 0) + 1; });
    const highRisk = Object.entries(studentSessionCount).filter(([_, c]) => c >= 3);
    highRisk.forEach(([sid, count]) => {
        alerts.push({ type: 'red', title: `High-risk student: ${getStudentName(sid)}`, desc: `${count} sessions recorded — monitor closely` });
    });

    // Overdue appointments
    const overdue = appointments.filter(a => a.status === 'Scheduled' && a.date < today);
    if (overdue.length > 0) {
        alerts.push({ type: 'orange', title: `${overdue.length} overdue appointment(s)`, desc: 'Some appointments are past their scheduled date' });
    }
    document.getElementById('overdueCount').textContent = overdue.length + ' overdue';

    // Pending followups
    const pendingFollowups = sessions.filter(s => s.followupStatus === 'Pending' && s.followupDate);
    if (pendingFollowups.length > 0) {
        alerts.push({ type: 'blue', title: `${pendingFollowups.length} follow-up(s) pending`, desc: 'Students need follow-up check-ins' });
    }

    // Total students
    alerts.push({ type: 'green', title: `${students.length} students registered`, desc: `${counsellors.length} counsellors active in the system` });

    alertsList.innerHTML = alerts.map(a => `
        <div class="alert-item alert-${a.type}">
            <span class="alert-dot ${a.type}"></span>
            <div class="alert-content">
                <strong>${a.title}</strong>
                <p>${a.desc}</p>
            </div>
        </div>`).join('');
}

// =======================================================================
// ===== 2. STUDENTS =====
// =======================================================================
function renderStudents() {
    const students = getData(KEYS.students);
    const body = document.getElementById('studentsBody');
    const empty = document.getElementById('studentsEmpty');
    document.getElementById('studentCountLabel').textContent = students.length + ' registered';

    if (students.length === 0) {
        body.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';
    body.innerHTML = students.map(s => `
        <tr>
            <td><strong>${s.regNo}</strong></td>
            <td>${s.name}</td>
            <td>${s.department}</td>
            <td>${s.year} Year</td>
            <td>${s.phone}</td>
            <td>${s.email || '—'}</td>
            <td>${s.issue ? `<span class="${badgeClass(s.issue)}">${s.issue}</span>` : '—'}</td>
            <td class="td-actions">
                <button class="btn-sm edit" onclick="editStudent('${s.id}')"><i class="fas fa-pen"></i></button>
                <button class="btn-sm delete" onclick="deleteStudent('${s.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`).join('');
}

function saveStudent(e) {
    e.preventDefault();
    const students = getData(KEYS.students);
    const editId = document.getElementById('studentEditId').value;
    const data = {
        name: document.getElementById('studentName').value.trim(),
        regNo: document.getElementById('studentRegNo').value.trim(),
        department: document.getElementById('studentDept').value,
        year: document.getElementById('studentYear').value,
        phone: document.getElementById('studentPhone').value.trim(),
        email: document.getElementById('studentEmail').value.trim(),
        issue: document.getElementById('studentIssue').value
    };

    if (editId) {
        const idx = students.findIndex(s => s.id === editId);
        if (idx !== -1) { students[idx] = { ...students[idx], ...data }; }
    } else {
        data.id = genId();
        students.push(data);
    }

    setData(KEYS.students, students);
    closeModal('studentModal');
    document.getElementById('studentForm').reset();
    document.getElementById('studentEditId').value = '';
    document.getElementById('studentModalTitle').textContent = '📋 Register New Student';
    renderStudents();
    showToast(editId ? 'Student updated!' : 'Student registered!');
}

function editStudent(id) {
    const s = getData(KEYS.students).find(s => s.id === id);
    if (!s) return;
    document.getElementById('studentEditId').value = s.id;
    document.getElementById('studentName').value = s.name;
    document.getElementById('studentRegNo').value = s.regNo;
    document.getElementById('studentDept').value = s.department;
    document.getElementById('studentYear').value = s.year;
    document.getElementById('studentPhone').value = s.phone;
    document.getElementById('studentEmail').value = s.email || '';
    document.getElementById('studentIssue').value = s.issue || '';
    document.getElementById('studentModalTitle').textContent = '✏️ Edit Student';
    openModal('studentModal');
}

function deleteStudent(id) {
    if (!confirm('Delete this student?')) return;
    let students = getData(KEYS.students);
    students = students.filter(s => s.id !== id);
    setData(KEYS.students, students);
    renderStudents();
    showToast('Student deleted');
}

function filterStudents() {
    const q = document.getElementById('studentSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#studentsBody tr');
    rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
}

// =======================================================================
// ===== 3. SESSIONS =====
// =======================================================================
function renderSessions() {
    const sessions = getData(KEYS.sessions);
    const body = document.getElementById('sessionsBody');
    const empty = document.getElementById('sessionsEmpty');
    document.getElementById('sessionCountLabel').textContent = sessions.length + ' sessions';

    if (sessions.length === 0) {
        body.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';
    body.innerHTML = sessions.map(s => `
        <tr>
            <td>${formatDate(s.date)}${s.time ? '<br><small style="color:var(--text-secondary)">' + s.time + '</small>' : ''}</td>
            <td>${getStudentName(s.studentId)}</td>
            <td>${getCounsellorName(s.counsellorId)}</td>
            <td><span class="${badgeClass(s.problem)}">${s.problem}</span></td>
            <td style="max-width:180px;">${s.remarks || '—'}</td>
            <td style="max-width:180px;">${s.action || '—'}</td>
            <td><span class="${badgeClass(s.status)}">${s.status}</span></td>
            <td class="td-actions">
                <button class="btn-sm edit" onclick="editSession('${s.id}')"><i class="fas fa-pen"></i></button>
                <button class="btn-sm delete" onclick="deleteSession('${s.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`).join('');
}

function saveSession(e) {
    e.preventDefault();
    const sessions = getData(KEYS.sessions);
    const editId = document.getElementById('sessionEditId').value;
    const data = {
        date: document.getElementById('sessionDate').value,
        time: document.getElementById('sessionTime').value,
        studentId: document.getElementById('sessionStudent').value,
        counsellorId: document.getElementById('sessionCounsellor').value,
        problem: document.getElementById('sessionProblem').value,
        remarks: document.getElementById('sessionRemarks').value.trim(),
        action: document.getElementById('sessionAction').value.trim(),
        status: document.getElementById('sessionStatus').value,
        followupDate: document.getElementById('sessionFollowupDate').value,
        followupStatus: document.getElementById('sessionFollowupStatus').value
    };

    if (editId) {
        const idx = sessions.findIndex(s => s.id === editId);
        if (idx !== -1) sessions[idx] = { ...sessions[idx], ...data };
    } else {
        data.id = genId();
        sessions.push(data);
    }

    setData(KEYS.sessions, sessions);
    closeModal('sessionModal');
    document.getElementById('sessionForm').reset();
    document.getElementById('sessionEditId').value = '';
    document.getElementById('sessionModalTitle').textContent = '🧠 Record Counselling Session';
    renderSessions();
    showToast(editId ? 'Session updated!' : 'Session recorded!');
}

function editSession(id) {
    const s = getData(KEYS.sessions).find(s => s.id === id);
    if (!s) return;
    document.getElementById('sessionEditId').value = s.id;
    document.getElementById('sessionDate').value = s.date;
    document.getElementById('sessionTime').value = s.time || '';
    document.getElementById('sessionProblem').value = s.problem;
    document.getElementById('sessionRemarks').value = s.remarks || '';
    document.getElementById('sessionAction').value = s.action || '';
    document.getElementById('sessionStatus').value = s.status;
    document.getElementById('sessionFollowupDate').value = s.followupDate || '';
    document.getElementById('sessionFollowupStatus').value = s.followupStatus || 'Pending';
    document.getElementById('sessionModalTitle').textContent = '✏️ Edit Session';
    openModal('sessionModal');
    // Set student & counsellor after selects are populated
    setTimeout(() => {
        document.getElementById('sessionStudent').value = s.studentId;
        document.getElementById('sessionCounsellor').value = s.counsellorId;
    }, 50);
}

function deleteSession(id) {
    if (!confirm('Delete this session?')) return;
    let sessions = getData(KEYS.sessions);
    sessions = sessions.filter(s => s.id !== id);
    setData(KEYS.sessions, sessions);
    renderSessions();
    showToast('Session deleted');
}

// =======================================================================
// ===== 4. APPOINTMENTS =====
// =======================================================================
function renderAppointments() {
    const appts = getData(KEYS.appointments);
    const body = document.getElementById('appointmentsBody');
    const empty = document.getElementById('appointmentsEmpty');
    document.getElementById('apptCountLabel').textContent = appts.length + ' appointments';

    if (appts.length === 0) {
        body.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';
    body.innerHTML = appts.map(a => `
        <tr>
            <td>${formatDate(a.date)}<br><small style="color:var(--text-secondary)">${a.time || ''}</small></td>
            <td>${getStudentName(a.studentId)}</td>
            <td>${getCounsellorName(a.counsellorId)}</td>
            <td><span class="${badgeClass(a.purpose)}">${a.purpose}</span></td>
            <td><span class="${badgeClass(a.status)}">${a.status}</span></td>
            <td class="td-actions">
                ${a.status === 'Scheduled' ? `<button class="btn-sm view" onclick="completeAppointment('${a.id}')" title="Mark Completed"><i class="fas fa-check"></i></button>` : ''}
                <button class="btn-sm edit" onclick="editAppointment('${a.id}')"><i class="fas fa-pen"></i></button>
                <button class="btn-sm delete" onclick="deleteAppointment('${a.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`).join('');
}

function saveAppointment(e) {
    e.preventDefault();
    const appts = getData(KEYS.appointments);
    const editId = document.getElementById('apptEditId').value;
    const data = {
        date: document.getElementById('apptDate').value,
        time: document.getElementById('apptTime').value,
        studentId: document.getElementById('apptStudent').value,
        counsellorId: document.getElementById('apptCounsellor').value,
        purpose: document.getElementById('apptPurpose').value,
        status: 'Scheduled'
    };

    if (editId) {
        const idx = appts.findIndex(a => a.id === editId);
        if (idx !== -1) {
            data.status = appts[idx].status;
            appts[idx] = { ...appts[idx], ...data };
        }
    } else {
        data.id = genId();
        appts.push(data);
    }

    setData(KEYS.appointments, appts);
    closeModal('appointmentModal');
    document.getElementById('appointmentForm').reset();
    document.getElementById('apptEditId').value = '';
    renderAppointments();
    showToast(editId ? 'Appointment updated!' : 'Appointment scheduled!');
}

function editAppointment(id) {
    const a = getData(KEYS.appointments).find(a => a.id === id);
    if (!a) return;
    document.getElementById('apptEditId').value = a.id;
    document.getElementById('apptDate').value = a.date;
    document.getElementById('apptTime').value = a.time || '';
    document.getElementById('apptPurpose').value = a.purpose || 'Academic';
    document.getElementById('appointmentModalTitle').textContent = '✏️ Edit Appointment';
    openModal('appointmentModal');
    setTimeout(() => {
        document.getElementById('apptStudent').value = a.studentId;
        document.getElementById('apptCounsellor').value = a.counsellorId;
    }, 50);
}

function deleteAppointment(id) {
    if (!confirm('Delete this appointment?')) return;
    let appts = getData(KEYS.appointments);
    appts = appts.filter(a => a.id !== id);
    setData(KEYS.appointments, appts);
    renderAppointments();
    showToast('Appointment deleted');
}

function completeAppointment(id) {
    const appts = getData(KEYS.appointments);
    const idx = appts.findIndex(a => a.id === id);
    if (idx !== -1) {
        appts[idx].status = 'Completed';
        setData(KEYS.appointments, appts);
        renderAppointments();
        showToast('Appointment marked as completed');
    }
}

// =======================================================================
// ===== 5. COUNSELLORS =====
// =======================================================================
function renderCounsellors() {
    const counsellors = getData(KEYS.counsellors);
    const grid = document.getElementById('counsellorGrid');
    const empty = document.getElementById('counsellorsEmpty');
    document.getElementById('counsellorCountLabel').textContent = counsellors.length + ' counsellors';

    if (counsellors.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';
    grid.innerHTML = counsellors.map((c, i) => {
        const col = getAvatarColor(i);
        const sessions = getData(KEYS.sessions).filter(s => s.counsellorId === c.id);
        return `
        <div class="counsellor-card">
            <div class="c-avatar" style="background:${col.bg};color:${col.fg};">${getInitials(c.name)}</div>
            <div class="c-name">${c.name}</div>
            <div class="c-desig">${c.designation}</div>
            <div class="c-dept">${c.department || ''}</div>
            <div class="c-contact">
                ${c.phone ? '<i class="fas fa-phone"></i> ' + c.phone : ''}
                ${c.email ? '<br><i class="fas fa-envelope"></i> ' + c.email : ''}
            </div>
            <div style="margin-top:10px;font-size:0.82rem;color:var(--text-secondary);">
                <strong>${sessions.length}</strong> sessions conducted
            </div>
            <div class="c-actions">
                <button class="btn-sm edit" onclick="editCounsellor('${c.id}')"><i class="fas fa-pen"></i></button>
                <button class="btn-sm delete" onclick="deleteCounsellor('${c.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </div>`;
    }).join('');
}

function saveCounsellor(e) {
    e.preventDefault();
    const counsellors = getData(KEYS.counsellors);
    const editId = document.getElementById('counsellorEditId').value;
    const data = {
        name: document.getElementById('counsellorName').value.trim(),
        designation: document.getElementById('counsellorDesig').value.trim(),
        department: document.getElementById('counsellorDept').value.trim(),
        phone: document.getElementById('counsellorPhone').value.trim(),
        email: document.getElementById('counsellorEmail').value.trim()
    };

    if (editId) {
        const idx = counsellors.findIndex(c => c.id === editId);
        if (idx !== -1) counsellors[idx] = { ...counsellors[idx], ...data };
    } else {
        data.id = genId();
        counsellors.push(data);
    }

    setData(KEYS.counsellors, counsellors);
    closeModal('counsellorModal');
    document.getElementById('counsellorForm').reset();
    document.getElementById('counsellorEditId').value = '';
    document.getElementById('counsellorModalTitle').textContent = '👩‍🏫 Add Counsellor';
    renderCounsellors();
    showToast(editId ? 'Counsellor updated!' : 'Counsellor added!');
}

function editCounsellor(id) {
    const c = getData(KEYS.counsellors).find(c => c.id === id);
    if (!c) return;
    document.getElementById('counsellorEditId').value = c.id;
    document.getElementById('counsellorName').value = c.name;
    document.getElementById('counsellorDesig').value = c.designation;
    document.getElementById('counsellorDept').value = c.department || '';
    document.getElementById('counsellorPhone').value = c.phone || '';
    document.getElementById('counsellorEmail').value = c.email || '';
    document.getElementById('counsellorModalTitle').textContent = '✏️ Edit Counsellor';
    openModal('counsellorModal');
}

function deleteCounsellor(id) {
    if (!confirm('Delete this counsellor?')) return;
    let counsellors = getData(KEYS.counsellors);
    counsellors = counsellors.filter(c => c.id !== id);
    setData(KEYS.counsellors, counsellors);
    renderCounsellors();
    showToast('Counsellor removed');
}

// =======================================================================
// ===== 6. REPORTS =====
// =======================================================================
function renderReports() {
    const students = getData(KEYS.students);
    const sessions = getData(KEYS.sessions);
    const appointments = getData(KEYS.appointments);
    const counsellors = getData(KEYS.counsellors);

    // Department chart
    const deptCount = {};
    students.forEach(s => { deptCount[s.department] = (deptCount[s.department] || 0) + 1; });
    renderBarChart('reportDeptChart', deptCount, '#1a3c34');

    // Issues chart
    const issueCount = {};
    sessions.forEach(s => { issueCount[s.problem] = (issueCount[s.problem] || 0) + 1; });
    const issueColors = { 'Academic': '#1e3a5f', 'Career': '#0d9488', 'Mental Health': '#dc2626', 'Personal': '#ea580c', 'Financial': '#2563eb', 'Attendance': '#64748b', 'Others': '#6b7280' };
    renderBarChart('reportIssueChart', issueCount, null, issueColors);

    // Monthly sessions
    const monthCount = {};
    sessions.forEach(s => {
        if (s.date) {
            const month = new Date(s.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            monthCount[month] = (monthCount[month] || 0) + 1;
        }
    });
    renderBarChart('reportMonthlyChart', monthCount, '#2563eb');

    // Follow-up status
    const followCount = {};
    sessions.forEach(s => {
        const status = s.followupStatus || 'Pending';
        followCount[status] = (followCount[status] || 0) + 1;
    });
    const followColors = { 'Pending': '#ea580c', 'Improving': '#16a34a', 'Not Improved': '#dc2626', 'Resolved': '#0d9488' };
    renderBarChart('reportFollowupChart', followCount, null, followColors);

    // Summary
    const completedSessions = sessions.filter(s => s.status === 'Completed').length;
    const resolvedCases = sessions.filter(s => s.followupStatus === 'Resolved').length;
    document.getElementById('summaryStats').innerHTML = `
        <div class="summary-item"><div class="s-value">${students.length}</div><div class="s-label">Total Students</div></div>
        <div class="summary-item"><div class="s-value">${sessions.length}</div><div class="s-label">Total Sessions</div></div>
        <div class="summary-item"><div class="s-value">${completedSessions}</div><div class="s-label">Completed Sessions</div></div>
        <div class="summary-item"><div class="s-value">${appointments.length}</div><div class="s-label">Total Appointments</div></div>
        <div class="summary-item"><div class="s-value">${counsellors.length}</div><div class="s-label">Counsellors</div></div>
        <div class="summary-item"><div class="s-value">${resolvedCases}</div><div class="s-label">Resolved Cases</div></div>
    `;
}

function renderBarChart(containerId, data, defaultColor, colorMap) {
    const container = document.getElementById(containerId);
    const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const max = entries.length > 0 ? Math.max(...entries.map(e => e[1])) : 1;

    if (entries.length === 0) {
        container.innerHTML = '<p class="empty-state" style="padding:20px;">No data available</p>';
        return;
    }

    container.innerHTML = '<div class="bar-chart">' + entries.map(([label, count]) => {
        const pct = Math.round(count / max * 100);
        const color = colorMap ? (colorMap[label] || '#64748b') : (defaultColor || '#1a3c34');
        return `
            <div class="bar-row">
                <span class="bar-label">${label}</span>
                <div class="bar-track">
                    <div class="bar-fill" style="width:${pct}%;background:${color};"><span>${count}</span></div>
                </div>
            </div>`;
    }).join('') + '</div>';
}

// =======================================================================
// ===== 7. HISTORY / FOLLOW-UP =====
// =======================================================================
function renderHistory() {
    const sessions = getData(KEYS.sessions);
    const body = document.getElementById('historyBody');
    const empty = document.getElementById('historyEmpty');
    document.getElementById('historyCountLabel').textContent = sessions.length + ' records';

    if (sessions.length === 0) {
        body.innerHTML = '';
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';
    body.innerHTML = sessions.map(s => `
        <tr>
            <td>${getStudentName(s.studentId)}</td>
            <td>${formatDate(s.date)}</td>
            <td><span class="${badgeClass(s.problem)}">${s.problem}</span></td>
            <td style="max-width:200px;">${s.remarks || '—'}</td>
            <td>${s.followupDate ? formatDate(s.followupDate) : '—'}</td>
            <td><span class="${badgeClass(s.followupStatus || 'Pending')}">${s.followupStatus || 'Pending'}</span></td>
            <td class="td-actions">
                <button class="btn-sm view" onclick="updateFollowup('${s.id}', 'Improving')" title="Mark Improving"><i class="fas fa-arrow-trend-up"></i></button>
                <button class="btn-sm edit" onclick="updateFollowup('${s.id}', 'Resolved')" title="Mark Resolved"><i class="fas fa-check-double"></i></button>
                <button class="btn-sm delete" onclick="updateFollowup('${s.id}', 'Not Improved')" title="Not Improved"><i class="fas fa-arrow-trend-down"></i></button>
            </td>
        </tr>`).join('');
}

function updateFollowup(sessionId, status) {
    const sessions = getData(KEYS.sessions);
    const idx = sessions.findIndex(s => s.id === sessionId);
    if (idx !== -1) {
        sessions[idx].followupStatus = status;
        setData(KEYS.sessions, sessions);
        renderHistory();
        showToast(`Follow-up status updated to: ${status}`);
    }
}
