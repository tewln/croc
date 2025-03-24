CREATE SCHEMA IF NOT EXISTS CROC;

DROP TABLE IF EXISTS CROC.User CASCADE;
DROP TABLE IF EXISTS CROC.Patient CASCADE;
DROP TABLE IF EXISTS CROC.Anamnesis CASCADE;
DROP TABLE IF EXISTS CROC.Diagnosis CASCADE;
DROP TABLE IF EXISTS CROC.Measure_unit CASCADE;
DROP TABLE IF EXISTS CROC.Preparation CASCADE;
DROP TABLE IF EXISTS CROC.Measure CASCADE;
DROP TABLE IF EXISTS CROC.Measure_book CASCADE;
DROP TABLE IF EXISTS CROC.Preparation_book CASCADE;
DROP TABLE IF EXISTS CROC.Organization CASCADE;
DROP TABLE IF EXISTS CROC.Department CASCADE;
DROP TABLE IF EXISTS CROC.Ward CASCADE;
DROP TABLE IF EXISTS CROC.Staff CASCADE;

CREATE TABLE CROC.Organization (
  id SERIAL,
  name VARCHAR(200) NOT NULL,

  CONSTRAINT organization_id_pkey PRIMARY KEY (id)
);

CREATE TABLE CROC.Department (
  id SERIAL,
  name VARCHAR(100) NOT NULL,
  pid INT NOT NULL,
  
  CONSTRAINT department_id_pkey PRIMARY KEY (id),
  CONSTRAINT department_pid_fkey FOREIGN KEY (pid)
  REFERENCES CROC.Organization (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE CROC.Ward (
--Палаты, приёмные и др. помещения

  id SERIAL,
  name VARCHAR(100) NOT NULL,
  pid INT,
  activity BOOLEAN NOT NULL DEFAULT TRUE,
  --Доступность для пациента и персонала

  CONSTRAINT ward_id_pkey PRIMARY KEY (id),
  CONSTRAINT ward_pid_fkey FOREIGN KEY (pid)
  REFERENCES CROC.Department (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE CROC.Staff (
  id SERIAL,
  surname VARCHAR(50) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50),
  position VARCHAR(100) NOT NULL,
  organization INT NOT NULL,
  department INT NOT NULL,
  ward INT,
  
  CONSTRAINT staff_id_pkey PRIMARY KEY (id),
  CONSTRAINT staff_organization_fkey FOREIGN KEY (organization)
  REFERENCES CROC.Organization (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT staff_department_fkey FOREIGN KEY (department)
  REFERENCES CROC.Department (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT staff_ward_fkey FOREIGN KEY (ward)
  REFERENCES CROC.Ward (id)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT
);

CREATE TABLE CROC.Patient (
  id SERIAL,
  surname VARCHAR(50) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50),
  birth_date DATE NOT NULL,
  allergy VARCHAR(400),

  CONSTRAINT patient_id_pkey PRIMARY KEY (id),
  CONSTRAINT valid_birth_date
  CHECK (birth_date <= CURRENT_TIMESTAMP)
);

CREATE TABLE CROC.Diagnosis (
  id SERIAL,
  code VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL,
  
  CONSTRAINT diagnosis_id_pkey PRIMARY KEY (id),
  CONSTRAINT diagnosis_must_be_different
  UNIQUE (code, name)
);

CREATE TABLE CROC.Measure_unit (
--Единица измерения, в которой измеряется лекарство, и его форма

  id SERIAL,
  measure_object VARCHAR(30) NOT NULL,
  measure_unit VARCHAR(10) NOT NULL,

  CONSTRAINT measure_unit_id_pkey PRIMARY KEY (id)
);

CREATE TABLE CROC.Preparation (
--Препараты, находящиеся в ходу
  id SERIAL,
  name VARCHAR(100) NOT NULL,
  form INT NOT NULL,
  dosage INT NOT NULL,
  release_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  manufacturer VARCHAR(100) NOT NULL,
  narcotic BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT preparation_id_pkey PRIMARY KEY (id),
  CONSTRAINT preparation_form_fkey FOREIGN KEY (form)
  REFERENCES CROC.Measure_unit (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT preparation_dosage_fkey FOREIGN KEY (dosage)
  REFERENCES CROC.Measure_unit (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT preparation_valid_date
  CHECK (release_date <= CURRENT_DATE AND release_date <= expiration_date),
  CONSTRAINT preparation_valid_int
  CHECK (dosage > 0)
);

CREATE TABLE CROC.Preparation_book (
--Журнал выдачи препаратов
  id SERIAL,
  patient INT NOT NULL,
  preparation INT NOT NULL,
  quantity SMALLINT NOT NULL,
  date TIMESTAMP,

  CONSTRAINT preparation_book_id_pkey PRIMARY KEY (id),
  CONSTRAINT preparation_book_patient_fkey FOREIGN KEY (patient)
  REFERENCES CROC.Patient (id)
  ON DELETE CASCADE
  ON UPDATE RESTRICT,
  CONSTRAINT prepraration_book_preparation_fkey FOREIGN KEY (preparation)
  REFERENCES CROC.Preparation (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT preparation_book_valid_int
  CHECK (quantity > 0)
);

CREATE TABLE CROC.Measure (
--Проводимые измерения
 id SERIAL,
 name VARCHAR(100) NOT NULL,
 measure_unit VARCHAR(10) NOT NULL,

 CONSTRAINT measure_id_pkey PRIMARY KEY (id)
);

CREATE TABLE CROC.Measure_book (
--Журнал проведенных измерений
  id SERIAL,
  measure_type INT NOT NULL,
  patient INT NOT NULL,
  date TIMESTAMP NOT NULL,

  CONSTRAINT measure_book_id_pkey PRIMARY KEY (id),
  CONSTRAINT measure_book_measure_fkey FOREIGN KEY (measure_type)
  REFERENCES CROC.Measure (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT measure_book_patient_fkey FOREIGN KEY (patient)
  REFERENCES CROC.Patient (id)
  ON DELETE CASCADE
  ON UPDATE RESTRICT
);

CREATE TABLE CROC.Anamnesis (
  id BIGSERIAL,
  department INT NOT NULL,
  ward INT NOT NULL,
  patient INT NOT NULL,
  admission_date DATE NOT NULL,
  discharge_date DATE,
  diagnosis INT,
  mobility BOOLEAN NOT NULL,
  doctor INT,
  nurse INT,
  measure INT,
  preparation INT,

  CONSTRAINT anamnesis_id_pkey PRIMARY KEY (id),
  CONSTRAINT anamnesis_department_fkey FOREIGN KEY (department)
  REFERENCES CROC.Department (id)
  ON DELETE SET DEFAULT /**/
  ON UPDATE RESTRICT,
  CONSTRAINT anamnesis_ward_fkey FOREIGN KEY (ward)
  REFERENCES CROC.Ward (id)
  ON DELETE SET DEFAULT /**/
  ON UPDATE RESTRICT,
  CONSTRAINT anamnesis_patient_fkey FOREIGN KEY (patient)
  REFERENCES CROC.Patient (id)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT,
  CONSTRAINT anamnesis_diagnosis_fkey FOREIGN KEY (diagnosis)
  REFERENCES CROC.Diagnosis (id)
  ON DELETE RESTRICT
  ON UPDATE CASCADE,
  CONSTRAINT anamnesis_doctor_fkey FOREIGN KEY (doctor)
  REFERENCES CROC.Staff (id)
  ON DELETE RESTRICT
  ON UPDATE CASCADE,
  CONSTRAINT anamnesis_nurse_fkey FOREIGN KEY (nurse)
  REFERENCES CROC.Staff (id)
  ON DELETE RESTRICT
  ON UPDATE CASCADE,
  CONSTRAINT anamnesis_measure_fkey FOREIGN KEY (measure)
  REFERENCES CROC.Measure_book (id)
  ON DELETE SET DEFAULT /**/
  ON UPDATE CASCADE,
  CONSTRAINT anamnesis_preparation_fkey FOREIGN KEY (preparation)
  REFERENCES CROC.Preparation_book (id)
  ON DELETE SET DEFAULT /**/
  ON UPDATE CASCADE
);

CREATE TABLE CROC.User (
  id SERIAL,
  login VARCHAR(200) /*UNIQUE*/,
  password VARCHAR(200),
  staff INT /*UNIQUE*/,

  CONSTRAINT id_pkey PRIMARY KEY (id),
  CONSTRAINT staff_fkey FOREIGN KEY (staff)
  REFERENCES CROC.Staff (id)
);