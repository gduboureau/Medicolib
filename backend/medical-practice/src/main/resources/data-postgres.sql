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


--Ajout des tarifs par docteurs 

-- Laetitia Morel (Dermatologue)

INSERT INTO Price (doctorid, priceName, price)
Values ('d0e817a3-056a-43c4-849d-3d89a395aad7','Consultation de base',50);

INSERT INTO Price (doctorid, priceName, price)
Values ('d0e817a3-056a-43c4-849d-3d89a395aad7','Consultation spécialisée',80);

INSERT INTO Price (doctorid, priceName, price)
Values ('d0e817a3-056a-43c4-849d-3d89a395aad7','Traitement au laser',150);

INSERT INTO Price (doctorid, priceName, price)
Values ('d0e817a3-056a-43c4-849d-3d89a395aad7','Biopsie de la peau',120);

-- Isadora Marques (Dermatologue)

INSERT INTO Price (doctorid, priceName, price)
Values ('adf50cc8-b0cf-49c1-a64f-6dea910a0a88','Consultation de base',40);

INSERT INTO Price (doctorid, priceName, price)
Values ('adf50cc8-b0cf-49c1-a64f-6dea910a0a88','Consultation spécialisée',90);

INSERT INTO Price (doctorid, priceName, price)
Values ('adf50cc8-b0cf-49c1-a64f-6dea910a0a88','Traitement au laser',150);

INSERT INTO Price (doctorid, priceName, price)
Values ('adf50cc8-b0cf-49c1-a64f-6dea910a0a88','Traitement acnée',90);


-- Sanaa Abadi (Neurologue)

INSERT INTO Price (doctorid, priceName, price)
Values ('dccf9cfd-f2cc-4e44-8357-dd4140e17b73','Consultation de base',70);

INSERT INTO Price (doctorid, priceName, price)
Values ('dccf9cfd-f2cc-4e44-8357-dd4140e17b73','IRM du cerveau',200);

INSERT INTO Price (doctorid, priceName, price)
Values ('dccf9cfd-f2cc-4e44-8357-dd4140e17b73','Électroencéphalogramme (EEG)',100);

INSERT INTO Price (doctorid, priceName, price)
Values ('dccf9cfd-f2cc-4e44-8357-dd4140e17b73','Examen des troubles du sommeil',110);


-- Quentin Attias (Neurologue)

INSERT INTO Price (doctorid, priceName, price)
Values ('ea87dc1c-3a00-47de-b089-20e2d35ad741','Consultation de base',60);

INSERT INTO Price (doctorid, priceName, price)
Values ('ea87dc1c-3a00-47de-b089-20e2d35ad741','IRM du cerveau',200);

INSERT INTO Price (doctorid, priceName, price)
Values ('ea87dc1c-3a00-47de-b089-20e2d35ad741','Électroencéphalogramme (EEG)',100);

INSERT INTO Price (doctorid, priceName, price)
Values ('ea87dc1c-3a00-47de-b089-20e2d35ad741','Consultation spécialisée',120);


-- Céline Dubé (Ophtalmologue)

INSERT INTO Price (doctorid, priceName, price)
Values ('97ec89ab-d2fd-4030-ad1e-d79f79a2fb0d','Consultation de base',50);

INSERT INTO Price (doctorid, priceName, price)
Values ('97ec89ab-d2fd-4030-ad1e-d79f79a2fb0d','Consultation pour la cataracte',150);

INSERT INTO Price (doctorid, priceName, price)
Values ('97ec89ab-d2fd-4030-ad1e-d79f79a2fb0d','Consultation spécialisée',100);


-- Maxime Bélanger (Pédiatre)

INSERT INTO Price (doctorid, priceName, price)
Values ('d552ecc4-43fc-4d57-8a23-91f1d6351796','Consultation de base',50);

INSERT INTO Price (doctorid, priceName, price)
Values ('d552ecc4-43fc-4d57-8a23-91f1d6351796','Problème de croissance',85);

INSERT INTO Price (doctorid, priceName, price)
Values ('d552ecc4-43fc-4d57-8a23-91f1d6351796','Examens précis et suivis du développement',150);


-- Yannick Rousseau (Généraliste)

INSERT INTO Price (doctorid, priceName, price)
Values ('a538a18d-8203-4a23-b57f-87bbc5707751','Consultation de base',25);

INSERT INTO Price (doctorid, priceName, price)
Values ('a538a18d-8203-4a23-b57f-87bbc5707751','Check-up complet',50);

INSERT INTO Price (doctorid, priceName, price)
Values ('a538a18d-8203-4a23-b57f-87bbc5707751','Vaccins',40);


