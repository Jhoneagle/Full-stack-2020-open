import { Router } from "express";
import patientService from "../services/patientService";
import { toNewPatient, toNewEntry } from "../utils";

const router = Router();

router.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e?.message);
  }
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);

      if (patient && newEntry) {
        const updatedPatient = patientService.addEntry(patient, newEntry);
        res.json(updatedPatient);
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      res.status(400).send({ error: e?.message });
    }
  } else {
    res.status(404).send({ error: "This patient does not exist" });
  }
});

export default router;