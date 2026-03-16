import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { Card, CardBody } from '../components/Card';
import { Clock, User as UserIcon, ChevronDown } from 'lucide-react';

interface Service {
    id: string;
    name: string;
    type: string;
    durationMinutes: number;
    providerName: string;
}

const SERVICE_TYPES = ["ALL", "MEDICAL", "HOUSE_HELP", "BEAUTY", "FITNESS", "EDUCATION", "OTHER"];

const UserDashboard = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [filterType, setFilterType] = useState('ALL');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchServices = async (type: string) => {
        setLoading(true);
        try {
            const url = type === 'ALL' ? '/services' : `/services?type=${type}`;
            const { data } = await api.get(url);
            setServices(data);
        } catch {
            setError('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices(filterType);
    }, [filterType]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="space-y-6 transition-all duration-300 ease-out"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Available Services</h1>
                    <p className="text-text-muted text-sm mt-1">Book your next appointment</p>
                </div>

                {/* Filter select — perfectly aligned with custom chevron */}
                <div className="relative w-full sm:w-auto">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="appearance-none w-full sm:w-[160px] pl-4 pr-10 py-2.5 border border-neutral-300 dark:border-neutral-600 rounded-xl text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400 cursor-pointer font-medium transition-colors duration-300"
                    >
                        {SERVICE_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 w-4 h-4 text-text-muted" />
                </div>
            </div>

            {error ? (
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl border border-neutral-300 dark:border-neutral-700">{error}</div>
            ) : loading ? (
                <div className="flex justify-center p-12">
                    <div className="w-8 h-8 rounded-full border-4 border-neutral-300 dark:border-neutral-700 border-t-neutral-600 dark:border-t-neutral-300 animate-spin" />
                </div>
            ) : services.length === 0 ? (
                <div className="text-center p-12 bg-bg-card rounded-xl border border-border border-dashed">
                    <p className="text-text-muted">No services found for this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.35, delay: index * 0.04 }}
                            whileHover={{ y: -4 }}
                            className="transition-transform duration-200"
                        >
                        <Card className="hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 ease-out">
                            <CardBody className="flex flex-col h-full">
                                <div className="mb-4">
                                    <span className="inline-block px-2.5 py-1 bg-bg-hover text-text-muted text-xs font-semibold tracking-wide uppercase rounded-md mb-3">
                                        {service.type}
                                    </span>
                                    <h3 className="text-lg font-bold text-text-primary leading-tight mb-1">{service.name}</h3>
                                </div>

                                <div className="space-y-2 mt-auto text-sm text-text-muted mb-6">
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="w-4 h-4 opacity-50" />
                                        <span>{service.providerName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 opacity-50" />
                                        <span>{service.durationMinutes} minutes</span>
                                    </div>
                                </div>

                                <Link
                                    to={`/services/${service.id}`}
                                    className="w-full text-center py-2.5 px-4 bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-900 font-semibold rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-colors duration-300"
                                >
                                    View Slots
                                </Link>
                            </CardBody>
                        </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default UserDashboard;
