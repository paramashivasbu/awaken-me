import React, { useState, useEffect } from "react";
import MobileInstructions from "../components/meditation/MobileInstructions";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Bell, Library, Clock } from "lucide-react";
import AlarmList from "../components/meditation/AlarmList";
import MeditationLibrary from "../components/meditation/MeditationLibrary";
import AlarmModal from "../components/meditation/AlarmModal";
import AlarmScreen from "../components/meditation/AlarmScreen";
import MeditationPlayer from "../components/meditation/MeditationPlayer";
import { Alarm } from "../types/alarm";
import { Meditation } from "../types/meditation";

const MeditationAlarmApp = () => {
  const [activeTab, setActiveTab] = useState("alarms");
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [editingAlarm, setEditingAlarm] = useState<Alarm | null>(null);
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null);
  const [previewMeditation, setPreviewMeditation] = useState<Meditation | null>(
    null,
  );
  const [showMobileInstructions, setShowMobileInstructions] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  // Check if app is running in standalone mode (installed on home screen)
  useEffect(() => {
    const isInStandaloneMode = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true
      );
    };

    setIsStandalone(isInStandaloneMode());

    // Show mobile instructions if on mobile and not installed
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && !isInStandaloneMode()) {
      // Wait a bit before showing instructions
      const timer = setTimeout(() => setShowMobileInstructions(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Load alarms from localStorage on initial render
  useEffect(() => {
    const savedAlarms = localStorage.getItem("meditation-alarms");
    if (savedAlarms) {
      try {
        setAlarms(JSON.parse(savedAlarms));
      } catch (error) {
        console.error("Failed to parse saved alarms:", error);
      }
    }
  }, []);

  // Save alarms to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("meditation-alarms", JSON.stringify(alarms));
  }, [alarms]);

  // For demo purposes: check if any alarm should be triggered
  useEffect(() => {
    // In a real app, this would be handled by a background service
    const checkAlarms = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const period = currentHour >= 12 ? "PM" : "AM";
      const hour12 = currentHour % 12 || 12;

      const currentTimeStr = `${hour12}:${currentMinute.toString().padStart(2, "0")} ${period}`;

      // For demo purposes, we'll trigger an alarm if it matches the current time
      // In a real app, this would be more precise
      const matchingAlarm = alarms.find(
        (alarm) => alarm.enabled && alarm.time === currentTimeStr,
      );

      if (matchingAlarm && !activeAlarm) {
        setActiveAlarm(matchingAlarm);
      }
    };

    const interval = setInterval(checkAlarms, 10000); // Check every 10 seconds for demo

    return () => clearInterval(interval);
  }, [alarms, activeAlarm]);

  const handleAddAlarm = () => {
    setEditingAlarm(null);
    setIsAlarmModalOpen(true);
  };

  const handleEditAlarm = (id: string) => {
    const alarm = alarms.find((a) => a.id === id);
    if (alarm) {
      setEditingAlarm(alarm);
      setIsAlarmModalOpen(true);
    }
  };

  const handleSaveAlarm = (alarm: Alarm) => {
    if (editingAlarm) {
      setAlarms(alarms.map((a) => (a.id === alarm.id ? alarm : a)));
    } else {
      setAlarms([...alarms, alarm]);
    }
    setEditingAlarm(null);
  };

  const handleToggleAlarm = (id: string, enabled: boolean) => {
    setAlarms(
      alarms.map((alarm) => (alarm.id === id ? { ...alarm, enabled } : alarm)),
    );
  };

  const handleDeleteAlarm = (id: string) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  const handleDismissAlarm = () => {
    setActiveAlarm(null);
  };

  const handlePreviewMeditation = (meditation: Meditation) => {
    setPreviewMeditation(meditation);
  };

  const handleClosePreview = () => {
    setPreviewMeditation(null);
  };

  const handleCloseMobileInstructions = () => {
    setShowMobileInstructions(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Meditation Alarm</h1>
          <p className="text-muted-foreground">
            Wake up gently with guided meditations
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="alarms" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Alarms</span>
            </TabsTrigger>
            <TabsTrigger
              value="meditations"
              className="flex items-center gap-2"
            >
              <Library className="h-4 w-4" />
              <span>Meditations</span>
            </TabsTrigger>
            <TabsTrigger value="now" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Meditate Now</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alarms" className="space-y-4">
            <AlarmList
              alarms={alarms}
              onToggleAlarm={handleToggleAlarm}
              onEditAlarm={handleEditAlarm}
              onDeleteAlarm={handleDeleteAlarm}
              onAddAlarm={handleAddAlarm}
            />
          </TabsContent>

          <TabsContent value="meditations">
            <MeditationLibrary onSelectMeditation={handlePreviewMeditation} />
          </TabsContent>

          <TabsContent value="now" className="flex justify-center">
            {previewMeditation ? (
              <MeditationPlayer
                meditation={previewMeditation}
                onClose={handleClosePreview}
              />
            ) : (
              <div className="text-center py-12 max-w-md mx-auto">
                <h2 className="text-2xl font-semibold mb-4">
                  Ready to Meditate?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Select a meditation from the library to begin your practice
                  now.
                </p>
                <Button onClick={() => setActiveTab("meditations")}>
                  Browse Meditations
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AlarmModal
        open={isAlarmModalOpen}
        onOpenChange={setIsAlarmModalOpen}
        onSave={handleSaveAlarm}
        editingAlarm={editingAlarm}
      />

      {activeAlarm && (
        <AlarmScreen alarm={activeAlarm} onDismiss={handleDismissAlarm} />
      )}

      {showMobileInstructions && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <MobileInstructions onClose={handleCloseMobileInstructions} />
        </div>
      )}
    </div>
  );
};

export default MeditationAlarmApp;
