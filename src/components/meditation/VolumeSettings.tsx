import React from "react";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Volume2, VolumeX } from "lucide-react";

interface VolumeSettingsProps {
  initialVolume: number;
  maxVolume: number;
  gradualIncrease: boolean;
  onVolumeChange: (value: number) => void;
  onMaxVolumeChange: (value: number) => void;
  onGradualIncreaseChange: (value: boolean) => void;
}

const VolumeSettings = ({
  initialVolume,
  maxVolume,
  gradualIncrease,
  onVolumeChange,
  onMaxVolumeChange,
  onGradualIncreaseChange,
}: VolumeSettingsProps) => {
  return (
    <div className="space-y-6 p-4 bg-card rounded-lg shadow-sm">
      <h3 className="text-lg font-medium">Volume Settings</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="initial-volume">Initial Volume</Label>
            <span className="text-sm text-muted-foreground">
              {initialVolume}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <Slider
              id="initial-volume"
              min={0}
              max={100}
              step={5}
              value={[initialVolume]}
              onValueChange={(values) => onVolumeChange(values[0])}
              className="flex-1"
            />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="gradual-increase"
              checked={gradualIncrease}
              onCheckedChange={onGradualIncreaseChange}
            />
            <Label htmlFor="gradual-increase">Gradual Volume Increase</Label>
          </div>
          <p className="text-sm text-muted-foreground pl-7">
            Volume will gradually increase from initial to maximum level
          </p>
        </div>

        {gradualIncrease && (
          <div className="space-y-2 pl-7">
            <div className="flex justify-between items-center">
              <Label htmlFor="max-volume">Maximum Volume</Label>
              <span className="text-sm text-muted-foreground">
                {maxVolume}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <VolumeX className="h-4 w-4 text-muted-foreground" />
              <Slider
                id="max-volume"
                min={initialVolume}
                max={100}
                step={5}
                value={[maxVolume]}
                onValueChange={(values) => onMaxVolumeChange(values[0])}
                className="flex-1"
              />
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolumeSettings;
