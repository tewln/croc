CREATE SCHEMA IF NOT EXISTS croc;

DROP TABLE IF EXISTS croc."user" CASCADE;
DROP TABLE IF EXISTS croc.department_staff CASCADE;
DROP TABLE IF EXISTS croc.organization_staff CASCADE;
DROP TABLE IF EXISTS croc.patient CASCADE;
DROP TABLE IF EXISTS croc.anamnesis CASCADE;
DROP TABLE IF EXISTS croc.diagnosis CASCADE;
DROP TABLE IF EXISTS croc.measure_unit CASCADE;
DROP TABLE IF EXISTS croc.dosage CASCADE;
DROP TABLE IF EXISTS croc.preparation CASCADE;
DROP TABLE IF EXISTS croc.measure CASCADE;
DROP TABLE IF EXISTS croc.measure_book CASCADE;
DROP TABLE IF EXISTS croc.preparation_book CASCADE;
DROP TABLE IF EXISTS croc.organization CASCADE;
DROP TABLE IF EXISTS croc.department CASCADE;
DROP TABLE IF EXISTS croc.ward CASCADE;
DROP TABLE IF EXISTS croc.staff CASCADE;

CREATE TABLE croc.organization (
  id SERIAL,
  name VARCHAR(200) NOT NULL,

  CONSTRAINT organization_id_pkey PRIMARY KEY (id)
);

COMMENT ON TABLE croc.organization
    IS 'Мед.учреждения, подключенные к системе';
COMMENT ON COLUMN croc.organization.name
    IS 'Название мед.учреждения';

CREATE TABLE croc.department (
  id SERIAL,
  name VARCHAR(100) NOT NULL,
  pid INT NOT NULL,
  
  CONSTRAINT department_id_pkey PRIMARY KEY (id),
  CONSTRAINT department_pid_fkey FOREIGN KEY (pid)
  REFERENCES croc.organization (id)
  ON UPDATE CASCADE
);

COMMENT ON TABLE croc.department
    IS 'Отделения мед.учреждений';
COMMENT ON COLUMN croc.department.name
    IS 'Название отделения';
COMMENT ON COLUMN croc.department.pid
    IS 'Мед.учреждение, к которому относится отделение';

CREATE TABLE croc.ward (
--Палаты, приёмные и др. помещения

  id SERIAL,
  name VARCHAR(100) NOT NULL,
  pid INT NOT NULL,
  activity BOOLEAN NOT NULL DEFAULT TRUE,
  --Доступность для пациента

  CONSTRAINT ward_id_pkey PRIMARY KEY (id),
  CONSTRAINT ward_pid_fkey FOREIGN KEY (pid)
  REFERENCES croc.department (id)
  ON UPDATE CASCADE
);

COMMENT ON COLUMN croc.ward.name
    IS 'Название/номер палаты';
COMMENT ON COLUMN croc.ward.pid
    IS 'Отделение, к которой относится палата';
COMMENT ON COLUMN croc.ward.activity
    IS 'Является ли доступной для пацента палатой?';

CREATE TABLE croc.staff (
  id SERIAL,
  surname VARCHAR(50) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50),
  "position" VARCHAR(100) NOT NULL,
  
  CONSTRAINT staff_id_pkey PRIMARY KEY (id)
);

COMMENT ON TABLE croc.staff
    IS 'Сотрудники мед.учреждений';
COMMENT ON COLUMN croc.staff.surname
    IS 'Фамилия сотрудника';
COMMENT ON COLUMN croc.staff.firstname
    IS 'Имя сотрудника';
COMMENT ON COLUMN croc.staff.lastname
    IS 'Отчество сотрудника';
COMMENT ON COLUMN croc.staff."position"
    IS 'Должность сотрудника';

CREATE TABLE croc.department_staff (
    staff INT,
    department INT,

    CONSTRAINT department_staff_pkey PRIMARY KEY (staff, department),
    CONSTRAINT department_staff_staff_fkey FOREIGN KEY (staff)
    REFERENCES croc.staff (id),
    CONSTRAINT department_staff_department_fkey FOREIGN KEY (department)
    REFERENCES croc.department (id)
);

COMMENT ON TABLE croc.department_staff
    IS 'Отношение M:M между staff и department';
COMMENT ON COLUMN croc.department_staff.staff
    IS 'Описываемый сотрудник';
COMMENT ON COLUMN croc.department_staff.department
    IS 'Описываемое отделение';

CREATE TABLE croc.patient (
  id SERIAL,
  surname VARCHAR(50) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50),
  birth_date DATE NOT NULL,
  allergy VARCHAR(400),

  CONSTRAINT patient_id_pkey PRIMARY KEY (id),
  CONSTRAINT paieint_birth_date_valid
  CHECK (birth_date <= CURRENT_TIMESTAMP)
);

COMMENT ON TABLE croc.patient
    IS 'Пациенты, посетившие мед.учреждения';
COMMENT ON COLUMN croc.patient.surname
    IS 'Фамилия пациента';
