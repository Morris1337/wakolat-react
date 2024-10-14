from auth.auth import get_password_hash
from database.manager import db_manager

username = "admin"
password = "nAaoheqnm1"
email = "email@admin.com"

if __name__ == "__main__":
    db_manager.add_user(username, get_password_hash(password), email)