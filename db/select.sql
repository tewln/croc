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
SELECT * FROM croc.patient WHERE id = $1
--найти сотрудника по юзер айди
SELECT st.id,
       st.surname,
       st.firstname,
       st.lastname,
       st.position
  FROM croc.staff st
       JOIN croc.user us ON st.id = us.staff
 WHERE us.id = $1
--регистрация
INSERT INTO croc.user (login, password)
       VALUES ($1, $2)
 RETURNING id;
--получить учётную запись по логину
SELECT * FROM croc.user WHERE login = $1
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