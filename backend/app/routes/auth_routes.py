from fastapi import APIRouter, HTTPException
from app.schemas.user_schema import (
    UserRegister,
    UserLogin
)
from app.database import database
from app.auth.password_handler import (
    hash_password,
    verify_password
)
from app.auth.jwt_handler import create_access_token

router = APIRouter()

users_collection = database.users


@router.post("/register")
async def register(user: UserRegister):

    existing_user = await users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_pw = hash_password(user.password)

    user_data = {
        "username": user.username,
        "email": user.email,
        "password": hashed_pw,
        "role": "user"
    }

    await users_collection.insert_one(user_data)

    return {"message": "User registered successfully"}


@router.post("/login")
async def login(user: UserLogin):

    db_user = await users_collection.find_one(
        {"email": user.email}
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email"
        )

    valid_password = verify_password(
        user.password,
        db_user["password"]
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token(
        {
            "user_id": str(db_user["_id"]),
            "email": db_user["email"],
            "role": db_user["role"]
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }