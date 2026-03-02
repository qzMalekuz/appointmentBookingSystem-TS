import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
    console.log('Clearing old data...');
    await prisma.appointment.deleteMany();
    await prisma.availability.deleteMany();
    await prisma.service.deleteMany();
    await prisma.user.deleteMany();

    console.log('Seeding new data...');
    const passwordHash = await bcrypt.hash('password123', 10);

    // ==========================================
    // USERS
    // ==========================================
    const alice = await prisma.user.create({
        data: { name: 'Alice User', email: 'alice@example.com', passwordHash, role: 'USER' },
    });
    const john = await prisma.user.create({
        data: { name: 'John Doe', email: 'john@example.com', passwordHash, role: 'USER' },
    });
    const jane = await prisma.user.create({
        data: { name: 'Jane Smith', email: 'jane@example.com', passwordHash, role: 'USER' },
    });

    // ==========================================
    // PROVIDERS
    // ==========================================
    const bob = await prisma.user.create({
        data: { name: 'Dr. Bob Provider', email: 'bob@example.com', passwordHash, role: 'SERVICE_PROVIDER' },
    });
    const sarah = await prisma.user.create({
        data: { name: 'Sarah Cleaning', email: 'sarah@example.com', passwordHash, role: 'SERVICE_PROVIDER' },
    });
    const bella = await prisma.user.create({
        data: { name: 'Bella Salon', email: 'bella@example.com', passwordHash, role: 'SERVICE_PROVIDER' },
    });
    const fitpro = await prisma.user.create({
        data: { name: 'FitPro Trainer', email: 'fitpro@example.com', passwordHash, role: 'SERVICE_PROVIDER' },
    });
    const tutor = await prisma.user.create({
        data: { name: 'LearnWell Academy', email: 'tutor@example.com', passwordHash, role: 'SERVICE_PROVIDER' },
    });

    // ==========================================
    // SERVICES & AVAILABILITIES
    // ==========================================
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as any[];
    const weekend = ['Saturday', 'Sunday'] as any[];

    // 1. BOB - MEDICAL
    const checkup = await prisma.service.create({
        data: { name: 'General Checkup', type: 'MEDICAL', providerId: bob.id, durationMinutes: 30 },
    });
    const therapy = await prisma.service.create({
        data: { name: 'Therapy Session', type: 'MEDICAL', providerId: bob.id, durationMinutes: 60 },
    });
    for (const day of ['Monday', 'Wednesday', 'Friday']) {
        await prisma.availability.create({ data: { serviceId: checkup.id, dayOfWeek: day as any, startTime: '09:00', endTime: '12:00' } });
        await prisma.availability.create({ data: { serviceId: therapy.id, dayOfWeek: day as any, startTime: '13:00', endTime: '16:00' } });
    }

    // 2. SARAH - HOUSE HELP
    const deepClean = await prisma.service.create({
        data: { name: 'Deep Cleaning (3 hrs)', type: 'HOUSE_HELP', providerId: sarah.id, durationMinutes: 180 },
    });
    const standardClean = await prisma.service.create({
        data: { name: 'Standard Cleaning (1 hr)', type: 'HOUSE_HELP', providerId: sarah.id, durationMinutes: 60 },
    });
    for (const day of weekdays) {
        await prisma.availability.create({ data: { serviceId: standardClean.id, dayOfWeek: day as any, startTime: '08:00', endTime: '16:00' } });
    }
    await prisma.availability.create({ data: { serviceId: deepClean.id, dayOfWeek: 'Saturday', startTime: '09:00', endTime: '15:00' } });

    // 3. BELLA - BEAUTY
    const haircut = await prisma.service.create({
        data: { name: 'Haircut & Styling', type: 'BEAUTY', providerId: bella.id, durationMinutes: 45 },
    });
    const maniPedi = await prisma.service.create({
        data: { name: 'Manicure & Pedicure', type: 'BEAUTY', providerId: bella.id, durationMinutes: 90 },
    });
    for (const day of ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']) {
        await prisma.availability.create({ data: { serviceId: haircut.id, dayOfWeek: day as any, startTime: '10:00', endTime: '18:00' } });
        await prisma.availability.create({ data: { serviceId: maniPedi.id, dayOfWeek: day as any, startTime: '10:00', endTime: '18:00' } });
    }

    // 4. FITPRO - FITNESS
    const personalTraining = await prisma.service.create({
        data: { name: '1-on-1 Personal Training', type: 'FITNESS', providerId: fitpro.id, durationMinutes: 60 },
    });
    const yoga = await prisma.service.create({
        data: { name: 'Private Yoga Session', type: 'FITNESS', providerId: fitpro.id, durationMinutes: 60 },
    });
    for (const day of weekdays) {
        await prisma.availability.create({ data: { serviceId: personalTraining.id, dayOfWeek: day as any, startTime: '06:00', endTime: '10:00' } });
        await prisma.availability.create({ data: { serviceId: personalTraining.id, dayOfWeek: day as any, startTime: '17:00', endTime: '21:00' } });
    }
    for (const day of weekend) {
        await prisma.availability.create({ data: { serviceId: yoga.id, dayOfWeek: day as any, startTime: '07:00', endTime: '11:00' } });
    }

    // 5. TUTOR - EDUCATION
    const math = await prisma.service.create({
        data: { name: 'Math Tutoring', type: 'EDUCATION', providerId: tutor.id, durationMinutes: 60 },
    });
    const english = await prisma.service.create({
        data: { name: 'English Literature', type: 'EDUCATION', providerId: tutor.id, durationMinutes: 60 },
    });
    for (const day of weekdays) {
        await prisma.availability.create({ data: { serviceId: math.id, dayOfWeek: day as any, startTime: '15:00', endTime: '19:00' } });
        await prisma.availability.create({ data: { serviceId: english.id, dayOfWeek: day as any, startTime: '15:00', endTime: '19:00' } });
    }

    // ==========================================
    // APPOINTMENTS
    // ==========================================
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(0, 0, 0, 0);

    await prisma.appointment.create({
        data: {
            userId: alice.id,
            serviceId: checkup.id,
            date: tomorrow,
            startTime: '09:00',
            endTime: '09:30',
            slotId: `${checkup.id}_${tomorrow.toISOString().split('T')[0]}_09:00`,
            status: 'BOOKED'
        }
    });

    await prisma.appointment.create({
        data: {
            userId: john.id,
            serviceId: haircut.id,
            date: tomorrow,
            startTime: '10:00',
            endTime: '10:45',
            slotId: `${haircut.id}_${tomorrow.toISOString().split('T')[0]}_10:00`,
            status: 'BOOKED'
        }
    });

    await prisma.appointment.create({
        data: {
            userId: alice.id,
            serviceId: yoga.id,
            date: nextWeek,
            startTime: '07:00',
            endTime: '08:00',
            slotId: `${yoga.id}_${nextWeek.toISOString().split('T')[0]}_07:00`,
            status: 'BOOKED'
        }
    });

    await prisma.appointment.create({
        data: {
            userId: jane.id,
            serviceId: math.id,
            date: tomorrow,
            startTime: '15:00',
            endTime: '16:00',
            slotId: `${math.id}_${tomorrow.toISOString().split('T')[0]}_15:00`,
            status: 'BOOKED'
        }
    });

    console.log('\n=============================================');
    console.log(' Seeding complete! ');
    console.log('=============================================');
    console.log('\n👥 Users Login:');
    console.log('---------------------------------------------');
    console.log('- alice@example.com / password123');
    console.log('- john@example.com  / password123');
    console.log('- jane@example.com  / password123');

    console.log('\n Providers Login:');
    console.log('---------------------------------------------');
    console.log('- bob@example.com   [MEDICAL]    / password123');
    console.log('- sarah@example.com [HOUSE_HELP] / password123');
    console.log('- bella@example.com [BEAUTY]     / password123');
    console.log('- fitpro@example.com[FITNESS]    / password123');
    console.log('- tutor@example.com [EDUCATION]  / password123');
    console.log('=============================================\n');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
