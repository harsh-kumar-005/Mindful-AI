import os
from typing import List, Dict,  Optional
import google.generativeai as genai
from config import settings
import random

class AIService:
    """Service for AI chat interactions using Google Gemini"""
    
    def __init__(self):
        """Initialize AI service"""
        self.use_mock = not hasattr(settings, 'gemini_api_key') or settings.gemini_api_key == "your_gemini_api_key_here"
        
        if not self.use_mock:
            genai.configure(api_key=settings.gemini_api_key)
            self.model = genai.GenerativeModel('gemini-pro')
        
        # System prompt for mental health support
        self.system_prompt = """You are MindfulAI, a compassionate and empathetic mental health companion. 
Your role is to provide emotional support, active listening, and helpful coping strategies.

Guidelines:
- Be warm, empathetic, and non-judgmental
- Practice active listening and validate emotions
- Offer coping strategies when appropriate
- Detect crisis situations and provide helpline resources
- Never diagnose or replace professional therapy
- Encourage professional help when needed
- Keep responses concise but meaningful (2-4 sentences)
- Be conversational and supportive

Remember: You're here to support, not to fix. Listen first, then help."""

    async def get_response(self, message: str, conversation_history: Optional[List[Dict]] = None) -> str:
        """Get AI response to user message"""
        
        if self.use_mock:
            return self._get_mock_response(message)
        
        try:
            # Build conversation context
            context = self.system_prompt + "\n\n"
            
            # Add conversation history
            if conversation_history:
                for msg in conversation_history[-6:]:  # Last 6 messages for context
                    role = "User" if msg["role"] == "user" else "Assistant"
                    context += f"{role}: {msg['content']}\n"
            
            # Add current message
            context += f"User: {message}\nAssistant:"
            
            # Get response from Gemini
            response = self.model.generate_content(context)
            
            return response.text
            
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return self._get_mock_response(message)
    
    def _get_mock_response(self, message: str) -> str:
        """Generate mock AI response for demo purposes"""
        
        message_lower = message.lower()
        
        # Crisis detection
        crisis_keywords = ["suicide", "kill myself", "end it all", "want to die", "no point living", "harm myself"]
        if any(keyword in message_lower for keyword in crisis_keywords):
            return """I'm really concerned about what you're sharing. Your life matters, and there are people who want to help. 
Please reach out to the National Suicide Prevention Lifeline at 1-800-273-8255 (available 24/7) or text HOME to 741741. 
I'm here with you, but professional support is crucial right now."""
        
        # Anxiety responses
        if any(word in message_lower for word in ["anxious", "anxiety", "worried", "panic", "nervous", "stressed"]):
            responses = [
                "I hear that you're feeling anxious. That must be really difficult. Would you like to try a quick breathing exercise together? It can help calm your nervous system.",
                "Anxiety can feel overwhelming. Remember, these feelings are temporary. Let's take this one moment at a time. What's one small thing that might help you feel a bit safer right now?",
                "Thank you for sharing that with me. Anxiety is tough, but you're not alone in this. Have you noticed any particular triggers today? Sometimes identifying them can help us manage them better."
            ]
            return random.choice(responses)
        
        # Depression responses
        if any(word in message_lower for word in ["depressed", "depression", "sad", "hopeless", "empty", "numb"]):
            responses = [
                "I'm sorry you're going through this. Depression can make everything feel heavy. Your feelings are valid, and it's brave of you to reach out. What's been the hardest part for you today?",
                "Thank you for trusting me with this. Depression can be so isolating, but you don't have to face it alone. Even small steps matter. Is there one tiny thing that brought you even a moment of comfort recently?",
                "I hear your pain, and I want you to know it's okay to not be okay. You're doing your best, and that's enough. Have you been able to talk to anyone else about how you're feeling?"
            ]
            return random.choice(responses)
        
        # Positive/gratitude responses
        if any(word in message_lower for word in ["happy", "good", "better", "grateful", "thankful", "proud", "excited"]):
            responses = [
                "That's wonderful to hear! It's so important to celebrate these moments, no matter how small. What made today feel good for you?",
                "I'm really glad you're experiencing something positive. Savoring these feelings can help build resilience. Tell me more about what's going well!",
                "That's beautiful. Moments like these matter, even the small ones. How does it feel to share this good news?"
            ]
            return random.choice(responses)
        
        # Sleep/insomnia
        if any(word in message_lower for word in ["sleep", "insomnia", "tired", "exhausted", "can't sleep"]):
            responses = [
                "Sleep issues can be so frustrating. Not getting enough rest affects everything. Have you tried any relaxation techniques before bed? Sometimes a simple breathing exercise can help.",
                "I understand how exhausting poor sleep can be. Your body and mind need rest to heal. What's your bedtime routine like? Small changes can sometimes make a big difference.",
            ]
            return random.choice(responses)
        
        # Loneliness
        if any(word in message_lower for word in ["lonely", "alone", "isolated", "no friends", "nobody"]):
            responses = [
                "Feeling lonely is really painful. You deserve connection and support. I'm here with you right now. Have you thought about reaching out to anyone, even just to say hello?",
                "I hear you, and I want you to know that you're not as alone as it might feel. Loneliness is something many people experience. What kinds of connections feel most meaningful to you?",
            ]
            return random.choice(responses)
        
        # Default empathetic responses
        default_responses = [
            "Thank you for sharing that with me. I'm here to listen. How are you feeling about all of this?",
            "I appreciate you opening up. Your feelings are valid and important. What would be most helpful for you right now?",
            "I hear you. It takes courage to express what you're going through. Would you like to talk more about it, or would you prefer some coping strategies?",
            "That sounds challenging. I'm here with you. What's weighing most heavily on your mind right now?",
            "Thank you for trusting me with this. How can I best support you? Would you like to explore this further or talk about something else?"
        ]
        
        return random.choice(default_responses)

# Create service instance
ai_service = AIService()
