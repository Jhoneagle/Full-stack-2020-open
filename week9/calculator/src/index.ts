import express from "express";
const app = express();

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: "parameters missing!" });
  }

  const heightValue = Number(height);
  const weightValue = Number(weight);

  if (isNaN(heightValue) || isNaN(weightValue)) {
    return res.status(400).json({ error: "malformatted parameters!" });
  }

  const bmi = calculateBmi(heightValue, weightValue);

  return res.json({ weightValue, heightValue, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises }: any = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({ error: "parameters missing!" });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters!" });
  }

  const hasNaNInDailyHours = daily_exercises.some((hours) => isNaN(hours));
  const targetHour = Number(target);

  if (isNaN(targetHour) || hasNaNInDailyHours) {
    return res.status(400).json({ error: "malformatted parameters!" });
  }

  return res.json(calculateExercises(daily_exercises, targetHour));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});