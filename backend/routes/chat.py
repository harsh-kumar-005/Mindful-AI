from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from services.ai_service import ai_service
from datetime import datetime

router = APIRouter()

# In-memory storage for demo (replace with database in production)
chat_history_store = {}

class ChatMessage(BaseModel):
    """Chat message model"""
    message: str
    user_id: Optional[str] = "demo_user"

class ChatResponse(BaseModel):
    """Chat response model"""
    response: str
    timestamp: str

class ChatHistoryItem(BaseModel):
    """Chat history item"""
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: str

@router.post("/send", response_model=ChatResponse)
async def send_message(chat_message: ChatMessage):
    """Send a message and get AI response"""
    try:
        user_id = chat_message.user_id
        
        # Get conversation history
        if user_id not in chat_history_store:
            chat_history_store[user_id] = []
        
        conversation_history = chat_history_store[user_id]
        
        # Get AI response
        ai_response = await ai_service.get_response(
            chat_message.message,
            conversation_history
        )
        
        # Store in history
        timestamp = datetime.now().isoformat()
        chat_history_store[user_id].append({
            "role": "user",
            "content": chat_message.message,
            "timestamp": timestamp
        })
        chat_history_store[user_id].append({
            "role": "assistant",
            "content": ai_response,
            "timestamp": timestamp
        })
        
        # Keep only last 50 messages
        if len(chat_history_store[user_id]) > 50:
            chat_history_store[user_id] = chat_history_store[user_id][-50:]
        
        return ChatResponse(
            response=ai_response,
            timestamp=timestamp
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history", response_model=List[ChatHistoryItem])
async def get_chat_history(user_id: str = "demo_user"):
    """Get chat history for a user"""
    if user_id not in chat_history_store:
        return []
    
    return [
        ChatHistoryItem(**item)
        for item in chat_history_store[user_id]
    ]

@router.delete("/clear")
async def clear_chat_history(user_id: str = "demo_user"):
    """Clear chat history for a user"""
    if user_id in chat_history_store:
        chat_history_store[user_id] = []
    
    return {"message": "Chat history cleared successfully"}
