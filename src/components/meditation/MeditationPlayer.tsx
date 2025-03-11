import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "../ui/slider";
import { Meditation } from "../../types/meditation";

interface MeditationPlayerProps {
  meditation: Meditation;
  onClose: () => void;
}

const MeditationPlayer = ({ meditation, onClose }: MeditationPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);

  const totalSeconds = meditation.duration * 60;
  const currentSeconds = Math.floor((progress * totalSeconds) / 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: number | null = null;

    if (isPlaying && progress < 100) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const next = prev + 100 / totalSeconds;
          return next > 100 ? 100 : next;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, progress, totalSeconds]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  const handleForward = () => {
    setProgress((prev) => Math.min(prev + 10, 100));
  };

  const handleBackward = () => {
    setProgress((prev) => Math.max(prev - 10, 0));
  };

  const handleProgressChange = (values: number[]) => {
    setProgress(values[0]);
  };

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0]);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{meditation.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentSeconds)}</span>
            <span>{formatTime(totalSeconds)}</span>
          </div>
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleProgressChange}
          />
        </div>

        <div className="flex justify-center items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBackward}>
            <SkipBack className="h-5 w-5" />
          </Button>

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

          <Button variant="ghost" size="icon" onClick={handleForward}>
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="flex-1"
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleRestart}>
          Restart
        </Button>
        <Button variant="default" onClick={onClose}>
          Close
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MeditationPlayer;
