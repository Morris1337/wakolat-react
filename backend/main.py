from typing import Annotated, Optional
import shutil
from random import choices
from string import ascii_lowercase, digits

from fastapi import FastAPI, Depends, HTTPException, status, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database.manager import db_manager
from pydantic_models.models import (
    News, News_mini, Competition, Competition_mini, Seminar, Seminar_mini, Calendar, 
    Responce_one_object, Responce_add_calendar
)
from auth.auth import app_auth
from auth.models import UserAuth
from auth.auth import get_current_user

# from auth.auth import get_current_user, app_auth, UserAuth
# from admin.admin import app_admin
UPLOAD_FOLDER = "upload"

app = FastAPI()
app.mount(f"/{UPLOAD_FOLDER}", StaticFiles(directory=UPLOAD_FOLDER), name="upload")
app.mount("/auth", app_auth)


origins = [
    "http://87.228.24.79:6052",
    "https://87.228.24.79:6052",
    "http://test-api.zapto.org:6052",
    "https://test-api.zapto.org:6052"
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def save_file(file: UploadFile, filename:str = None):
    if not filename:
        filename = ''.join(choices(ascii_lowercase + digits, k=8)) + "_" + file.filename.lower()

    with open(f"{UPLOAD_FOLDER}/{filename}", "wb") as wf:
        shutil.copyfileobj(file.file, wf)

    return filename



@app.get("/api/get_news")
def get_news(
    # current_user: Annotated[UserAuth, Depends(get_current_user)]
) -> list[News_mini]:
    res = db_manager.get_news()
    return res

@app.get("/api/get_competitions")
def get_competitions(
    # current_user: Annotated[UserAuth, Depends(get_current_user)]
) -> list[Competition_mini]:
    res = db_manager.get_competitions()
    return res


@app.get("/api/get_seminars")
def get_seminars(
    # current_user: Annotated[UserAuth, Depends(get_current_user)]
) -> list[Seminar_mini]:
    res = db_manager.get_seminars()
    return res

@app.post("/api/get_one_news")
def get_one_news(
    responce: Responce_one_object
    # current_user: Annotated[UserAuth, Depends(get_current_user)]
) -> News:
    id = responce.id
    res = db_manager.get_one_news(id)
    if not res:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="no news with such ID",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return res


@app.post("/api/get_one_competition")
def get_one_competition(
    responce: Responce_one_object
    # current_user: Annotated[UserAuth, Depends(get_current_user)]
) -> Competition:
    id = responce.id
    res = db_manager.get_one_competition(id)
    if not res:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="no competition with such ID",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return res

@app.post("/api/get_one_seminar")
def get_one_seminar(
    responce: Responce_one_object
    # current_user: Annotated[UserAuth, Depends(get_current_user)]
) -> Seminar:
    id = responce.id
    res = db_manager.get_one_seminar(id)
    if not res:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="no competition with such ID",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return res

@app.get("/api/get_calendar")
def get_calendar(
    # current_user: Annotated[UserAuth, Depends(get_current_user)]
) -> list[Calendar]:
    res = db_manager.get_calendar()
    return res



@app.post("/api/add_news")
def add_news(
    header: str = Form(...),
    image: UploadFile = File(...),  # Обработка файла,
    text: str = Form(...),
    date: str = Form(...)
) -> None:
    
    filename = save_file(image)
    db_manager.add_news(header = header,
                        image = filename,
                        text = text,
                        date = date
                        )
    return



@app.post("/api/add_competition")
def add_competition(
    header: str = Form(...),
    image1: UploadFile = File(...),  # Обработка файла,
    image2: Optional[UploadFile] = File(None), # Обработка файла,
    country: str = Form(...),
    city: str = Form(...),
    email: str = Form(...),
    phone_number: str = Form(...),
    date_start: str = Form(...),
    date_end: str = Form(...),
    date_registration: str = Form(...),
    price: str = Form(...),
    text: str = Form(...),
) -> None:
    
    filename_image1 = save_file(image1)
    filename_image2 = save_file(image2) if image2 else None

    db_manager.add_competition(    
                        header = header,
                        image = filename_image1,
                        image_second = filename_image2,
                        country = country,
                        city = city,
                        email = email,
                        phone_number = phone_number,
                        date_start = date_start,
                        date_end = date_end,
                        date_registration = date_registration,
                        price = price,
                        text = text
                        )
    return


@app.post("/api/add_seminar")
async def add_seminar(
    header: str = Form(...),
    file: UploadFile = File(...),  # Обработка файла
    country: str = Form(...),
    city: str = Form(...),
    email: str = Form(...),
    phone_number: str = Form(...),
    date_start: str = Form(...),
    date_end: str = Form(...),
    date_registration: str = Form(...),
    price: str = Form(...),
    text: str = Form(...)
) -> None:

    filename = save_file(file)
    db_manager.add_seminar(    
                        header = header,
                        image = filename,
                        country = country,
                        city = city,
                        email = email,
                        phone_number = phone_number,
                        date_start = date_start,
                        date_end = date_end,
                        date_registration = date_registration,
                        price = price,
                        text = text
                        )
    return



@app.post("/api/add_calendar")
def add_calendar(
    # responce: Responce_add_calendar
    responce: Annotated[Responce_add_calendar, Form()]
) -> None:
    db_manager.add_row_calendar(    
                        header = responce.header,
                        class_ = responce.class_,
                        date_start = responce.date_start,
                        date_end = responce.date_end,
                        country = responce.country,
                        address = responce.address,
                        email = responce.email,
                        phone_number = responce.phone_number,
                        home_page = responce.home_page,
                        promoter = responce.promoter,
                        )
    return




if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", reload=True)