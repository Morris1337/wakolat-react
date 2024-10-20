from pydantic import BaseModel
from typing import Optional



class News_mini(BaseModel):
    id: int
    header: str
    date: str
    image: str

class News(BaseModel):
    id: int
    header: str
    date: str
    image: str
    text: str
    pdf: Optional[str]


class Competition_mini(BaseModel):
    id: int
    header: str
    image: str
    country: str

class Competition(BaseModel):
    id: int
    header: str
    image: str
    image_second: str
    country: str
    city: str
    email: str
    phone_number: str
    date_start: str
    date_end: str
    date_registration: str
    price: str
    text: str


class Seminar_mini(BaseModel):
    id: int
    header: str
    image: str


class Seminar(BaseModel):
    id: int
    header: str
    image: str
    country: str
    city: str
    email: str
    phone_number: str
    date_start: str
    date_end: str
    date_registration: str
    price: str
    text: str


class Calendar(BaseModel):
    id: int
    header: str
    class_: str
    country: str
    date_start: str
    date_end: str
    country: str
    address: str
    email: str
    home_page: str
    phone_number: str
    promoter: str 

class Responce_one_object(BaseModel):
    id: int
    

class Responce_add_calendar(BaseModel):
    header: str
    class_: str
    country: str
    date_start: str
    date_end: str
    country: str
    address: str
    email: str
    home_page: str
    phone_number: str
    promoter: str 
    image: bytes | None = None