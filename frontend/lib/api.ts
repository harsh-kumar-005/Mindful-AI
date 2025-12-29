import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Chat API
export const chatAPI = {
  sendMessage: async (message: string, userId: string = 'demo_user') => {
    const response = await api.post('/api/chat/send', { message, user_id: userId });
    return response.data;
  },
  
  getHistory: async (userId: string = 'demo_user') => {
    const response = await api.get(`/api/chat/history?user_id=${userId}`);
    return response.data;
  },
  
  clearHistory: async (userId: string = 'demo_user') => {
    const response = await api.delete(`/api/chat/clear?user_id=${userId}`);
    return response.data;
  },
};

// Mood API
export const moodAPI = {
  logMood: async (mood: string, intensity: number, triggers: string[] = [], notes: string = '', userId: string = 'demo_user') => {
    const response = await api.post('/api/mood/log', {
      mood,
      intensity,
      triggers,
      notes,
      user_id: userId,
    });
    return response.data;
  },
  
  getHistory: async (userId: string = 'demo_user', days: number = 30) => {
    const response = await api.get(`/api/mood/history?user_id=${userId}&days=${days}`);
    return response.data;
  },
  
  getStats: async (userId: string = 'demo_user', days: number = 30) => {
    const response = await api.get(`/api/mood/stats?user_id=${userId}&days=${days}`);
    return response.data;
  },
};