-- Maeva Bernardin (Dentiste)

INSERT INTO Price (doctorid, priceName, price)
Values ('ff44fbb7-3d49-4f77-9fa8-d5baf593dd3e','Examen dentaire',60);

INSERT INTO Price (doctorid, priceName, price)
Values ('ff44fbb7-3d49-4f77-9fa8-d5baf593dd3e','Détartrage',80);

INSERT INTO Price (doctorid, priceName, price)
Values ('ff44fbb7-3d49-4f77-9fa8-d5baf593dd3e','Extraction dentaire',100);

INSERT INTO Price (doctorid, priceName, price)
Values ('ff44fbb7-3d49-4f77-9fa8-d5baf593dd3e','Traitement de canal',200);

INSERT INTO Price (doctorid, priceName, price)
Values ('ff44fbb7-3d49-4f77-9fa8-d5baf593dd3e','Radiographie des dents',120);


-- George Simple (Cardiologue)

INSERT INTO Price (doctorid, priceName, price)
Values ('17527388-fc21-4681-bd9b-2deee96164ae','Consultation de base pour un examen cardiaque',100);

INSERT INTO Price (doctorid, priceName, price)
Values ('17527388-fc21-4681-bd9b-2deee96164ae','Echographie cardiaque',200);

INSERT INTO Price (doctorid, priceName, price)
Values ('17527388-fc21-4681-bd9b-2deee96164ae','Electrocardiographie (ECG)',150);

INSERT INTO Price (doctorid, priceName, price)
Values ('17527388-fc21-4681-bd9b-2deee96164ae','Traitement hypertension artérielle',120);


--Ajout de la liste de RDV par Docteur

-- Yannick Rousseau (Généraliste)

DO $$
DECLARE
    DoctorId uuid := 'a538a18d-8203-4a23-b57f-87bbc5707751';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
    Booked boolean := false;
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime, Booked)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes',Booked);
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- Maeva Bernardin (Dentiste)

DO $$
DECLARE
    DoctorId uuid := 'ff44fbb7-3d49-4f77-9fa8-d5baf593dd3e';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
    Booked boolean := false;
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime, Booked)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes', Booked);
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- Isadora Marques (Dermatologue)

DO $$
DECLARE
    DoctorId uuid := 'adf50cc8-b0cf-49c1-a64f-6dea910a0a88';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
    Booked boolean := false;
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime, Booked)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes', Booked);
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- Laetitia Morel (Dermatologue)

DO $$
DECLARE
    DoctorId uuid := 'd0e817a3-056a-43c4-849d-3d89a395aad7';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
    Booked boolean := false;
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime, Booked)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes', Booked);
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- Céline Dubé (Ophtalmologue)

DO $$
DECLARE
    DoctorId uuid := '97ec89ab-d2fd-4030-ad1e-d79f79a2fb0d';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
    Booked boolean := false;
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime, Booked)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes', Booked);
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- Sanaa Abadi (Neurologue)

DO $$
DECLARE
    DoctorId uuid := 'dccf9cfd-f2cc-4e44-8357-dd4140e17b73';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
    Booked boolean := false;
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime, Booked)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes', Booked);
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- Quentin Attias (Neurologue)

DO $$
DECLARE
    DoctorId uuid := 'ea87dc1c-3a00-47de-b089-20e2d35ad741';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
    Booked boolean := false;
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime, Booked)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes', Booked);
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- Maxime Bélanger (Pédiatre)

DO $$
DECLARE
    DoctorId uuid := 'd552ecc4-43fc-4d57-8a23-91f1d6351796';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
    Booked boolean := false;
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime, Booked)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes', Booked);
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;

-- George Simple (Cardiologue)

DO $$
DECLARE
    DoctorId uuid := '17527388-fc21-4681-bd9b-2deee96164ae';
    StartTime timestamp := '2023-04-10 09:00';
    EndTime timestamp := StartTime + INTERVAL '5 months';
    Booked boolean := false;
BEGIN
    WHILE StartTime < EndTime LOOP
        IF EXTRACT(DOW FROM StartTime) BETWEEN 1 AND 5 AND (EXTRACT(HOUR FROM StartTime) BETWEEN 9 AND 11 OR EXTRACT(HOUR FROM StartTime) BETWEEN 14 AND 17) THEN
            INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime, Booked)
            VALUES (DoctorId, StartTime, StartTime + INTERVAL '30 minutes', Booked);
        END IF;
        
        StartTime := StartTime + INTERVAL '30 minutes';
    END LOOP;
END $$;