import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface TimePickerProps {
  onTimeChange: (hour: number, minute: number, period: "AM" | "PM") => void;
  initialHour?: number;
  initialMinute?: number;
  initialPeriod?: "AM" | "PM";
}

const TimePicker = ({
  onTimeChange,
  initialHour = 8,
  initialMinute = 0,
  initialPeriod = "AM",
}: TimePickerProps) => {
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [period, setPeriod] = useState<"AM" | "PM">(initialPeriod);

  const handleHourChange = (newHour: number) => {
    const validHour = newHour < 1 ? 12 : newHour > 12 ? 1 : newHour;
    setHour(validHour);
    onTimeChange(validHour, minute, period);
  };

  const handleMinuteChange = (newMinute: number) => {
    const validMinute = newMinute < 0 ? 55 : newMinute > 59 ? 0 : newMinute;
    setMinute(validMinute);
    onTimeChange(hour, validMinute, period);
  };

  const togglePeriod = () => {
    const newPeriod = period === "AM" ? "PM" : "AM";
    setPeriod(newPeriod);
    onTimeChange(hour, minute, newPeriod);
  };

  return (
    <div className="flex items-center justify-center gap-2 p-4 bg-card rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleHourChange(hour + 1)}
          className="rounded-full"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
        <div className="text-4xl font-bold w-16 text-center">
          {hour.toString().padStart(2, "0")}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleHourChange(hour - 1)}
          className="rounded-full"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>

      <div className="text-4xl font-bold">:</div>

      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleMinuteChange(minute + 5)}
          className="rounded-full"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
        <div className="text-4xl font-bold w-16 text-center">
          {minute.toString().padStart(2, "0")}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleMinuteChange(minute - 5)}
          className="rounded-full"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>

      <Button
        variant="outline"
        className={cn(
          "ml-2 px-4 py-2 text-lg font-semibold",
          "transition-colors duration-200",
        )}
        onClick={togglePeriod}
      >
        {period}
      </Button>
    </div>
  );
};

export default TimePicker;
