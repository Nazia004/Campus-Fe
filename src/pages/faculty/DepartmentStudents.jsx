import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import api from '../../api';

export default function DepartmentStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/faculty/students')
      .then(({ data }) => setStudents(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <CircularProgress size={40} sx={{ color: 'var(--color-primary)' }} />
        <p className="text-slate-500 font-medium animate-pulse">Loading student records...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Departmental Student Directory</h1>
          <p className="text-slate-500 text-sm mt-1">Management and overview of all students in your department.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-xl border border-rose-100 italic text-rose-600 text-xs font-bold">
          {students.length} Total Students
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[100px] flex items-center justify-center -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform">
              <SchoolIcon sx={{ color: 'var(--color-primary)', opacity: 0.2, fontSize: 40 }} />
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 font-bold text-lg">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{student.name}</h3>
                  <p className="text-rose-600 text-xs font-bold uppercase tracking-wider">Year {student.year || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                   <BadgeIcon sx={{ fontSize: 16, opacity: 0.6 }} />
                   <span>{student.rollNumber || 'No Roll #'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                   <EmailIcon sx={{ fontSize: 16, opacity: 0.6 }} />
                   <span className="truncate">{student.email}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex gap-2">
                <button className="flex-1 bg-slate-900 text-white text-[11px] font-bold py-2 rounded-lg hover:bg-slate-800 transition-colors">
                  VIEW PROFILE
                </button>
                <button className="px-3 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors">
                  <EmailIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {students.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <SchoolIcon sx={{ fontSize: 48, color: 'var(--color-border)', mb: 2 }} />
          <p className="text-slate-500 font-medium">No students found in your department.</p>
        </div>
      )}
    </div>
  );
}
