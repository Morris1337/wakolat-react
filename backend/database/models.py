from sqlalchemy import Integer, String, ForeignKey, Text, Boolean
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class News(Base):
    __tablename__ = "news"
    id: Mapped[int] = mapped_column(primary_key=True)
    header: Mapped[str] = mapped_column(String(100), nullable=False)
    image: Mapped[str] = mapped_column(String(100), nullable=True)
    file: Mapped[str] = mapped_column(String(100), nullable=True)
    text: Mapped[str] = mapped_column(Text, nullable=True)
    date: Mapped[str] = mapped_column(String(30), nullable=True)
    
    def __str__(self) -> str:
        return f"{self.id}. {self.header}"
    
    def __unicode__(self):
        return self.header

    def __repr__(self) -> str:
        return f"News(id={self.id!r}, header={self.header!r}, image={self.image!r}, date={self.date!r})"
    

class Competitions(Base):
    __tablename__ = "competitions"
    id: Mapped[int] = mapped_column(primary_key=True)
    header: Mapped[str] = mapped_column(String(100), nullable=False)
    image: Mapped[str] = mapped_column(String(100), nullable=True)
    image_second: Mapped[str] = mapped_column(String(100), nullable=True)
    country: Mapped[str] = mapped_column(String(50), nullable=True)
    city: Mapped[str] = mapped_column(String(50), nullable=True)
    email: Mapped[str] = mapped_column(String(100), nullable=True)
    phone_number: Mapped[str] = mapped_column(String(100), nullable=True)
    date_start: Mapped[str] = mapped_column(String(30), nullable=True)
    date_end: Mapped[str] = mapped_column(String(30), nullable=True)
    date_registration: Mapped[str] = mapped_column(String(30), nullable=True)
    price: Mapped[str] = mapped_column(String(30), nullable=True)
    text: Mapped[str] = mapped_column(Text, nullable=True)

    def __repr__(self) -> str:
        return f"Competitions(id={self.id!r}, header={self.header!r})"
 

    
class Seminar(Base):
    __tablename__ = "seminars"
    id: Mapped[int] = mapped_column(primary_key=True)
    header: Mapped[str] = mapped_column(String(100), nullable=False)
    image: Mapped[str] = mapped_column(String(100), nullable=True)
    country: Mapped[str] = mapped_column(String(50), nullable=True)
    city: Mapped[str] = mapped_column(String(50), nullable=True)
    email: Mapped[str] = mapped_column(String(100), nullable=True)
    phone_number: Mapped[str] = mapped_column(String(100), nullable=True)
    date_start: Mapped[str] = mapped_column(String(30), nullable=True)
    date_end: Mapped[str] = mapped_column(String(30), nullable=True)
    date_registration: Mapped[str] = mapped_column(String(30), nullable=True)
    price: Mapped[str] = mapped_column(String(30), nullable=True)
    text: Mapped[str] = mapped_column(Text, nullable=True)
    
    def __repr__(self) -> str:
        return f"Seminar(id={self.id!r}, header={self.header!r})" 

class Calendar(Base):
    __tablename__ = "calendar"
    id: Mapped[int] = mapped_column(primary_key=True)
    header: Mapped[str] = mapped_column(String(100), nullable=False)
    class_: Mapped[str] = mapped_column(String(100), nullable=True)
    date_start: Mapped[str] = mapped_column(String(30), nullable=True)
    date_end: Mapped[str] = mapped_column(String(30), nullable=True)
    country: Mapped[str] = mapped_column(String(50), nullable=True)
    address: Mapped[str] = mapped_column(String(100), nullable=True)
    email: Mapped[str] = mapped_column(String(100), nullable=True)
    phone_number: Mapped[str] = mapped_column(String(100), nullable=True)
    home_page: Mapped[str] = mapped_column(String(30), nullable=True)
    promoter: Mapped[str] = mapped_column(String(30), nullable=True)

    def __repr__(self) -> str:
        return f"Calendar(id={self.id!r}, header={self.header!r})" 


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=True)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)
    
    def __str__(self) -> str:
        return f"{self.id}. {self.username}"
    
    def __unicode__(self):
        return self.username

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, username={self.username!r}, email={self.email!r}, password={self.password!r})"
    
