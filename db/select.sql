--организации сотрудника
SELECT org.id,
       org.name
  FROM croc.organization org
       JOIN croc.department dep ON dep.pid = org.id
       JOIN croc.department_staff dep_st ON dep.id = dep_st.department
 WHERE dep_st.staff = $1;
--отделения сотрудника
SELECT dep.id,
       dep.name,
       dep.pid
  FROM croc.department dep
       JOIN croc.department_staff dep_st ON dep.id = dep_st.department
 WHERE dep_st.staff = $1;
--добавить пациента
INSERT INTO croc.patient (firstname, surname, lastname, birth_date, allergy)
       VALUES ($1, $2, $3, $4, $5)
 RETURNING id;
--найти пациента по айди
SELECT * FROM croc.patient WHERE id = $1;
--найти сотрудника по юзер айди
SELECT st.id,
       st.surname,
       st.firstname,
       st.lastname,
       st.position
  FROM croc.staff st
       JOIN croc.user us ON st.id = us.staff
 WHERE us.id = $1;
--регистрация
INSERT INTO croc.user (login, password)
       VALUES ($1, $2)
 RETURNING id;
--получить учётную запись по логину
SELECT * FROM croc.user WHERE login = $1;
--диагноз
SELECT *
  FROM croc.user us
       JOIN croc.staff st ON st.id = us.staff
       JOIN croc.anamnesis an ON st.id = an.nurse
       JOIN croc.diagnosis di ON an.diagnosis = di.id;
--препараты
SELECT *
  FROM croc.staff st 
       JOIN croc.anamnesis an ON st.id = an.nurse
       JOIN croc.patient pa ON an.patient = pa.id
       JOIN croc.preparation_book pb ON pb.patient = pa.id
       JOIN croc.preparation pr ON pb.preparation = pr.id
       JOIN croc.measure_unit mu ON mu.id = pr.measure_unit;
--измерения
SELECT *
  FROM croc.user us
       JOIN croc.staff st ON st.id = us.staff
       JOIN croc.anamnesis an ON st.id = an.nurse
       JOIN croc.patient pa ON an.patient = pa.id
       JOIN croc.measure_book mb ON mb.patient = pa.id
       JOIN croc.measure me ON me.id = mb.measure_type;

--задания на период
  WITH patient_data AS (
      SELECT p.id, 
            p.surname || ' ' || p.firstname || ' ' || COALESCE(p.lastname, '') AS patient_full_name,
            p.birth_date,
            w.name AS ward_name
        FROM croc.patient p
            LEFT JOIN croc.anamnesis a ON p.id = a.patient
            LEFT JOIN croc.ward w ON a.ward = w.id
      WHERE a.discharge_date IS NULL
  )
  SELECT scheduled_at,
         completed_at,
         patient_full_name,
         birth_date,
         ward_name,
         measure,
         preparation
    FROM (
    -- Измерения
          SELECT mb.scheduled_at,
                 mb.completed_at,
                 pd.patient_full_name,
                 pd.birth_date,
                 pd.ward_name,
                 m.name AS measure,
                 NULL AS preparation
            FROM croc.measure_book mb
                 JOIN patient_data pd ON mb.patient = pd.id
                 JOIN croc.measure m ON mb.measure_type = m.id
           UNION
        -- Препараты
          SELECT pb.scheduled_at,
                 pb.completed_at,
                 pd.patient_full_name,
                 pd.birth_date,
                 pd.ward_name,
                 NULL AS measure,
                 pr.name AS preparation
            FROM croc.preparation_book pb
                 JOIN patient_data pd ON pb.patient = pd.id
                 JOIN croc.preparation pr ON pb.preparation = pr.id
) tasks
   WHERE scheduled_at BETWEEN '2023-12-08' AND '2023-12-15'
         AND completed_at is null
ORDER BY scheduled_at;