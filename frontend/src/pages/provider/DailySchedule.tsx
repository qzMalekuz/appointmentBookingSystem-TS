import { useState, useEffect } from 'react';
import api from '../../api/axios';

import { Calendar, Clock, UserRound } from 'lucide-react';

interface AppointmentType {
    appointmentId: string;
    userName: string;
    startTime: string;
    endTime: string;
    status: string;
}

interface ServiceSchedule {
    serviceId: string;
    serviceName: string;
    appointments: AppointmentType[];
}

const DailySchedule = () => {
    const [date, setDate] = useState(() => {
        return new Date().toISOString().split('T')[0];
    });

    const [scheduleData, setScheduleData] = useState<ServiceSchedule[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchSchedule = async (selectedDate: string) => {
        setLoading(true);
        setError('');
        try {
            const { data } = await api.get(`/providers/me/schedule?date=${selectedDate}`);
            setScheduleData(data.services || []);
        } catch (err) {
            setError('Failed to fetch daily schedule.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedule(date);
    }, [date]);

    // Flatten appointments or check if there are none
    const totalAppointments = scheduleData.reduce((acc, curr) => acc + curr.appointments.length, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Daily Schedule</h1>
                    <p className="text-text-muted mt-1">View your bookings for a specific day</p>
                </div>

                <div className="relative">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="pl-11 pr-4 py-2 border border-border-subtle rounded-lg text-sm font-medium bg-surface text-text-main shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    <Calendar className="w-5 h-5 text-text-muted opacity-50 absolute left-3.5 top-2.5 pointer-events-none" />
                </div>
            </div>

            {error ? (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>
            ) : loading ? (
                <div className="flex justify-center p-12">
                    <div className="w-8 h-8 rounded-full border-4 border-surface border-t-primary animate-spin"></div>
                </div>
            ) : totalAppointments === 0 ? (
                <div className="text-center p-16 bg-surface rounded-xl border border-border-subtle border-dashed">
                    <Clock className="w-12 h-12 text-primary opacity-50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-main">No Appointments</h3>
                    <p className="text-text-muted mt-1">You have no bookings for {date}.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {scheduleData.filter(s => s.appointments.length > 0).map((service) => (
                        <div key={service.serviceId}>
                            <h2 className="text-lg font-bold text-text-main mb-4 px-1">{service.serviceName}</h2>
                            <div className="bg-surface rounded-xl shadow-sm border border-border-subtle overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                        <thead className="bg-background/50 text-text-muted font-medium border-b border-border-subtle text-xs uppercase tracking-wider">
                                            <tr>
                                                <th className="px-6 py-4">Client</th>
                                                <th className="px-6 py-4">Time</th>
                                                <th className="px-6 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border-subtle">
                                            {service.appointments.map((appt) => (
                                                <tr key={appt.appointmentId} className="hover:bg-background/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                                                                <UserRound className="w-4 h-4 opacity-50" />
                                                            </div>
                                                            <span className="font-semibold text-text-main">{appt.userName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-text-muted font-medium tracking-wide">
                                                        {appt.startTime} - {appt.endTime}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {appt.status === 'BOOKED' ? (
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                                CONFIRMED
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-background text-text-muted border border-border-subtle">
                                                                {appt.status}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DailySchedule;
