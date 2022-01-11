from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.core import auth, config
from app.routes import catalog_routes
from app.core.database import updateDbSchemaAndBaseData 

#before app init we try to upadte DB to have the right schema and base data
if config.DB_AUTO_UPDATE_SCHEMA_AND_BASE_DATA_ON_START:
    updateDbSchemaAndBaseData()

# an instance of the main FastAPI object to run the API
app = FastAPI()
# these properties are used for OpenAPI documentation
app.title = "ELI PANDA GATEWAY"
app.description = "REST API GATEWAY for ELI oPerations And maiNtenance DAtabase"

# CORS
# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# add all possible routes to the FastAPI router manager
app.include_router(auth.router)
app.include_router(catalog_routes.router)
