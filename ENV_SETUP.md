# 🔧 Environment Setup Guide

## Backend Configuration

Create a `.env` file in the `backend/` directory:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# JWT Secret Key
SECRET_KEY=mindfulai_secret_key_change_in_production

# Database
DATABASE_URL=sqlite:///./mindfulai.db

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
```

### Getting OpenAI API Key:
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. Paste it in your `.env` file

**Note:** New users get $5 in free credits!

---

## Frontend Configuration

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Running the Application

### Start Backend:
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

Backend will run on: http://localhost:8000

### Start Frontend:
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: http://localhost:3000

---

## Troubleshooting

**Backend won't start?**
- Make sure Python 3.9+ is installed
- Check that all dependencies are installed
- Verify `.env` file exists

**Frontend won't start?**
- Make sure Node.js 18+ is installed
- Delete `node_modules` and run `npm install` again
- Check `.env.local` file exists

**API connection errors?**
- Make sure backend is running first
- Check that `NEXT_PUBLIC_API_URL` matches backend URL
- Verify CORS settings in `backend/main.py`
