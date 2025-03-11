import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Search } from "lucide-react";
import MeditationCard from "./MeditationCard";
import { Meditation } from "../../types/meditation";
import { MEDITATIONS } from "../../data/meditations";

interface MeditationLibraryProps {
  onSelectMeditation: (meditation: Meditation) => void;
  selectedMeditationId?: string;
}

const MeditationLibrary = ({
  onSelectMeditation,
  selectedMeditationId,
}: MeditationLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredMeditations = MEDITATIONS.filter((meditation) => {
    const matchesSearch =
      meditation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meditation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || meditation.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...Array.from(new Set(MEDITATIONS.map((m) => m.category))),
  ];

  const handlePreview = (meditation: Meditation) => {
    // In a real app, this would play a preview of the meditation
    console.log("Preview meditation:", meditation.title);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-background rounded-lg shadow-sm border p-4">
      <h2 className="text-2xl font-semibold mb-4">Meditation Library</h2>

      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search meditations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <Tabs
        defaultValue="all"
        value={activeCategory}
        onValueChange={setActiveCategory}
      >
        <TabsList className="w-full mb-4 overflow-x-auto flex-wrap">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <ScrollArea className="h-[400px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            {filteredMeditations.map((meditation) => (
              <MeditationCard
                key={meditation.id}
                meditation={meditation}
                isSelected={meditation.id === selectedMeditationId}
                onSelect={() => onSelectMeditation(meditation)}
                onPreview={() => handlePreview(meditation)}
              />
            ))}
          </div>

          {filteredMeditations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No meditations found. Try adjusting your search.
            </div>
          )}
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default MeditationLibrary;
