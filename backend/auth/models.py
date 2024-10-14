from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


# залогиненый юзер
class UserAuth(BaseModel):
    id: int
    username: str
    password: str | None = None
    email: str | None = None


# post запросы на авторизацию/регистрацию с фронта
class Login_data(BaseModel):
    username: str
    password: str

class Registration_data(BaseModel):
    username: str
    email: str
    password: str
    password2: str


