import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Network, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface VoiceAISimulatorProps {
  textToSpeak: string;
  onHighlightNode?: (nodeLabel: string) => void;
}

export const VoiceAISimulator: React.FC<VoiceAISimulatorProps> = ({ textToSpeak, onHighlightNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveHeights, setWaveHeights] = useState<number[]>([40, 70, 30, 90, 50, 80, 40, 60]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * 70) + 20));
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (onHighlightNode) {
        onHighlightNode('HDRS');
      }

      // Web Speech Synthesis if supported
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setIsPlaying(false), 5000);
      }
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30">
      <button
        onClick={handleTogglePlay}
        className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
          isPlaying
            ? 'bg-purple-500 text-white shadow-glow-purple scale-105'
            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30'
        }`}
      >
        {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        <span>{isPlaying ? 'Pause Narration' : '🎙 Listen to Voice AI'}</span>
      </button>

      {/* Animated Sound Waveforms */}
      {isPlaying && (
        <div className="flex items-center gap-1 h-6 px-2">
          {waveHeights.map((h, idx) => (
            <div
              key={idx}
              className="w-1 bg-purple-400 rounded-full transition-all duration-150"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
