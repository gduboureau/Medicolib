CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS Patients;
CREATE TABLE Patients ( 
    PatientId varchar(80) CONSTRAINT Patient_key PRIMARY KEY,
    Firstname varchar(25) CONSTRAINT Firstname_null NOT NULL,
    Lastname varchar(25) CONSTRAINT Lastname_null NOT NULL,
    Gender char(1) CONSTRAINT Gender_check CHECK (Gender in ('M','F')),
    Birthday date CONSTRAINT Birthday_null NOT NULL,
    Weight float CONSTRAINT Weight_null NOT NULL,
    Height float CONSTRAINT Height_null NOT NULL,
    Mail varchar(320) CONSTRAINT Mail_null NOT NULL,
    Address varchar (250) CONSTRAINT Address_null NOT NULL,
    NumSocial varchar(20) constraint NumSocial_null NOT NULL
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users ( 
    Mail varchar(320) CONSTRAINT User_key PRIMARY KEY,
    password varchar(50) CONSTRAINT Password_null NOT NULL, 
    userType varchar(50) DEFAULT 'patient' CONSTRAINT userType_null NOT NULL
);

DROP TABLE IF EXISTS Consultations;
CREATE TABLE Consultations (
    ConsultationId uuid DEFAULT uuid_generate_v4() CONSTRAINT Consultaiton_key PRIMARY KEY,
    PatientId varchar(80) CONSTRAINT PatientId_null NOT NULL,
    DoctorId varchar(80) CONSTRAINT DoctorId_null NOT NULL,
    Day date CONSTRAINT day_null NOT NULL,
    Motif varchar(100) CONSTRAINT motif_null NOT NULL,
    PrescriptionsId uuid
);

DROP TABLE IF EXISTS Prescriptions;
CREATE TABLE Prescriptions (
    PrescriptionsId uuid CONSTRAINT PrescriptionsId_key PRIMARY KEY,
    documentName VARCHAR(255) NOT NULL,
    documentContent BYTEA NOT NULL
);


DROP TABLE IF EXISTS Doctors;
CREATE TABLE Doctors (
    DoctorId uuid DEFAULT uuid_generate_v4() CONSTRAINT Doctor_key PRIMARY KEY,
    Firstname varchar(25) CONSTRAINT Firstname_null NOT NULL,
    Lastname varchar(25) CONSTRAINT Lastname_null NOT NULL,
    Gender varchar(5) CONSTRAINT Gender_null NOT NULL,
    Speciality varchar(25) CONSTRAINT Speciality_null NOT NULL,
    Mail varchar(320) CONSTRAINT Mail_null NOT NULL,
    Informations text
);

DROP TABLE IF EXISTS Address;
CREATE TABLE Address (
    PatientId varchar(80) CONSTRAINT PatientId_key PRIMARY KEY,
    NumRue int CONSTRAINT NumRue_constraint check (NumRue > 0),
    NomRue varchar(50) CONSTRAINT NomRue_null NOT NULL,
    PostalCode int CONSTRAINT PostalCode_constraint check (PostalCode > 0),
    City varchar(25) CONSTRAINT City_null NOT NULL
);

DROP TABLE IF EXISTS Appointments;
CREATE TABLE Appointments (
    AppointmentId varchar(80) CONSTRAINT Appointment_key PRIMARY KEY,
    DoctorId uuid CONSTRAINT DoctorId_null NOT NULL,
    PatientId varchar(80) CONSTRAINT PatientId_null NOT NULL,
    Starttime timestamp CONSTRAINT start_null NOT NULL,
    EndTime timestamp CONSTRAINT end_null NOT NULL
);

DROP TABLE IF EXISTS AvailableTimeSlots;
CREATE TABLE AvailableTimeSlots(
	TimeSlotId uuid DEFAULT uuid_generate_v4() CONSTRAINT id_null NOT NULL,
    DoctorId uuid CONSTRAINT DoctorId_null NOT NULL,
    StartTime timestamp CONSTRAINT start_null NOT NULL,
    PRIMARY KEY (TimeSlotId, DoctorId, StartTime),
    EndTime timestamp CONSTRAINT end_null NOT NULL,
    Booked boolean
);

DROP TABLE IF EXISTS MedicalFile;
CREATE TABLE MedicalFile(
	MedicalFileId uuid DEFAULT uuid_generate_v4() CONSTRAINT MedicalFileId_key PRIMARY KEY,
    DoctorId uuid CONSTRAINT DoctorId_null NOT NULL,
    PatientId varchar(80) CONSTRAINT PatientId_null NOT NULL,
    ConsultationId uuid[] CONSTRAINT DoctorId_null NOT NULL
);

DROP TABLE IF EXISTS Documents;
CREATE TABLE Documents (
  documentId uuid DEFAULT uuid_generate_v4() CONSTRAINT documentId_key PRIMARY KEY,
  PatientId uuid CONSTRAINT PatientId_null NOT NULL,
  documentName VARCHAR(255) NOT NULL,
  documentContent BYTEA NOT NULL,
  appointmentId uuid CONSTRAINT appointmentId_null NOT NULL
);