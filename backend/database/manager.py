from sqlalchemy.orm import Session
from sqlalchemy import insert, select, update, and_, create_engine, desc
# from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from .models import Base, User, News, Competitions, Seminar,Calendar
from .config import DB_NAME





class DB_manager:
    def __init__(self, db: str = "db.db") -> None:
        self.db = db
        self.engine = create_engine(f"sqlite+pysqlite:///{self.db}")

        # self.async_engine = create_async_engine(f"sqlite+aiosqlite:///{self.db}")
        # self.sqlalchemy_sessionmaker = async_sessionmaker(self.async_engine, expire_on_commit=False)

    def create_db(self):
        "создание БД и таблиц"
        Base.metadata.create_all(self.engine)

    def add_news(self, header, image, pdf, text, date, champ):
        "добавить новость"
        with Session(self.engine) as session:
            q = insert(News).values(header=header, image=image, pdf=pdf, text=text, date=date, champ=champ)
            session.execute(q)
            session.commit()
        return 
    
    def add_competition(self, header, image, image_second, country, city, email, phone_number, date_start, date_end, date_registration, price, text):
        "добавить соревнование"
        with Session(self.engine) as session:
            q = insert(Competitions).values(header=header, image=image, image_second=image_second, country=country, city=city, email=email, phone_number=phone_number, date_start=date_start, date_end=date_end, date_registration=date_registration, price=price, text=text)
            session.execute(q)
            session.commit()
        return 
    
    def add_seminar(self, header, image, country, city, email, phone_number, date_start, date_end, date_registration, price, text):
        "добавить соревнование"
        with Session(self.engine) as session:
            q = insert(Seminar).values(header=header, image=image, country=country, city=city, email=email, phone_number=phone_number, date_start=date_start, date_end=date_end, date_registration=date_registration, price=price, text=text)
            session.execute(q)
            session.commit()
        return 

    def add_row_calendar(self, header, class_, date_start, date_end, country, address, email, phone_number, home_page, promoter):
        "добавить соревнование"
        with Session(self.engine) as session:
            q = insert(Calendar).values(header=header, class_=class_, date_start=date_start, date_end=date_end, country=country, address=address, email=email, phone_number=phone_number, home_page=home_page, promoter=promoter)
            session.execute(q)
            session.commit()
        return 

    def get_news(self, count: int = 9) -> list:
        "отдаст 9 заголовков+картинка на главную"
        with Session(self.engine) as session:
            q = select(News.id, News.header, News.date, News.image)\
                .order_by(desc(News.id))\
                .limit(count)
            res = session.execute(q)
        return [{"id": row[0], "header": row[1], "date": row[2], "image": row[3]} for row in res]
        
    def get_news_champ(self, count: int = None) -> list:
        "отдаст 9 заголовков+картинка на главную"
        with Session(self.engine) as session:
            q = select(News.id, News.header, News.date, News.image)\
                .where(News.champ == True)\
                .order_by(desc(News.id))\
                .limit(count)
            res = session.execute(q)
        return [{"id": row[0], "header": row[1], "date": row[2], "image": row[3]} for row in res]

    # от хотел по 4 на группу - НО ПОКА ПРОСТО СПИСОК ПОСЛЕДНИХ
    def get_competitions(self, count: int = 15) -> list[dict]:
        "сореванования на главную по группам"
        with Session(self.engine) as session:
            q = select(Competitions.id, Competitions.header, Competitions.image, Competitions.country)\
                .order_by(desc(Competitions.id))\
                .limit(count)
            res = session.execute(q)
        return [{"id": row[0], "header": row[1], "image": row[2], "country": row[3]} for row in res]         


    def get_one_news(self, id: int) -> dict:
        "полностью 1 новость"
        with Session(self.engine) as session:
            q = select(News.id, News.header, News.text, News.date, News.image, News.pdf)\
                .where(News.id == id)
            row = session.execute(q).fetchone()
        
        if not row:
            return None
        
        return {"id": row[0], "header": row[1], "text": row[2], "date": row[3], "image": row[4], "pdf": row[5]}
        

    def get_seminars(self, count: int = 6) -> list:
        "6 симинаров: заголовки + картинки"
        with Session(self.engine) as session:
            q = select(Seminar.id, Seminar.header, Seminar.image)\
                .order_by(desc(Seminar.id))\
                .limit(count)
            res = session.execute(q)
        return [{"id": row[0], "header": row[1], "image": row[2]} for row in res]
        


    def get_one_competition(self, id: int) -> dict:
        "полностью 1 соревнование"
        with Session(self.engine) as session:
            q = select(Competitions.id, 
                       Competitions.header, 
                       Competitions.image, 
                       Competitions.image_second, 
                       Competitions.country, 
                       Competitions.city, 
                       Competitions.email, 
                       Competitions.phone_number, 
                       Competitions.date_start, 
                       Competitions.date_end, 
                       Competitions.date_registration, 
                       Competitions.price, 
                       Competitions.text)\
                .where(Competitions.id == id)
            row = session.execute(q).fetchone()
        if not row:
            return None
        
        return {"id": row[0], "header": row[1], "image": row[2], "image_second": row[3], 
                "country": row[4], "city": row[5], "email": row[6], "phone_number": row[7],
                "date_start": row[8], "date_end": row[9], "date_registration": row[10], "price": row[11], "text": row[12]}


    def get_one_seminar(self, id: int) -> dict:
        "полностью 1 семинар"
        with Session(self.engine) as session:
            q = select(Seminar.id, 
                       Seminar.header, 
                       Seminar.image, 
                       Seminar.country, 
                       Seminar.city, 
                       Seminar.email, 
                       Seminar.phone_number, 
                       Seminar.date_start, 
                       Seminar.date_end, 
                       Seminar.date_registration, 
                       Seminar.price, 
                       Seminar.text)\
                .where(Seminar.id == id)
            row = session.execute(q).fetchone()
        
        if not row:
            return None
        
        return {"id": row[0], "header": row[1], "image": row[2], "country": row[3], "city": row[4], 
                "email": row[5], "phone_number": row[6], "date_start": row[7], 
                "date_end": row[8], "date_registration": row[9], "price": row[10], "text": row[11]}


    def get_calendar(self, count: int = 30) -> dict:
        "календарь"
        with Session(self.engine) as session:
            q = select(Calendar.id, 
                        Calendar.header, 
                        Calendar.class_, 
                        Calendar.country, 
                        Calendar.date_start, 
                        Calendar.date_end, 
                        Calendar.country, 
                        Calendar.address, 
                        Calendar.email, 
                        Calendar.home_page, 
                        Calendar.phone_number, 
                        Calendar.promoter)\
                .order_by(desc(Calendar.id))\
                .limit(count)
            res = session.execute(q)

        return [{"id": row[0], "header": row[1], "class_": row[2], "country": row[3], "date_start": row[4], 
                "date_end": row[5], "country": row[6], "address": row[7], 
                "email": row[8], "home_page": row[9], "phone_number": row[10], "promoter": row[11]} for row in res]
    

    def add_user(self, username: str, password: str, email: str = None) -> None:
        "регисрация - пока не используется"
        with Session(self.engine) as session:
            q = insert(User)\
                .values(username = username, password = password, email = email)
            session.execute(q)
            session.commit()
        return

    def check_username(self, username: str) -> bool:
        "пока не используется"
        "проверка, есть ли такой username в БД"
        with Session(self.engine) as session:
            q = select(1)\
                .where(User.username == username)\
                .limit(1)
            res = session.execute(q).fetchone()
        
        return True if res else False
    
    def check_email(self, email: str) -> bool:
        "пока не используется"
        "проверка, если ли такой email в БД"
        with Session(self.engine) as session:
            q = select(1)\
                .where(User.email == email)\
                .limit(1)
            res = session.execute(q).fetchone()
        
        return True if res else False
    
    def get_user(self, username: str):
        "пока не используется"
        "если такой пользователь есть, вернуть его строку ввиде словаря из бд"
        with Session(self.engine) as session:
            q = select(User.id, User.username, User.password, User.email)\
                .where(User.username == username)
            res = session.execute(q).fetchone()
        if res:
            return res._mapping
        return res






# из других файлов импортируется этот объект
db_manager = DB_manager(DB_NAME)
db_manager.create_db()


if __name__ == "__main__":
    db_manager = DB_manager(DB_NAME)
    db_manager.create_db()
    # print(db_manager.get_news())
    print(db_manager.get_competitions())
    # print(db_manager.get_full_news(1))
    # print(db_manager.get_full_competition(2))
    # print(db_manager.get_full_seminar(2))
    # print(db_manager.get_calendar(0))
    # db_manager.add_news("заг", "img", "text", "date")
    # db_manager.add_row_calendar("заг", "class", "start", "end", "counrty", "addr", "email", "+90", "url", "promo")