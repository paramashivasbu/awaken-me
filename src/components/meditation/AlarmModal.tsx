import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TimePicker from "./TimePicker";
import MeditationLibrary from "./MeditationLibrary";
import VolumeSettings from "./VolumeSettings";
import { Alarm } from "../../types/alarm";
import { Meditation } from "../../types/meditation";
import { v4 as uuidv4 } from "../../lib/uuid";

interface AlarmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (alarm: Alarm) => void;
  editingAlarm?: Alarm | null;
}

const AlarmModal = ({
  open,
  onOpenChange,
  onSave,
  editingAlarm = null,
}: AlarmModalProps) => {
  const [activeTab, setActiveTab] = useState("time");
  const [hour, setHour] = useState(
    editingAlarm ? parseInt(editingAlarm.time.split(":")[0]) : 8,
  );
  const [minute, setMinute] = useState(
    editingAlarm ? parseInt(editingAlarm.time.split(":")[1].split(" ")[0]) : 0,
  );
  const [period, setPeriod] = useState<"AM" | "PM">(
    editingAlarm ? (editingAlarm.time.includes("PM") ? "PM" : "AM") : "AM",
  );
  const [selectedMeditation, setSelectedMeditation] =
    useState<Meditation | null>(editingAlarm ? editingAlarm.meditation : null);
  const [initialVolume, setInitialVolume] = useState(
    editingAlarm ? editingAlarm.initialVolume : 30,
  );
  const [maxVolume, setMaxVolume] = useState(
    editingAlarm ? editingAlarm.maxVolume : 80,
  );
  const [gradualVolume, setGradualVolume] = useState(
    editingAlarm ? editingAlarm.gradualVolume : true,
  );

  const handleTimeChange = (
    newHour: number,
    newMinute: number,
    newPeriod: "AM" | "PM",
  ) => {
    setHour(newHour);
    setMinute(newMinute);
    setPeriod(newPeriod);
  };

  const handleMeditationSelect = (meditation: Meditation) => {
    setSelectedMeditation(meditation);
  };

  const handleSave = () => {
    if (!selectedMeditation) {
      setActiveTab("meditation");
      return;
    }

    const formattedTime = `${hour}:${minute.toString().padStart(2, "0")} ${period}`;

    const alarm: Alarm = {
      id: editingAlarm ? editingAlarm.id : uuidv4(),
      time: formattedTime,
      enabled: editingAlarm ? editingAlarm.enabled : true,
      meditation: selectedMeditation,
      initialVolume,
      maxVolume,
      gradualVolume,
    };

    onSave(alarm);
    onOpenChange(false);
  };

  const canProceedToNext = () => {
    if (activeTab === "time") return true;
    if (activeTab === "meditation") return selectedMeditation !== null;
    return true;
  };

  const handleNext = () => {
    if (activeTab === "time") setActiveTab("meditation");
    else if (activeTab === "meditation") setActiveTab("volume");
    else if (activeTab === "volume") handleSave();
  };

  const handleBack = () => {
    if (activeTab === "meditation") setActiveTab("time");
    else if (activeTab === "volume") setActiveTab("meditation");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingAlarm ? "Edit Alarm" : "Create New Alarm"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="time">Time</TabsTrigger>
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
          </TabsList>

          <TabsContent value="time" className="py-4">
            <div className="flex justify-center">
              <TimePicker
                onTimeChange={handleTimeChange}
                initialHour={hour}
                initialMinute={minute}
                initialPeriod={period}
              />
            </div>
          </TabsContent>

          <TabsContent value="meditation">
            <MeditationLibrary
              onSelectMeditation={handleMeditationSelect}
              selectedMeditationId={selectedMeditation?.id}
            />
          </TabsContent>

          <TabsContent value="volume">
            <VolumeSettings
              initialVolume={initialVolume}
              maxVolume={maxVolume}
              gradualIncrease={gradualVolume}
              onVolumeChange={setInitialVolume}
              onMaxVolumeChange={setMaxVolume}
              onGradualIncreaseChange={setGradualVolume}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          {activeTab !== "time" && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <div className="flex-1"></div>
          <Button onClick={handleNext} disabled={!canProceedToNext()}>
            {activeTab === "volume" ? "Save" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlarmModal;
