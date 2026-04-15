import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layouts & Core
import Landing from './pages/Landing';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import ClubLayout from './layouts/ClubLayout';
import StudentLayout from './layouts/StudentLayout';
import PlacementLayout from './layouts/PlacementLayout';

// Lazy loading pages to drastically reduce lag and bundle size
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageStudents = lazy(() => import('./pages/admin/ManageStudents'));
const ManageClubs = lazy(() => import('./pages/admin/ManageClubs'));
const ManagePlacements = lazy(() => import('./pages/admin/ManagePlacements'));

const ClubDashboard = lazy(() => import('./pages/club/ClubDashboard'));
const ClubsPage = lazy(() => import('./pages/club/ClubsPage'));
const EventsPage = lazy(() => import('./pages/club/EventsPage'));
const ClubMembers = lazy(() => import('./pages/club/ClubMembers'));
const EventRegistrations = lazy(() => import('./pages/club/EventRegistrations'));
const ClubEventDetails = lazy(() => import('./pages/club/ClubEventDetails'));
const ClubDetails = lazy(() => import('./pages/club/ClubDetails'));

const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const StudentClubs = lazy(() => import('./pages/student/StudentClubs'));
const StudentEvents = lazy(() => import('./pages/student/StudentEvents'));
const StudentEventDetails = lazy(() => import('./pages/student/StudentEventDetails'));
const StudentClubDetails = lazy(() => import('./pages/student/StudentClubDetails'));
const MyActivities = lazy(() => import('./pages/student/MyActivities'));
const StudentInternships = lazy(() => import('./pages/student/StudentInternships'));
const StudentJobs = lazy(() => import('./pages/student/StudentJobs'));
const StudentCampusDrives = lazy(() => import('./pages/student/StudentCampusDrives'));
const StudentWorkshops = lazy(() => import('./pages/student/StudentWorkshops'));
const StudentConferences = lazy(() => import('./pages/student/StudentConferences'));
const FeeStructure = lazy(() => import('./pages/student/FeeStructure'));

const PlacementDashboard = lazy(() => import('./pages/placement/PlacementDashboard'));
const Internships = lazy(() => import('./pages/placement/Internships'));
const Jobs = lazy(() => import('./pages/placement/Jobs'));
const CampusDrives = lazy(() => import('./pages/placement/CampusDrives'));
const Workshops = lazy(() => import('./pages/placement/Workshops'));
const Conferences = lazy(() => import('./pages/placement/Conferences'));
const PlacementApplicants = lazy(() => import('./pages/placement/PlacementApplicants'));

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' } }} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="clubs" element={<ManageClubs />} />
            <Route path="placements" element={<ManagePlacements />} />
          </Route>

          {/* Club */}
          <Route path="/club" element={<ClubLayout />}>
            <Route path="dashboard" element={<ClubDashboard />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:id/registrations" element={<EventRegistrations />} />
            <Route path="events/:id/details" element={<ClubEventDetails />} />
            <Route path="clubs" element={<ClubsPage />} />
            <Route path="clubs/:id/members" element={<ClubMembers />} />
            <Route path="clubs/:id/details" element={<ClubDetails />} />
          </Route>

          {/* Student */}
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="fee-structure" element={<FeeStructure />} />
            <Route path="clubs" element={<StudentClubs />} />
            <Route path="clubs/:id" element={<StudentClubDetails />} />
            <Route path="events" element={<StudentEvents />} />
            <Route path="events/:id" element={<StudentEventDetails />} />
            <Route path="my-activities" element={<MyActivities />} />
            <Route path="internships" element={<StudentInternships />} />
            <Route path="jobs" element={<StudentJobs />} />
            <Route path="campus-drives" element={<StudentCampusDrives />} />
            <Route path="workshops" element={<StudentWorkshops />} />
            <Route path="conferences" element={<StudentConferences />} />
          </Route>

          {/* Placement */}
          <Route path="/placement" element={<PlacementLayout />}>
            <Route path="dashboard" element={<PlacementDashboard />} />
            <Route path="internships" element={<Internships />} />
            <Route path="internships/:id/applicants" element={<PlacementApplicants />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/:id/applicants" element={<PlacementApplicants />} />
            <Route path="campus-drives" element={<CampusDrives />} />
            <Route path="campus-drives/:id/applicants" element={<PlacementApplicants />} />
            <Route path="workshops" element={<Workshops />} />
            <Route path="workshops/:id/applicants" element={<PlacementApplicants />} />
            <Route path="conferences" element={<Conferences />} />
            <Route path="conferences/:id/applicants" element={<PlacementApplicants />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
