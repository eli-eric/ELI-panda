from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.core import auth
from app.routes import catalog_routes

app = FastAPI()
app.title = "ELI PANDA GATEWAY"
app.description = "REST API GATEWAY for ELI oPerations And maiNtenance DAtabase"
# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(catalog_routes.router)