COMMENT ON COLUMN croc.patient.firstname
    IS 'Имя пациента';
COMMENT ON COLUMN croc.patient.lastname
    IS 'Отчество пациента';
COMMENT ON COLUMN croc.patient.birth_date
    IS 'День рождения пациента';
COMMENT ON COLUMN croc.patient.allergy
    IS 'Аллергии, заявленные/выявленные пациентом (у пациента)';

CREATE TABLE croc.diagnosis (
  id SERIAL,
  code VARCHAR(20) NOT NULL,
  name VARCHAR(100) NOT NULL,
  
  CONSTRAINT diagnosis_id_pkey PRIMARY KEY (id),
  CONSTRAINT diagnosis_must_be_different
  UNIQUE (code, name)
);

COMMENT ON TABLE croc.diagnosis
    IS 'Список возможных диагнозов ';
COMMENT ON COLUMN croc.diagnosis.code
    IS 'Код диагноза МКБ';
COMMENT ON COLUMN croc.diagnosis.name
    IS 'Название диагноза МКБ';

CREATE TABLE croc.measure_unit (
--Единица измерения, в которой измеряется лекарство, и его форма

  id SERIAL,
  measure_object VARCHAR(30) NOT NULL,
  measure_unit VARCHAR(10) NOT NULL,

  CONSTRAINT measure_unit_id_pkey PRIMARY KEY (id)
);

COMMENT ON TABLE croc.measure_unit
    IS 'Список мер измерения количества лекарственных средств';
COMMENT ON COLUMN croc.measure_unit.measure_object
    IS 'Измеряемый параметр';
COMMENT ON COLUMN croc.measure_unit.measure_unit
    IS 'Мера измерения параметра';

CREATE TABLE croc.preparation (
--Препараты, находящиеся в ходу
  id SERIAL,
  name VARCHAR(100) NOT NULL,
  narcotic BOOLEAN NOT NULL DEFAULT FALSE,

  CONSTRAINT preparation_id_pkey PRIMARY KEY (id),
  CONSTRAINT preparation_name_uniq UNIQUE (name)
);

COMMENT ON TABLE croc.preparation
    IS 'Препараты, находящиеся в распоряжении мед.учреждений';
COMMENT ON COLUMN croc.preparation.name
    IS 'Название препарата';
COMMENT ON COLUMN croc.preparation.narcotic
    IS 'Является наркотическим средством?';

CREATE TABLE croc.dosage (
--Дозировка препарата
  id SERIAL NOT NULL,
  dosage INT NOT NULL,
  preparation_id INT NOT NULL,
  measure_unit INT NOT NULL,
  
  CONSTRAINT dosage_id_pkey PRIMARY KEY (id),
  CONSTRAINT dosage_preparation_id_fkey FOREIGN KEY (preparation_id)
  REFERENCES croc.preparation (id),
  CONSTRAINT dosage_measure_unit_fkey FOREIGN KEY (measure_unit)
  REFERENCES croc.measure_unit (id),
  CONSTRAINT dosage_preparation_unique UNIQUE (preparation_id, dosage)
);

CREATE TABLE croc.preparation_book (
--Журнал выдачи препаратов
  id BIGSERIAL,
  patient INT NOT NULL,
  preparation INT NOT NULL,
  dosage INT NOT NULL,
  quantity SMALLINT NOT NULL,
  scheduled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,

  CONSTRAINT preparation_book_id_pkey PRIMARY KEY (id),
  CONSTRAINT preparation_book_patient_fkey FOREIGN KEY (patient)
  REFERENCES croc.patient (id)
  ON UPDATE RESTRICT,
  CONSTRAINT prepraration_book_preparation_fkey FOREIGN KEY (preparation)
  REFERENCES croc.preparation (id)
  ON UPDATE CASCADE,
  CONSTRAINT preparation_book_dosage_fkey FOREIGN KEY (dosage)
  REFERENCES croc.dosage (id),
  CONSTRAINT preparation_book_int_valid
  CHECK (quantity > 0)
);

COMMENT ON TABLE croc.preparation_book
    IS 'Препараты, назначенные пациентам';
COMMENT ON COLUMN croc.preparation_book.patient
    IS 'Какому пациенту выдан препарат';
COMMENT ON COLUMN croc.preparation_book.preparation
    IS 'Какой препарат выписан';
COMMENT ON COLUMN croc.preparation_book.dosage
    IS 'Дозировка препарата';
COMMENT ON COLUMN croc.preparation_book.quantity
    IS 'Количество выписанного препарата';
COMMENT ON COLUMN croc.preparation_book.scheduled_at
    IS 'Дата и время назначенного приёма';
COMMENT ON COLUMN croc.preparation_book.completed_at
    IS 'Дата и время фактического приёма';

CREATE TABLE croc.measure (
--Проводимые измерения
 id SERIAL,
 name VARCHAR(100) NOT NULL,
 measure_unit VARCHAR(10) NOT NULL,

 CONSTRAINT measure_id_pkey PRIMARY KEY (id)
);

COMMENT ON TABLE croc.measure
    IS 'Список возможных измерений у пациента';
COMMENT ON COLUMN croc.measure.name
    IS 'Название измерения';
COMMENT ON COLUMN croc.measure.measure_unit
    IS 'Мера, в которой измеряется';

CREATE TABLE croc.measure_book (
--Журнал проведенных измерений
  id SERIAL,
  patient INT NOT NULL,
  measure_type INT NOT NULL,
  result VARCHAR(20),
  scheduled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,

  CONSTRAINT measure_book_id_pkey PRIMARY KEY (id),
  CONSTRAINT measure_book_patient_fkey FOREIGN KEY (patient)
  REFERENCES croc.patient (id)
  ON UPDATE RESTRICT,
  CONSTRAINT measure_book_measure_fkey FOREIGN KEY (measure_type)
  REFERENCES croc.measure (id)
  ON UPDATE CASCADE
);

COMMENT ON TABLE croc.measure_book
    IS 'Проводимые измерения у пациентов';
COMMENT ON COLUMN croc.measure_book.measure_type
    IS 'Какое измерение проводится';
COMMENT ON COLUMN croc.measure_book.result
	IS 'Результаты измерения';
COMMENT ON COLUMN croc.measure_book.patient
    IS 'Пациент, у которого берётся измерение';
COMMENT ON COLUMN croc.measure_book.scheduled_at
    IS 'Дата и время, назначенные для проведения измерения';
COMMENT ON COLUMN croc.measure_book.completed_at
    IS 'Дата и время, фактического проведения измерения';

CREATE TABLE croc.anamnesis (
  id BIGSERIAL,
  department INT NOT NULL,
  ward INT NOT NULL,
  patient INT NOT NULL,
  admission_date DATE NOT NULL,
  discharge_date DATE,
  diagnosis INT,
  mobility BOOLEAN NOT NULL,
  doctor INT NOT NULL,
  nurse INT,

  CONSTRAINT anamnesis_id_pkey PRIMARY KEY (id),
  CONSTRAINT anamnesis_department_fkey FOREIGN KEY (department)
  REFERENCES croc.department (id)
  ON UPDATE RESTRICT,
  CONSTRAINT anamnesis_ward_fkey FOREIGN KEY (ward)
  REFERENCES croc.ward (id)
  ON UPDATE RESTRICT,
  CONSTRAINT anamnesis_patient_fkey FOREIGN KEY (patient)
  REFERENCES croc.patient (id)
  ON UPDATE CASCADE,
  CONSTRAINT anamnesis_diagnosis_fkey FOREIGN KEY (diagnosis)
  REFERENCES croc.diagnosis (id)
  ON UPDATE CASCADE,
  CONSTRAINT anamnesis_doctor_fkey FOREIGN KEY (doctor)
  REFERENCES croc.staff (id)
  ON UPDATE RESTRICT,
  CONSTRAINT anamnesis_nurse_fkey FOREIGN KEY (nurse)
  REFERENCES croc.staff (id)
  ON UPDATE RESTRICT
);

COMMENT ON TABLE croc.anamnesis
    IS 'Информация об итерациях нахождения в стационаре пациентов';
COMMENT ON COLUMN croc.anamnesis.department
    IS 'Отделение, в котором находится пациент во время итерации';
COMMENT ON COLUMN croc.anamnesis.ward
    IS 'Палата, в которой располагается пациент во время итерации';
COMMENT ON COLUMN croc.anamnesis.patient
    IS 'Описываемый пациент';
COMMENT ON COLUMN croc.anamnesis.admission_date
    IS 'Время поступления (начала итерации)';
COMMENT ON COLUMN croc.anamnesis.discharge_date
    IS 'Время выписки (окончания итерации)';
COMMENT ON COLUMN croc.anamnesis.diagnosis
    IS 'Диагноз, поставленный в этой итерации';
COMMENT ON COLUMN croc.anamnesis.mobility
    IS 'Мобильность пациента в итерации';
COMMENT ON COLUMN croc.anamnesis.doctor
    IS 'Доктор, за которым закреплён пациент';
COMMENT ON COLUMN croc.anamnesis.nurse
    IS 'Медсестра, за которой закреплён пациент';

CREATE TABLE croc."user" (
  id SERIAL NOT NULL,
  login VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  staff INT NOT NULL,

  CONSTRAINT user_id_pkey PRIMARY KEY (id),
  CONSTRAINT user_login_uniq UNIQUE(login),
  CONSTRAINT user_staff_fkey FOREIGN KEY (staff)
  REFERENCES croc.staff (id),
  CONSTRAINT user_staff_uniq UNIQUE (staff)
);

COMMENT ON TABLE croc."user"
    IS 'Список авторизационных данных';
COMMENT ON COLUMN croc."user".login
    IS 'Логин сотрудника';
COMMENT ON COLUMN croc."user".password
    IS 'Пароль сотрудника';
COMMENT ON COLUMN croc."user".staff
    IS 'Чьи авторизационные данные?';