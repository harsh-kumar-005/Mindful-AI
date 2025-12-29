import os
from typing import List, Dict
from openai import OpenAI
from config import settings
import random

class AIService:
    """Service for AI chat interactions"""
    
    def __init__(self):
        """Initialize AI service"""
        self.use_mock = not settings.openai_api_key or settings.openai_api_key == "your_openai_api_key_here"
        
        if not self.use_mock:
            self.client = OpenAI(api_key=settings.openai_api_key)
        
        # System prompt for mental health support
        self.system_prompt = """You are a compassionate and empathetic AI mental health companion named MindfulAI. 
Your role is to provide emotional support, active listening, and helpful coping strategies.

Guidelines:
- Be warm, empathetic, and non-judgmental
- Practice active listening and validate emotions
- Offer coping strategies when appropriate
- Detect crisis situations and provide helpline resources
- Never diagnose or replace professional therapy
- Encourage professional help when needed
- Keep responses concise but meaningful (2-4 sentences)

Remember: You're here to support, not to fix. Listen first, then help."""

    async def get_response(self, message: str, conversation_history: List[Dict] = None) -> str:
        """Get AI response to user message"""
        
        if self.use_mock:
            return self._get_mock_response(message)
        
        try:
            # Build messages for OpenAI
            messages = [{"role": "system", "content": self.system_prompt}]
            
            # Add conversation history
            if conversation_history:
                messages.extend(conversation_history[-10:])  # Last 10 messages for context
            
            # Add current message
            messages.append({"role": "user", "content": message})
            
            # Get response from OpenAI
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=messages,
                max_tokens=200,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"OpenAI API Error: {e}")
            return self._get_mock_response(message)
    
    def _get_mock_response(self, message: str) -> str:
        """Generate mock AI response for demo purposes"""
        
        message_lower = message.lower()
        
        # Crisis detection
        crisis_keywords = ["suicide", "kill myself", "end it all", "want to die", "no point living"]
        if any(keyword in message_lower for keyword in crisis_keywords):
            return """I'm really concerned about what you're sharing. Your life matters, and there are people who want to help. 
Please reach out to the National Suicide Prevention Lifeline at 1-800-273-8255 (available 24/7) or text HOME to 741741. 
I'm here with you, but professional support is crucial right now."""
        
        # Anxiety responses
        if any(word in message_lower for word in ["anxious", "anxiety", "worried", "panic", "nervous"]):
            responses = [
                "I hear that you're feeling anxious. That must be really difficult. Would you like to try a quick breathing exercise together? It can help calm your nervous system.",
                "Anxiety can feel overwhelming. Remember, these feelings are temporary. Let's take this one moment at a time. What's one small thing that might help you feel a bit safer right now?",
                "Thank you for sharing that with me. Anxiety is tough, but you're not alone in this. Have you noticed any particular triggers today?"
            ]
            return random.choice(responses)
        
        # Depression responses
        if any(word in message_lower for word in ["depressed", "depression", "sad", "hopeless", "empty"]):
            responses = [
                "I'm sorry you're going through this. Depression can make everything feel heavy. Your feelings are valid, and it's brave of you to reach out. What's been the hardest part today?",
                "Thank you for trusting me with this. Depression can be isolating, but you don't have to face it alone. Even small steps matter. Is there one tiny thing that brought you even a moment of comfort recently?",
                "I hear your pain, and I want you to know it's okay to not be okay. You're doing your best, and that's enough. Have you been able to talk to anyone else about how you're feeling?"
            ]
            return random.choice(responses)
        
        # Stress responses
        if any(word in message_lower for word in ["stress", "stressed", "overwhelmed", "too much", "pressure"]):
            responses = [
                "It sounds like you're carrying a lot right now. That's really hard. Let's break this down together - what feels most urgent to you?",
                "Feeling overwhelmed is exhausting. Remember, you don't have to do everything at once. What's one thing you could let go of or postpone?",
                "I hear that you're under a lot of pressure. Your well-being matters more than any task. Have you taken a break today?"
            ]
            return random.choice(responses)
        
        # Positive/gratitude responses
        if any(word in message_lower for word in ["happy", "good", "better", "grateful", "thankful", "proud"]):
            responses = [
                "That's wonderful to hear! It's important to celebrate these moments. What made today feel good for you?",
                "I'm so glad you're experiencing something positive. Savoring these feelings can really help. Tell me more about what's going well!",
                "That's beautiful. Moments like these matter, even the small ones. How does it feel to share this good news?"
            ]
            return random.choice(responses)
        
        # Default empathetic responses
        default_responses = [
            "Thank you for sharing that with me. I'm here to listen. How are you feeling about all of this?",
            "I appreciate you opening up. Your feelings matter. What would be most helpful for you right now?",
            "I hear you. It takes courage to express what you're going through. Would you like to talk more about it?",
            "That sounds challenging. I'm here with you. What's on your mind?",
            "Thank you for trusting me with this. How can I best support you right now?"
        ]
        
        return random.choice(default_responses)

# Create service instance
ai_service = AIService()
