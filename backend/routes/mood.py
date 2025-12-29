from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import random

router = APIRouter()

# In-memory storage for demo
mood_data_store = {}

class MoodEntry(BaseModel):
    """Mood entry model"""
    mood: str  # happy, sad, anxious, angry, neutral, etc.
    intensity: int  # 1-10
    triggers: Optional[List[str]] = []
    notes: Optional[str] = ""
    user_id: Optional[str] = "demo_user"

class MoodResponse(BaseModel):
    """Mood response model"""
    id: str
    mood: str
    intensity: int
    triggers: List[str]
    notes: str
    timestamp: str

class MoodStats(BaseModel):
    """Mood statistics"""
    average_mood_score: float
    most_common_mood: str
    total_entries: int
    mood_distribution: dict

@router.post("/log", response_model=MoodResponse)
async def log_mood(mood_entry: MoodEntry):
    """Log a mood entry"""
    try:
        user_id = mood_entry.user_id
        
        if user_id not in mood_data_store:
            mood_data_store[user_id] = []
        
        # Create mood entry
        entry_id = f"{user_id}_{datetime.now().timestamp()}"
        timestamp = datetime.now().isoformat()
        
        mood_data = {
            "id": entry_id,
            "mood": mood_entry.mood,
            "intensity": mood_entry.intensity,
            "triggers": mood_entry.triggers or [],
            "notes": mood_entry.notes or "",
            "timestamp": timestamp
        }
        
        mood_data_store[user_id].append(mood_data)
        
        return MoodResponse(**mood_data)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history", response_model=List[MoodResponse])
async def get_mood_history(user_id: str = "demo_user", days: int = 30):
    """Get mood history for a user"""
    if user_id not in mood_data_store:
        return []
    
    # Filter by date range
    cutoff_date = datetime.now() - timedelta(days=days)
    
    filtered_moods = [
        MoodResponse(**mood)
        for mood in mood_data_store[user_id]
        if datetime.fromisoformat(mood["timestamp"]) > cutoff_date
    ]
    
    return filtered_moods

@router.get("/stats", response_model=MoodStats)
async def get_mood_stats(user_id: str = "demo_user", days: int = 30):
    """Get mood statistics"""
    if user_id not in mood_data_store or not mood_data_store[user_id]:
        return MoodStats(
            average_mood_score=0.0,
            most_common_mood="neutral",
            total_entries=0,
            mood_distribution={}
        )
    
    # Filter by date range
    cutoff_date = datetime.now() - timedelta(days=days)
    recent_moods = [
        mood for mood in mood_data_store[user_id]
        if datetime.fromisoformat(mood["timestamp"]) > cutoff_date
    ]
    
    if not recent_moods:
        return MoodStats(
            average_mood_score=0.0,
            most_common_mood="neutral",
            total_entries=0,
            mood_distribution={}
        )
    
    # Calculate statistics
    total_entries = len(recent_moods)
    average_score = sum(mood["intensity"] for mood in recent_moods) / total_entries
    
    # Mood distribution
    mood_counts = {}
    for mood in recent_moods:
        mood_type = mood["mood"]
        mood_counts[mood_type] = mood_counts.get(mood_type, 0) + 1
    
    most_common = max(mood_counts, key=mood_counts.get)
    
    return MoodStats(
        average_mood_score=round(average_score, 2),
        most_common_mood=most_common,
        total_entries=total_entries,
        mood_distribution=mood_counts
    )
