import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Icon, Card, Button } from "semantic-ui-react";

import { Patient, NewEntry, EntryType, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails, addEntry } from "../state";
import { toPatient } from "../utils";

import AddEntryModal from "../AddEntryModal";
import EntryDetails from "./EntryDetails";

const genderIconProps = {
  male: { name: "mars" as const, color: "blue" as const },
  female: { name: "venus" as const, color: "pink" as const },
  other: { name: "genderless" as const, color: "grey" as const }
};

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);

  React.useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        const information = toPatient({ ...patientFromApi });
        dispatch(setPatientDetails( information ));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
      void getPatientDetails();
    }
  }, [patient, id, dispatch]);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!patient) {
    return null;
  }

  const submitNewEntry = async (values: NewEntry) => {
    const body = { ...values };

    if (body.type === EntryType.OccupationalHealthCare) {
      if (!body.sickLeave?.endDate && !body.sickLeave?.startDate) {
        body.sickLeave = undefined;
      }
    }

    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        body
      );

      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error(e?.response?.data);
      setError("Oops! Something went wrong!");
    }
  };

  return (
    <Container>
      <h1>
        {patient.name} <Icon {...genderIconProps[patient.gender]} />
      </h1>

      <p>
        <strong>SSN:</strong> {patient.ssn}
      </p>

      <p>
        <strong>Date of Birth:</strong> {patient.dateOfBirth}
      </p>

      <p>
        <strong>Occupation:</strong> {patient.occupation}
      </p>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={openModal}>Add New Entry</Button>

      {patient.entries.length > 0 && <h2>Entries</h2>}

      <Card.Group>
        {patient.entries.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </Card.Group>
    </Container>
  );
};

export default PatientDetailPage;
