from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

class TemperatureRecording(BaseModel):
    time: float
    temp: float

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

logger = logging.getLogger('uvicorn.error')
logger.setLevel(logging.DEBUG)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

latest_reading = TemperatureRecording(time=0.0, temp=0.0)
app.temperature = 0.0
app.time = 0.0



@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.get("/api/temp", tags=["temp"])
async def get_temp() -> JSONResponse:
    data = jsonable_encoder(latest_reading)
    return JSONResponse(data)

@app.post("/api/temp", tags=["temp"])
async def record_temp(record: TemperatureRecording) -> dict:
    latest_reading.temp = record.temp
    latest_reading.time = record.time
    logger.debug("Temp was recorded as " + str(app.temperature))
    return {
        "data": { "Temperature recorded." }
    }
