--организации и отделения
SELECT org.id, org.name, dep.id, dep.name FROM croc.organization org
                         JOIN croc.department dep ON dep.pid = org.id
                         JOIN croc.department_staff dep_st ON dep.id = dep_st.department
                         JOIN croc.staff staff ON staff.id = dep_st.staff
                         JOIN croc.user us ON us.staff = staff.id
                         WHERE us.id = $1
--диагноз
SELECT * FROM croc.user us
JOIN croc.staff st ON st.id = us.staff
JOIN croc.anamnesis an ON st.id = an.nurse
JOIN croc.diagnosis di ON an.diagnosis = di.id;
--препараты
SELECT * FROM croc.user us
JOIN croc.staff st ON st.id = us.staff
JOIN croc.anamnesis an ON st.id = an.nurse
JOIN croc.patient pa ON an.patient = pa.id
JOIN croc.preparation_book pb ON pb.patient = pa.id
JOIN croc.preparation pr ON pb.preparation = pr.id
JOIN croc.measure_unit mu ON mu.id = pr.measure_unit;
--измерения
SELECT * FROM croc.user us
JOIN croc.staff st ON st.id = us.staff
JOIN croc.anamnesis an ON st.id = an.nurse
JOIN croc.patient pa ON an.patient = pa.id
JOIN croc.measure_book mb ON mb.patient = pa.id
JOIN croc.measure me ON me.id = mb.measure_type;