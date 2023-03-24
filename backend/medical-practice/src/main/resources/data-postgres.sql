INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality)
VALUES ('Laetitia', 'Morel', 'F', 'Dermatologue');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality)
VALUES ('Sanaa', 'Abadi', 'F', 'Neurologue');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality)
VALUES ('Céline', 'Dubé', 'F', 'Ophtalmologue');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality)
VALUES ('Maxime', 'Bélanger', 'M', 'Pediatre');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality)
VALUES ('Yannick', 'Rousseau', 'M', 'Generaliste');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality)
VALUES ('Maeva', 'Bernardin', 'F', 'Dentiste');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality)
VALUES ('Quentin', 'Attias', 'M', 'Neurologue');

INSERT INTO Doctors (Firstname, Lastname, Gender, Speciality)
VALUES ('Isadora', 'Marques', 'F', 'Dermatologue');



INSERT INTO Users (Mail, password)
VALUES ('laetitia.morel@gmail.com','laetitia.morel');

INSERT INTO Users (Mail, password)
VALUES ('sanaa.abadi@gmail.com','sanaa.abadi');

INSERT INTO Users (Mail, password)
VALUES ('celine.dube@gmail.com','celine.dube');

INSERT INTO Users (Mail, password)
VALUES ('maxime.belanger@gmail.com','maxime.belanger');

INSERT INTO Users (Mail, password)
VALUES ('yannick.rousseau@gmail.com','yannick.rousseau');

INSERT INTO Users (Mail, password)
VALUES ('maeva.bernardin@gmail.com','maeva.bernardin');

INSERT INTO Users (Mail, password)
VALUES ('quentin.attias@gmail.com','quentin.attias');

INSERT INTO Users (Mail, password)
VALUES ('isadora.marques@gmail.com','isadora.marques');

--Généraliste

DO $$
DECLARE
    DoctorId uuid := '3a7fb51b-e691-4158-964d-a346fbacc8cc';
    StartTime timestamp := '2023-03-27 09:00';
    EndTime timestamp := '2023-03-31 18:00';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '15 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '15 minutes';
    END LOOP;
END $$;

-- Dentiste 

DO $$
DECLARE
    DoctorId uuid := '896dea6b-f514-4c59-8386-12a946ae4fcc';
    StartTime timestamp := '2023-03-27 09:00';
    EndTime timestamp := '2023-03-31 18:00';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

--Dermatologue Isadora

DO $$
DECLARE
    DoctorId uuid := 'f25a532d-a642-479c-853c-1cc7816e829a';
    StartTime timestamp := '2023-03-27 09:00';
    EndTime timestamp := '2023-03-31 18:00';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '15 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '15 minutes';
    END LOOP;
END $$;

--Dermatologue Laetitia

DO $$
DECLARE
    DoctorId uuid := 'e2e648d2-4a58-4369-aa4f-398dc8e3da4b';
    StartTime timestamp := '2023-03-27 09:00';
    EndTime timestamp := '2023-03-31 18:00';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '15 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '15 minutes';
    END LOOP;
END $$;

--Ophtalmologue

DO $$
DECLARE
    DoctorId uuid := '1cc96527-15b2-4d9e-b89b-5fcda66f04e4';
    StartTime timestamp := '2023-03-27 09:00';
    EndTime timestamp := '2023-03-31 18:00';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '15 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '15 minutes';
    END LOOP;
END $$;

--Neurologue Sanaa

DO $$
DECLARE
    DoctorId uuid := '985dc899-4046-44b9-832f-3be49b4ac48a';
    StartTime timestamp := '2023-03-27 09:00';
    EndTime timestamp := '2023-03-31 18:00';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

--Neurologue Quentin

DO $$
DECLARE
    DoctorId uuid := 'd5daf4cd-bd35-4f47-b99f-6adfa1e2583c';
    StartTime timestamp := '2023-03-27 09:00';
    EndTime timestamp := '2023-03-31 18:00';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

--Pédiatre

DO $$
DECLARE
    DoctorId uuid := '2ac637b3-0eb2-449e-b86d-3dfaaba6c00c';
    StartTime timestamp := '2023-03-27 09:00';
    EndTime timestamp := '2023-03-31 18:00';
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes');
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;