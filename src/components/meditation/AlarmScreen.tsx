import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import MeditationProgress from "./MeditationProgress";
import { Alarm } from "../../types/alarm";

interface AlarmScreenProps {
  alarm: Alarm;
  onDismiss: () => void;
}

const AlarmScreen = ({ alarm, onDismiss }: AlarmScreenProps) => {
  const [meditationComplete, setMeditationComplete] = useState(false);

  const handleMeditationComplete = () => {
    setMeditationComplete(true);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg border-primary/20 border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{alarm.time}</CardTitle>
          <p className="text-lg font-medium mt-2">{alarm.meditation.title}</p>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground text-center mb-6">
            Complete the meditation to dismiss the alarm
          </p>

          <MeditationProgress
            duration={alarm.meditation.duration}
            onComplete={handleMeditationComplete}
            autoStart={true}
          />
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={onDismiss}
            disabled={!meditationComplete}
            className="w-full"
            size="lg"
          >
            {meditationComplete
              ? "Dismiss Alarm"
              : "Complete Meditation to Dismiss"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AlarmScreen;
