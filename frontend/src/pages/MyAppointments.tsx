import { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';

import { Calendar, Clock } from 'lucide-react';

interface Appointment {
    serviceName: string;
    type: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
}

const MyAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await api.get('/appointments/me');
                setAppointments(data);
            } catch {
                setError('Failed to load appointments.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="space-y-6 transition-all duration-300 ease-out"
        >
            <div>
                <h1 className="text-2xl font-bold text-text-main">My Appointments</h1>
                <p className="text-text-muted mt-1">Manage all your booked services</p>
            </div>

            {error ? (
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl border border-neutral-300 dark:border-neutral-700">{error}</div>
            ) : loading ? (
                <div className="flex justify-center p-12">
                    <div className="w-8 h-8 rounded-full border-4 border-neutral-300 dark:border-neutral-700 border-t-neutral-600 dark:border-t-neutral-300 animate-spin"></div>
                </div>
            ) : appointments.length === 0 ? (
                <div className="text-center p-16 bg-surface rounded-xl border border-border-subtle border-dashed">
                    <Calendar className="w-12 h-12 text-neutral-500 opacity-70 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-main">No Appointments Yet</h3>
                    <p className="text-text-muted mt-1">Go to the dashboard to book a service.</p>
                </div>
            ) : (
                <div className="bg-surface rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap responsive-table">
                            <thead className="bg-background/50 text-text-muted font-medium border-b border-border-subtle text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Service</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Time</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {appointments.map((appt, idx) => (
                                    <tr key={idx} className="hover:bg-background/50 transition-colors">
                                        <td className="px-6 py-4" data-label="Service">
                                            <div className="font-semibold text-text-main">{appt.serviceName}</div>
                                            <div className="text-text-muted text-xs mt-0.5">{appt.type}</div>
                                        </td>
                                        <td className="px-6 py-4" data-label="Date">
                                            <div className="flex items-center gap-2 text-text-main font-medium">
                                                <Calendar className="w-4 h-4 opacity-50" />
                                                {appt.date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-text-muted" data-label="Time">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 opacity-50" />
                                                {appt.startTime} - {appt.endTime}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4" data-label="Status">
                                            {appt.status === 'BOOKED' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                                                    CONFIRMED
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                                                    CANCELLED
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default MyAppointments;
