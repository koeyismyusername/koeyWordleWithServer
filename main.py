from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
import random

app = FastAPI()

CHAR_SET = "QWERTYUIOPASDFGHJKLZXCVBNM"

#정답을 만드는 함수
def makeAnswer():
  count = 0
  indexes = []
  result = ""
  while True:
    index = random.randint(0, 25)
    if (index not in indexes):
      indexes.append(index)
      count += 1
      if count == 5:
        for i in indexes:
          result += CHAR_SET[i]
        
        return result

# 정답 만들기
ANSWER = makeAnswer()

@app.get("/answer")
def getAnswer():
  return ANSWER


app.mount("/", StaticFiles(directory="static", html=True), name="static")