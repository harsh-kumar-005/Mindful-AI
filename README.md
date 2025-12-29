# 🧠 MindfulAI - AI-Powered Mental Health Companion

> 24/7 emotional support, mood tracking, and crisis detection powered by AI

![MindfulAI Banner](https://img.shields.io/badge/Hackathon-2024-blue) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![FastAPI](https://img.shields.io/badge/FastAPI-Python-green) ![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-orange)

## 🎯 Problem Statement

Mental health crisis is a global epidemic affecting 1 in 4 people, yet:
- 💰 Therapy is expensive and inaccessible
- 😔 There's stigma around seeking help
- ⏰ Crisis support isn't available 24/7
- 🎯 People lack personalized coping strategies

## 💡 Our Solution

**MindfulAI** is an accessible, judgment-free AI companion that provides:

- 🤖 **24/7 AI Chat Support** - Empathetic conversations powered by GPT-4
- 📊 **Mood Tracking** - Identify patterns and triggers
- 📝 **Private Journaling** - Secure space with sentiment analysis
- 🆘 **Crisis Detection** - Real-time intervention and resources
- 🧘 **Personalized Coping Strategies** - Breathing exercises, meditation guides

## ✨ Key Features

### 1. AI Chat Companion 💬
- Empathetic, judgment-free conversations
- Context-aware responses based on history
- Personalized coping strategy suggestions
- Available 24/7

### 2. Mood Tracking 📊
- Daily mood check-ins with emoji selection
- Trigger identification and pattern recognition
- Weekly/monthly mood trends visualization
- Insights into emotional well-being

### 3. Private Journal 📝
- Secure, encrypted journaling space
- AI-powered sentiment analysis
- Writing prompts for inspiration
- Searchable history

### 4. Crisis Support 🆘
- Real-time crisis keyword detection
- Immediate helpline resources
- Calming exercises and grounding techniques
- Emergency contact integration

### 5. Coping Strategies 🧘
- Personalized recommendations
- Guided breathing exercises
- Grounding techniques
- Meditation guides

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Chart.js** - Data visualization
- **Lucide Icons** - Beautiful iconography

### Backend
- **Python FastAPI** - High-performance async API
- **OpenAI API** - GPT-4 for AI conversations
- **SQLite** - Lightweight database
- **JWT** - Secure authentication

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- OpenAI API Key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/harsh-kumar-005/Mindful-AI.git
cd Mindful-AI
```

2. **Set up Frontend**
```bash
cd frontend
npm install
```

3. **Set up Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
```

4. **Configure Environment Variables**

Create `.env` file in `backend/`:
```env
OPENAI_API_KEY=your_openai_api_key_here
SECRET_KEY=your_secret_key_here
```

Create `.env.local` file in `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

5. **Run the Application**

Terminal 1 - Backend:
```bash
cd backend
uvicorn main:app --reload
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 📸 Screenshots

*Screenshots will be added after development*

## 🏗️ Project Structure

```
Mindful-AI/
├── frontend/          # Next.js application
│   ├── app/          # App router pages
│   ├── components/   # React components
│   └── lib/          # Utilities
├── backend/          # FastAPI application
│   ├── routes/       # API endpoints
│   ├── services/     # Business logic
│   └── models/       # Database models
└── README.md
```

## 🎥 Demo Video

*Demo video link will be added*

## 👥 Team

- **Harsh Kumar** - Full Stack Developer

## 🔮 Future Enhancements

- 🌍 Multi-language support
- 📱 Mobile app (React Native)
- 🤝 Peer support community
- 🎯 Therapist matching system
- 📈 Advanced analytics dashboard
- 🔔 Smart notifications and reminders

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Mental health resources from NIMH and WHO
- Open source community

---

**Built with ❤️ for Hackathon 2024**

*If you or someone you know is in crisis, please contact:*
- **National Suicide Prevention Lifeline**: 1-800-273-8255
- **Crisis Text Line**: Text HOME to 741741
