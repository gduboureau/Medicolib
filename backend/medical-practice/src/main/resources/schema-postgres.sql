CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS Patients;
CREATE TABLE Patients ( 
    PatientId uuid DEFAULT uuid_generate_v4() CONSTRAINT Patient_key PRIMARY KEY,
    Firstname varchar(25) CONSTRAINT Firstname_null NOT NULL,
    Lastname varchar(25) CONSTRAINT Lastname_null NOT NULL,
    Gender char(1) CONSTRAINT Gender_check CHECK (Gender in ('M','F')),
    Birthday date CONSTRAINT Birthday_null NOT NULL,
    Weight float CONSTRAINT Weight_null NOT NULL,
    Height float CONSTRAINT Height_null NOT NULL,
    Mail varchar(320) CONSTRAINT Mail_null NOT NULL,
    Address varchar (250) CONSTRAINT Address_null NOT NULL
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users ( 
    Mail varchar(320) CONSTRAINT User_key PRIMARY KEY,
    password varchar(50) CONSTRAINT Password_null NOT NULL
);

DROP TABLE IF EXISTS Consultations;
CREATE TABLE Consultations (
    ConsultationId uuid DEFAULT uuid_generate_v4() CONSTRAINT Consultaiton_key PRIMARY KEY,
    PatientId varchar(80) CONSTRAINT PatientId_null NOT NULL,
    Date date CONSTRAINT Date_null NOT NULL,
    BeginConsultation time CONSTRAINT BeginConsultation_null NOT NULL,
    EndConsultation time CONSTRAINT EndConsultation_null NOT NULL,
    DoctorId varchar(80) CONSTRAINT DoctorId_null NOT NULL
);

DROP TABLE IF EXISTS Doctors;
CREATE TABLE Doctors (
    DoctorId uuid DEFAULT uuid_generate_v4() CONSTRAINT Doctor_key PRIMARY KEY,
    Firstname varchar(25) CONSTRAINT Firstname_null NOT NULL,
    Lastname varchar(25) CONSTRAINT Lastname_null NOT NULL,
    Speciality varchar(25) CONSTRAINT Speciality_check CHECK (Speciality in ('Neurologue','Generaliste', 'Dermatologue', 'Dentiste', 'Ophtalmologue', 'Pediatre'))
);

