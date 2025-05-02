export enum Gender {
    MALE = "Male",
    FEMALE = "Female"
}

export enum Role {
    ADMINISTRATOR = "Administrator",
    RECEPTIONIST = "Receptionist",
    DOCTOR = "Doctor",
    PHARMACIST = "Pharmacist",
    LOGISTIC = "Logistic",
    CASHIER = "Cashier"
}

export enum BloodType {
    A = 'A',
    B = 'B',
    AB = 'AB',
    O = 'O'
}

export enum Payment {
    CASH = 'Cash',
    BPJS = 'BPJS'
}

export enum Religion {
    ISLAM = "Islam",
    KATOLIK = "Katolik",
    PROTESTAN = "Protestan",
    HINDU = "Hindu",
    BUDHA = "Budha",
    KONGHUCHU = "Konghuchu"
}

export enum WorkDays {
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday",
    SUNDAY = "Sunday"
}

export enum PatientStatus {
    EXAMINATION_WAIT = "Menunggu Pemeriksaan",
    EXAMINATION = "Pemeriksaan",
    PAYMENT_WAIT = "Menunggu Pembayaran",
    MEDICINE_WAIT = "Menunggu Pengambilan Obat"
}