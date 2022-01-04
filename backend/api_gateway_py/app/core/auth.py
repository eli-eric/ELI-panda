from __future__ import annotations
from dataclasses import dataclass

from datetime import datetime, timedelta
from http import HTTPStatus
from typing import Any, Optional, Union
from app.core.database import dbConnection
from app.models.base_models import BaseDbModel
import fastapi

import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt import PyJWTError
from passlib.context import CryptContext
from psycopg.rows import class_row, tuple_row
from pydantic import BaseModel

from app.core import config


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None

# represent t_security_user
@dataclass
class SecurityUser(BaseDbModel):
    username: str
    is_enabled: bool
    password_hash: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")
router = APIRouter()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def get_user(   
    username: Optional[str],
) -> SecurityUser:
    res:SecurityUser = None

     # Connect to an existing database
    with dbConnection() as conn:
        # Open a cursor to perform database operations
        with conn.cursor(row_factory=class_row(SecurityUser)) as cur:
            
            # Execute a command: this creates a new table
            cur.execute("""
            select "id", "username", "password_hash", "is_enabled" from panda.t_security_user where username=%s
            """,(username,))

            res = cur.fetchone()

    return res           
            


def authenticate_user(    
    username: str,
    password: str,
) -> Union[bool, SecurityUser]:

    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta = None) -> bytes:
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        config.API_SECRET_KEY,
        algorithm=config.API_ALGORITHM,
    )
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)) -> SecurityUser:
    credentials_exception = HTTPException(
        status_code=HTTPStatus.UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            config.API_SECRET_KEY,
            algorithms=[config.API_ALGORITHM],
        )
        username = payload.get("sub")

        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)

    except PyJWTError:
        raise credentials_exception

    user = get_user(username=token_data.username)

    if user is None:
        raise credentials_exception
    return user


@router.post("/authenticate", response_model=Token, tags=["security"])
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> dict[str, Any]:

    user = authenticate_user(        
        form_data.username,
        form_data.password,
    )

    if not user:
        raise HTTPException(
            status_code=HTTPStatus.UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(
        seconds=config.API_ACCESS_TOKEN_EXPIRE_MINUTES,
    )
    access_token = create_access_token(
        data={"sub": user.username},  # type: ignore
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}

