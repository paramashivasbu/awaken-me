import { Meditation } from "../types/meditation";
import { v4 as uuidv4 } from "../lib/uuid";

export const MEDITATIONS: Meditation[] = [
  {
    id: uuidv4(),
    title: "Morning Mindfulness",
    description:
      "Start your day with clarity and purpose through this gentle morning meditation.",
    duration: 5,
    category: "mindfulness",
  },
  {
    id: uuidv4(),
    title: "Deep Relaxation",
    description:
      "Release tension and find deep relaxation with this soothing guided practice.",
    duration: 10,
    category: "relaxation",
  },
  {
    id: uuidv4(),
    title: "Breath Awareness",
    description:
      "Focus on your breath to anchor yourself in the present moment.",
    duration: 5,
    category: "mindfulness",
  },
  {
    id: uuidv4(),
    title: "Body Scan",
    description:
      "Systematically release tension throughout your body with this calming practice.",
    duration: 15,
    category: "relaxation",
  },
  {
    id: uuidv4(),
    title: "Loving-Kindness",
    description:
      "Cultivate compassion for yourself and others with this heart-centered meditation.",
    duration: 10,
    category: "compassion",
  },
  {
    id: uuidv4(),
    title: "Gratitude Practice",
    description:
      "Develop an attitude of gratitude to enhance your wellbeing and happiness.",
    duration: 5,
    category: "gratitude",
  },
  {
    id: uuidv4(),
    title: "Sleep Preparation",
    description:
      "Prepare your mind and body for restful sleep with this calming meditation.",
    duration: 15,
    category: "sleep",
  },
  {
    id: uuidv4(),
    title: "Stress Relief",
    description:
      "Release stress and find your center with this grounding practice.",
    duration: 10,
    category: "stress",
  },
  {
    id: uuidv4(),
    title: "Focus Enhancement",
    description:
      "Sharpen your concentration and mental clarity with this focused attention practice.",
    duration: 5,
    category: "focus",
  },
  {
    id: uuidv4(),
    title: "Energy Boost",
    description:
      "Revitalize your energy and motivation with this uplifting meditation.",
    duration: 5,
    category: "energy",
  },
  {
    id: uuidv4(),
    title: "Deep Sleep",
    description:
      "Drift into deep, restorative sleep with this soothing bedtime meditation.",
    duration: 15,
    category: "sleep",
  },
  {
    id: uuidv4(),
    title: "Anxiety Relief",
    description:
      "Calm anxious thoughts and find peace with this gentle meditation.",
    duration: 10,
    category: "stress",
  },
];
