from fastapi import FastAPI
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000",
]

# Use Ollama LLaMA model
llm = Ollama(model="llama3")  # You can change to "llama2" or "mistral" etc.

prompt = PromptTemplate(
    input_variables=["message"],
    template="You are a helpful assistant. User says: {message}"
)

chain = LLMChain(llm=llm, prompt=prompt)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    message: str

def process_message(message: str) -> str:
    response = chain.invoke({"message": message})
    return response["text"] if isinstance(response, dict) and "text" in response else str(response)

@app.post("/chatbot")
async def get_response(query: Query) :
    response = process_message(query.message)
    return {"response": response}

def main():
    pass

if __name__ == "__main__":
    pass
