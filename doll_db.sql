INSERT INTO kpok.organization (name) VALUES
  ('Городская клиническая больница № 2'),
  ('Детская городская клиническая поликлиника № 1'),
  ('Военно-клинический госпиталь, поликлиника'),
  ('Челябинский областной клинический противотуберкулезный диспансер');

INSERT INTO kpok.department (name, pid) VALUES
  ('Отделение медицинской реабилитации', 1),
  ('Отделение терапии и кардиологии с палатой реанимации и интенсивной терапии', 1),
  ('Хозяйственное отделение', 2),
  ('Диагностическое отделение', 2),
  ('Отдел социально-психологической помощи', 3),
  ('Отдел информационных технологий', 4),
  ('Отдел социально-психологической помощи', 4),
  ('Диагностическое отделение', 4);

INSERT INTO kpok.ward (name, pid, activity) VALUES
  ('Первая палата', 1, true),
  ('Вторая палата', 1, true),
  ('Кабинет рентгенологии', 2, true),
  ('Терапевтический кабинет', 2, false),
  ('Терапевтический кабинет', 3, true),
  ('Первая палата', 4, true),
  ('Вторая палата', 4, true),
  ('Кабинет рентгенологии', 5, true),
  ('Терапевтический кабинет', 7, false),
  ('Терапевтический кабинет', 6, true);

INSERT INTO kpok.staff (surname, firstname, lastname, position, organization, department, ward) VALUES
  ('Иванов', 'Петр', 'Сергеевич', 'врач-терапевт', 1, 1, 1),
  ('Петрова', 'Елена', 'Викторовна', 'медсестра', 1, 1, 1),
  ('Сидоров', 'Алексей', 'Игоревич', 'хирург', 1, 2, NULL),
  ('Смирнова', 'Анна', 'Олеговна', 'фармацевт', 2, 2, 5),
  ('Кузнецов', 'Дмитрий', 'Андреевич', 'анестезиолог', 3, 5, 8),
  ('Федорова', 'Марина', 'Ивановна', 'лаборант', 4, 6, 10),
  ('Васильев', 'Сергей', 'Павлович', 'реаниматолог', 4, 7, NULL),
  ('Никифорова', 'Татьяна', 'Юрьевна', 'рентгенолог', 4, 8, NULL),
  ('Морозов', 'Виктор', 'Евгеньевич', 'санитар', 4, 7, NULL),
  ('Карпова', 'Ольга', 'Дмитриевна', 'физиотерапевт', 1, 1, NULL),
  ('Ефимов', 'Олег', 'Александрович', 'администратор медицинского центра', 1, 2, 3),
  ('Гусева', 'Наталья', 'Романовна', 'IT-специалист', 1, 2, 4),
  ('Степанов', 'Антон', 'Владимирович', 'уборщик', 1, 1, NULL),
  ('Лебедева', 'Светлана', 'Борисовна', 'кардиолог', 2, 2, 5),
  ('Михайлов', 'Артем', 'Сергеевич', 'педиатр', 3, 5, 8);

INSERT INTO kpok.patient (firstname, surname, lastname, date_of_birth, allergy) VALUES
  ('Иванов', 'Петр', 'Сергеевич', '1980-05-14', NULL),
  ('Петрова', 'Елена', 'Викторовна', '1992-08-21', NULL),
  ('Сидоров', 'Алексей', 'Игоревич', '1985-12-03', 'Отсутствуют'),
  ('Смирнова', 'Анна', 'Олеговна', '1990-07-09', 'Берёзовая пыльца'),
  ('Кузнецов', 'Дмитрий', 'Андреевич', '1978-03-25', 'Отсутствуют'),
  ('Федорова', 'Марина', 'Ивановна', '1983-11-17', 'Злаковые'),
  ('Васильев', 'Сергей', 'Павлович', '1995-04-30', 'Отсутствуют'),
  ('Никифорова', 'Татьяна', 'Юрьевна', '1987-06-12', 'Паслёновые'),
  ('Морозов', 'Виктор', 'Евгеньевич', '1991-09-05', 'Кофе'),
  ('Карпова', 'Ольга', 'Дмитриевна', '1982-02-14', 'Аминазин'),
  ('Ефимов', 'Олег', 'Александрович', '1976-10-27', 'Шоколад'),
  ('Гусева', 'Наталья', 'Романовна', '1989-05-19', 'Отсутствуют'),
  ('Степанов', 'Антон', 'Владимирович', '1993-07-08', 'Сульфаниламиды'),
  ('Лебедева', 'Светлана', 'Борисовна', '1981-01-23', 'Отсутствуют'),
  ('Михайлов', 'Артем', 'Сергеевич', '1996-12-11', 'Супрастин');
