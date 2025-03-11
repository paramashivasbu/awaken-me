import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import AlarmItem from "./AlarmItem";
import { Alarm } from "../../types/alarm";

interface AlarmListProps {
  alarms: Alarm[];
  onToggleAlarm: (id: string, enabled: boolean) => void;
  onEditAlarm: (id: string) => void;
  onDeleteAlarm: (id: string) => void;
  onAddAlarm: () => void;
}

const AlarmList = ({
  alarms,
  onToggleAlarm,
  onEditAlarm,
  onDeleteAlarm,
  onAddAlarm,
}: AlarmListProps) => {
  const sortedAlarms = [...alarms].sort((a, b) => {
    // Convert time strings to comparable values
    const getTimeValue = (timeStr: string) => {
      const [time, period] = timeStr.split(" ");
      const [hourStr, minuteStr] = time.split(":");
      let hour = parseInt(hourStr);
      const minute = parseInt(minuteStr);

      if (period === "PM" && hour < 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      return hour * 60 + minute;
    };

    return getTimeValue(a.time) - getTimeValue(b.time);
  });

  return (
    <div className="w-full max-w-md mx-auto bg-background rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Your Alarms</h2>
        <Button onClick={onAddAlarm} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Alarm
        </Button>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3 pb-4">
          {sortedAlarms.length > 0 ? (
            sortedAlarms.map((alarm) => (
              <AlarmItem
                key={alarm.id}
                alarm={alarm}
                onToggle={onToggleAlarm}
                onEdit={onEditAlarm}
                onDelete={onDeleteAlarm}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No alarms set. Click "Add Alarm" to create your first alarm.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlarmList;
