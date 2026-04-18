import React from 'react';
import { useAuth } from '../../context/AuthContext';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export default function FacultyDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
            <SupervisorAccountIcon sx={{ fontSize: 32 }} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back, {user?.name}! 👋
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Faculty Portal &bull; Department of CGU
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Ongoing Classes</p>
            <p className="text-2xl font-black text-slate-900">03</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Pending Assignments</p>
            <p className="text-2xl font-black text-slate-900">12</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Students Assisted</p>
            <p className="text-2xl font-black text-slate-900">140+</p>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 border-dashed text-center">
        <p className="text-rose-600 font-bold">
          Faculty features such as Attendance, Internal Marks, and Assignment Management are coming soon! 🚀
        </p>
      </div>
    </div>
  );
}
