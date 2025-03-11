import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Pencil, Trash2, Clock, Volume2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { Alarm } from "../../types/alarm";

interface AlarmItemProps {
  alarm: Alarm;
  onToggle: (id: string, enabled: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AlarmItem = ({ alarm, onToggle, onEdit, onDelete }: AlarmItemProps) => {
  const { id, time, enabled, meditation, gradualVolume } = alarm;

  return (
    <Card
      className={cn(
        "w-full transition-all duration-200",
        enabled ? "border-primary/50" : "border-muted opacity-80",
      )}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h3
              className={cn(
                "text-2xl font-semibold",
                !enabled && "text-muted-foreground",
              )}
            >
              {time}
            </h3>
            <span className="text-sm text-muted-foreground">
              {meditation.title}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{meditation.duration} min</span>
            </div>
            {gradualVolume && (
              <div className="flex items-center gap-1">
                <Volume2 className="h-3.5 w-3.5" />
                <span>Gradual</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={enabled}
            onCheckedChange={(checked) => onToggle(id, checked)}
          />

          <Button variant="ghost" size="icon" onClick={() => onEdit(id)}>
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlarmItem;
