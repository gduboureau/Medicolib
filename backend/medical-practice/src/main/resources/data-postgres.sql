--Ajout des profil Docteur

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality, mail)
VALUES ('Laetitia', 'Morel', 'F', 'Dermatologue', 'laetitia.morel@gmail.com');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality, mail)
VALUES ('Sanaa', 'Abadi', 'F', 'Neurologue', 'sanaa.abadi@gmail.com');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality, mail)
VALUES ('Céline', 'Dubé', 'F', 'Ophtalmologue', 'celine.dube@gmail.com');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality, mail)
VALUES ('Maxime', 'Bélanger', 'M', 'Pediatre', 'maxime.belanger@gmail.com');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality, mail)
VALUES ('Yannick', 'Rousseau', 'M', 'Generaliste', 'yannick.rousseau@gmail.com');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality, mail)
VALUES ('Maeva', 'Bernardin', 'F', 'Dentiste', 'maeva.bernardin@gmail.com');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality, mail)
VALUES ('Quentin', 'Attias', 'M', 'Neurologue', 'quentin.attias@gmail.com');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality, mail)
VALUES ('Isadora', 'Marques', 'F', 'Dermatologue', 'isadora.marques@gmail.com');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality, mail)
VALUES ('George', 'Simple', 'M', 'Cardiologue', 'george.simple@gmail.com');

--Ajout des compte utilisateur Docteur

INSERT INTO Users (Mail, password, userType)
VALUES ('laetitia.morel@gmail.com','laetitia.morel', 'doctor');

INSERT INTO Users (Mail, password, userType)
VALUES ('sanaa.abadi@gmail.com','sanaa.abadi', 'doctor');

INSERT INTO Users (Mail, password, userType)
VALUES ('celine.dube@gmail.com','celine.dube', 'doctor');

INSERT INTO Users (Mail, password, userType)
VALUES ('maxime.belanger@gmail.com','maxime.belanger', 'doctor');

INSERT INTO Users (Mail, password, userType)
VALUES ('yannick.rousseau@gmail.com','yannick.rousseau', 'doctor');

INSERT INTO Users (Mail, password, userType)
VALUES ('maeva.bernardin@gmail.com','maeva.bernardin', 'doctor');

INSERT INTO Users (Mail, password, userType)
VALUES ('quentin.attias@gmail.com','quentin.attias', 'doctor');

INSERT INTO Users (Mail, password, userType)
VALUES ('isadora.marques@gmail.com','isadora.marques', 'doctor');

INSERT INTO Users (Mail, password, userType)
VALUES ('george.simple@gmail.com','george.simple', 'doctor');

--Ajout de la liste de RDV par Docteur

-- Yannick Rousseau (Généraliste)

DO $$
DECLARE
    DoctorId uuid := '3a7fb51b-e691-4158-964d-a346fbacc8cc';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '15 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '15 minutes';
    END LOOP;
END $$;

-- Maeva Bernardin (Dentiste)

DO $$
DECLARE
    DoctorId uuid := '896dea6b-f514-4c59-8386-12a946ae4fcc';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- Isadora Marques (Dermatologue)

DO $$
DECLARE
    DoctorId uuid := 'f25a532d-a642-479c-853c-1cc7816e829a';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '15 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '15 minutes';
    END LOOP;
END $$;

-- Laetitia Morel (Dermatologue)

DO $$
DECLARE
    DoctorId uuid := 'e2e648d2-4a58-4369-aa4f-398dc8e3da4b';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '15 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '15 minutes';
    END LOOP;
END $$;

-- Céline Dubé (Ophtalmologue)

DO $$
DECLARE
    DoctorId uuid := '1cc96527-15b2-4d9e-b89b-5fcda66f04e4';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '15 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '15 minutes';
    END LOOP;
END $$;

-- Sanaa Abadi (Neurologue)

DO $$
DECLARE
    DoctorId uuid := '985dc899-4046-44b9-832f-3be49b4ac48a';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- Quentin Attias (Neurologue)

DO $$
DECLARE
    DoctorId uuid := 'd5daf4cd-bd35-4f47-b99f-6adfa1e2583c';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- Maxime Bélanger (Pédiatre)

DO $$
DECLARE
    DoctorId uuid := '2ac637b3-0eb2-449e-b86d-3dfaaba6c00c';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- George Simple (Cardiologue)

DO $$
DECLARE
    DoctorId uuid := '85a5d19b-1087-4b35-97fa-6c068b7cb205';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;