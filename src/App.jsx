import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import WhatIsAI from './pages/WhatIsAI.jsx';
import VoiceAssistant from './pages/VoiceAssistant.jsx';
import Chat from './pages/Chat.jsx';
import HealthTips from './pages/HealthTips.jsx';
import NewsWeather from './pages/NewsWeather.jsx';
import './App.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/what-is-ai" element={<WhatIsAI />} />
        <Route path="/voice-assistant" element={<VoiceAssistant />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/health-tips" element={<HealthTips />} />
        <Route path="/news-weather" element={<NewsWeather />} />
      </Routes>
    </HashRouter>
  );
}
