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

INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime) VALUES ('3a7fb51b-e691-4158-964d-a346fbacc8cc', '2023-03-27 08:00', '2023-03-27 08:15');

INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime) VALUES ('3a7fb51b-e691-4158-964d-a346fbacc8cc', '2023-03-27 08:15', '2023-03-27 08:30');


INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime) VALUES ('3a7fb51b-e691-4158-964d-a346fbacc8cc', '2023-03-27 08:30', '2023-03-27 08:45');


INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime) VALUES ('3a7fb51b-e691-4158-964d-a346fbacc8cc', '2023-03-27 08:45', '2023-03-27 09:00');


INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime) VALUES ('3a7fb51b-e691-4158-964d-a346fbacc8cc', '2023-03-28 08:00', '2023-03-28 08:15');


INSERT INTO AvailableTimeSlots(DoctorId, StartTime, EndTime) VALUES ('3a7fb51b-e691-4158-964d-a346fbacc8cc', '2023-03-28 08:15', '2023-03-28 08:30');