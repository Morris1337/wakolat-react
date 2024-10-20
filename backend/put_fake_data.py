from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.models import Base, News, Competitions, Seminar, Calendar  # Замените 'your_module_name' на имя вашего модуля

# Создайте engine (замените строку подключения на вашу)
engine = create_engine('sqlite:///db.db')  # Например, для SQLite
Base.metadata.create_all(engine)  # Создание таблиц

# Создайте сессию
Session = sessionmaker(bind=engine)
session = Session()

# Функция для добавления новостей
def add_news(header, image, pdf, text, date):
    news_item = News(header=header, image=image, pdf=pdf, text=text, date=date)
    session.add(news_item)
    session.commit()
    print(f"Added news: {header}")

# Пример добавления новостей
for i in range(1,15):
    add_news(f"Заголовок {i}", f"image{i}.jpg", f"pdf.pdf", f"Текст новости {i}", "2023-10-10")


# Функция для добавления соревнований
def add_competition(header, image, image_second, country, city, email, phone_number, date_start, date_end, date_registration, price, text):
    competition_item = Competitions(
        header=header,
        image=image,
        image_second=image_second,
        country=country,
        city=city,
        email=email,
        phone_number=phone_number,
        date_start=date_start,
        date_end=date_end,
        date_registration=date_registration,
        price=price,
        text=text
    )
    session.add(competition_item)
    session.commit()
    print(f"Added competition: {header}")

# Пример добавления соревнований
add_competition(
    header="Международные соревнования по программированию",
    image="competition1.jpg",
    image_second="competition1_second.jpg",
    country="Россия",
    city="Москва",
    email="info@competitions.ru",
    phone_number="+7 123 456 78 90",
    date_start="2023-11-01",
    date_end="2023-11-05",
    date_registration="2023-10-01",
    price="1000",
    text="Присоединяйтесь к нам на международные соревнования по программированию!"
)

add_competition(
    header="Спортивные соревнования по шашкам",
    image="competition2.jpg",
    image_second="competition2_second.jpg",
    country="Россия",
    city="Санкт-Петербург",
    email="contact@sportcompetitions.ru",
    phone_number="+7 987 654 32 10",
    date_start="2023-12-01",
    date_end="2023-12-10",
    date_registration="2023-11-15",
    price="500",
    text="Участвуйте в чемпионате по шашкам!"
)


def add_seminar(header, image, country, city, email, phone_number, date_start, date_end, date_registration, price, text):
    seminar_item = Seminar(
        header=header,
        image=image,
        country=country,
        city=city,
        email=email,
        phone_number=phone_number,
        date_start=date_start,
        date_end=date_end,
        date_registration=date_registration,
        price=price,
        text=text
    )
    session.add(seminar_item)
    session.commit()
    print(f"Added seminar: {header}")

# Пример добавления семинаров
add_seminar(
    header="Семинар по программированию",
    image="seminar1.jpg",
    country="Россия",
    city="Москва",
    email="info@seminars.ru",
    phone_number="+7 123 456 78 90",
    date_start="2023-11-01",
    date_end="2023-11-05",
    date_registration="2023-10-15",
    price="2000",
    text="Программирование на Python для начинающих"
)

add_seminar(
    header="Семинар по кибербезопасности",
    image="seminar2.jpg",
    country="Россия",
    city="Санкт-Петербург",
    email="contact@securityseminars.ru",
    phone_number="+7 987 654 32 10",
    date_start="2023-12-01",
    date_end="2023-12-03",
    date_registration="2023-11-20",
    price="3000",
    text="Обучение основам кибербезопасности"
)

def add_event(header, class_, date_start, date_end, country, address, email, phone_number, home_page, promoter):
    event = Calendar(
        header=header,
        class_=class_,
        date_start=date_start,
        date_end=date_end,
        country=country,
        address=address,
        email=email,
        phone_number=phone_number,
        home_page=home_page,
        promoter=promoter
    )
    session.add(event)
    session.commit()
    print(f"Added event: {header}")

# Пример добавления событий в календарь
add_event(
    header="Международный семинар по AI",
    class_="Семинар",
    date_start="2023-11-15",
    date_end="2023-11-17",
    country="Россия",
    address="Москва, ул. Программирования, 1",
    email="info@ai-seminar.com",
    phone_number="+7 123 456 78 90",
    home_page="www.ai-seminar.com",
    promoter="AI Association"
)

add_event(
    header="Курс по веб-разработке",
    class_="Курс",
    date_start="2023-12-01",
    date_end="2023-12-30",
    country="Россия",
    address="Санкт-Петербург, ул. Веб-разработки, 2",
    email="contact@web-course.com",
    phone_number="+7 987 654 32 10",
    home_page="www.web-course.com",
    promoter="Web Academy"
)

# Закройте сессию
session.close()