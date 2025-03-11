import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Pause, Play } from "lucide-react";

interface MeditationProgressProps {
  duration: number; // in minutes
  onComplete: () => void;
  autoStart?: boolean;
}

const MeditationProgress = ({
  duration,
  onComplete,
  autoStart = true,
}: MeditationProgressProps) => {
  const totalSeconds = duration * 60;
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);

  const progress = Math.min((secondsElapsed / totalSeconds) * 100, 100);
  const remainingSeconds = totalSeconds - secondsElapsed;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: number | null = null;

    if (isPlaying && secondsElapsed < totalSeconds) {
      interval = window.setInterval(() => {
        setSecondsElapsed((prev) => {
          const next = prev + 1;
          if (next >= totalSeconds) {
            if (interval) clearInterval(interval);
            onComplete();
            return totalSeconds;
          }
          return next;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, secondsElapsed, totalSeconds, onComplete]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-card rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-2">Meditation in Progress</h3>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Elapsed: {formatTime(secondsElapsed)}</span>
          <span>Remaining: {formatTime(remainingSeconds)}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MeditationProgress;
