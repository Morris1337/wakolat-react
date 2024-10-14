from datetime import datetime, timedelta, timezone
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status, Header, Cookie, Form
from fastapi.responses import Response

import jwt
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext

from .models import *
from database.manager import db_manager


# jwt
SECRET_KEY = "09d25e094faa6ca255asdasa9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10_000

# custom csrf
# CSRF_SECRET = "aoqedmans,dnkq"
# CSRF_EXPIRE_MINUTE = 10


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
app_auth = FastAPI()



def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(username: str, password: str) -> bool | UserAuth:

    user_db = db_manager.get_user(username)
    if not user_db:
        return False
    
    user = UserAuth(**user_db)
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(   
        # access_token: Annotated[str | None, Header(convert_underscores=False)] = None,
        access_token: str = Cookie(default=None)
    ) -> UserAuth:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        username: str = payload.get("username")
        user = UserAuth(id=user_id, username=username)
    except InvalidTokenError:
        raise credentials_exception
    
    return user


# def validate_csrf(
#     csrf_token: Annotated[str | None, Header(convert_underscores=False)] = None,
# ) -> bool:
    
#     token = csrf_token

#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate csrf",
#         headers={"WWW-Authenticate": "Bearer"},
#     )

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#     except InvalidTokenError:
#         raise credentials_exception
    
#     return True


# @app_auth.get("/get_csrf")
# def get_csrf():
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     token = create_access_token({"csrf": CSRF_SECRET}, expires_delta=access_token_expires)
#     return {"csrf_token": token}


@app_auth.post("/login")
async def login_for_access_token(
    responce: Response,
    login: str = Form(...),
    password: str = Form(...),
    # form_data: Annotated[Login_data, Form()],
    # csrf: Annotated[bool, Depends(validate_csrf)]
):

    # проверить логин и пароль
    user = authenticate_user(login, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # создать acces token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user.username, "user_id": user.id}, expires_delta=access_token_expires
    )

    # можно в куки положить токен
    responce.set_cookie(key="access_token", 
                        value=access_token, 
                        httponly=True,
                        samesite='none',
                        secure=True,
                        )
    return "login"


# фронт get запросом проверяет авторизацию
# @app_auth.get("/check_auth")
# async def check_auth(current_user: Annotated[str, Depends(get_current_user)]) -> bool:
#     return True


# @app_auth.post("/registration")
# async def registration(
#     form_data: Registration_data,
#     # csrf_token: Annotated[bool, Depends(validate_csrf)]
# ) -> Token:
    
#     username = form_data.username
#     email = form_data.email
#     password = form_data.password
#     password2 = form_data.password2 
    
#     if password != password2:
#         raise HTTPException(status_code=400, detail="Пароли не совпадают")
    
#     res = db_manager.check_username(username)
#     if res:
#         raise HTTPException(status_code=400, detail="username занят")
    
#     res = db_manager.check_email(email)
#     if res:
#         raise HTTPException(status_code=400, detail="email занят")
    
#     try:
#         db_manager.add_user(username, get_password_hash(password), email)
#     except Exception as e:
#         print(e)
#         raise HTTPException(status_code=400, detail="ошибка при регистрации. Ошибка при записи в БД")


#     # при регистрации сразу авторизовать
#     # создать acces token
#     user = db_manager.get_user(username=username)
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"username": user.username, "user_id": user.id}, expires_delta=access_token_expires
#     )

#     return Token(access_token=access_token, token_type="bearer")



# logout - удалить токен из кук
@app_auth.get("/logout")
async def logout(responce: Response):
    responce.delete_cookie(key="access_token")
    return "exit"


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("auth:app", host="0.0.0.0", port=8001, reload=True, workers=1)