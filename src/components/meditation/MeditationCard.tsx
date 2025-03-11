import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Clock, Play } from "lucide-react";
import { cn } from "../../lib/utils";
import { Meditation } from "../../types/meditation";

interface MeditationCardProps {
  meditation: Meditation;
  onSelect?: () => void;
  onPreview?: () => void;
  isSelected?: boolean;
}

const MeditationCard = ({
  meditation,
  onSelect,
  onPreview,
  isSelected = false,
}: MeditationCardProps) => {
  return (
    <Card
      className={cn(
        "w-full transition-all duration-200",
        isSelected ? "border-primary border-2" : "border-border",
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{meditation.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{meditation.duration} min</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {meditation.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreview}
          className="flex items-center gap-1"
        >
          <Play className="h-4 w-4" />
          Preview
        </Button>
        <Button
          variant={isSelected ? "default" : "secondary"}
          size="sm"
          onClick={onSelect}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MeditationCard;
