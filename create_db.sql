CREATE SCHEMA IF NOT EXISTS KPOK;

--DROP TABLE IF EXIST KPOK.Patient;
--DROP TABLE IF EXIST KPOK.Anamnesis;
--DROP TABLE IF EXIST KPOK.Diagnosis;
--DROP TABLE IF EXIST KPOK.Book_of_measure_units;
--DROP TABLE IF EXIST KPOK.Book_of_preparates;
--DROP TABLE IF EXIST KPOK.Book_of_measures;
--DROP TABLE IF EXIST KPOK.Measure;
--DROP TABLE IF EXIST KPOK.Preparate;
--DROP TABLE IF EXIST KPOK.Organization;
--DROP TABLE IF EXIST KPOK.Department;
--DROP TABLE IF EXIST KPOK.Ward;
--DROP TABLE IF EXIST KPOK.Staff;

CREATE TABLE KPOK.Organization (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE KPOK.Department (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  pid INT NOT NULL REFERENCES KPOK.Organization(id)
);

CREATE TABLE KPOK.Ward (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  pid INT REFERENCES KPOK.Department(id),
  activity BOOLEAN
);

CREATE TABLE KPOK.Staff (
  id SERIAL PRIMARY KEY,
  surname TEXT NOT NULL,
  firstname TEXT NOT NULL,
  lastname TEXT,
  position TEXT NOT NULL,
  organization INT NOT NULL REFERENCES KPOK.Organization(id),
  department INT NOT NULL REFERENCES KPOK.Department(id),
  ward INT REFERENCES KPOK.Ward(id)
);

CREATE TABLE KPOK.Patient (
  id SERIAL PRIMARY KEY,
  firstname TEXT NOT NULL,
  surname TEXT NOT NULL,
  lastname TEXT,
  date_of_birth DATE NOT NULL,
  allergy TEXT
);

CREATE TABLE KPOK.Diagnosis (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL,
  name TEXT NOT NULL
);
--
CREATE TABLE KPOK.Book_of_measure_units (
  id SERIAL PRIMARY KEY,
  measure_object TEXT NOT NULL,
  measure_unit TEXT NOT NULL
);

CREATE TABLE KPOK.Book_of_preparates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  form TEXT NOT NULL,
  dosage INT NOT NULL,
  measure_unit INT NOT NULL REFERENCES KPOK.Book_of_measure_units(id),
  release_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  manufacturer TEXT NOT NULL,
  narcotic SMALLINT CHECK (narcotic = 1)
  --boolean
);

CREATE TABLE KPOK.Preparate (
  id SERIAL PRIMARY KEY,
  patient INT NOT NULL REFERENCES KPOK.Patient(id),
  preparate INT NOT NULL REFERENCES KPOK.Book_of_preparates(id),
  quantity SMALLINT NOT NULL,
  date DATE
);
--Список всех возможных измерений у пациентов
CREATE TABLE KPOK.Book_of_measures (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 measure_unit TEXT NOT NULL
);

CREATE TABLE KPOK.Measure (
  id SERIAL PRIMARY KEY,
  type_of_measure INT NOT NULL REFERENCES KPOK.Book_of_measures(id),
  patient INT NOT NULL REFERENCES KPOK.Patient(id),
  date DATE NOT NULL
);

CREATE TABLE KPOK.Anamnesis (
  id SERIAL PRIMARY KEY,
  --bigserial
  department INT NOT NULL REFERENCES KPOK.Department(id),
  ward INT NOT NULL REFERENCES KPOK.Ward(id),
  patient INT NOT NULL REFERENCES KPOK.Patient(id),
  date_of_admission DATE NOT NULL,
  date_of_discharge DATE,
  diagnosis INT REFERENCES KPOK.Diagnosis(id),
  mobility BOOLEAN NOT NULL,
  doctor INT NOT NULL REFERENCES KPOK.Staff(id),
  nurse INT NOT NULL REFERENCES KPOK.Staff(id),
  measures INT REFERENCES KPOK.Measure(id),
  preparates INT REFERENCES KPOK.Preparate(id)
);
