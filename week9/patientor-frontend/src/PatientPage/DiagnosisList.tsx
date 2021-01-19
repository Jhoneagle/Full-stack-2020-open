/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import { uid } from "react-uid";

import { useStateValue } from "../state";
import { Diagnosis } from "../types";
import { List } from "semantic-ui-react";

interface DiagnosisListProps {
  diagnosisCodes: Array<Diagnosis["code"]>;
}

const DiagnosisList: React.FC<DiagnosisListProps> = ({ diagnosisCodes }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <List>
      <List.Item>
        <List.Header>
          {diagnosisCodes.length > 1 ? "Diagnoses" : "Diagnosis"}
        </List.Header>
      </List.Item>

      {diagnosisCodes.map((code) => (
        <List.Item key={uid({})}>
          <List.Content>
            <List.Description>
              <strong>{code} - </strong>
              {diagnoses[code] && diagnoses[code].name}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default DiagnosisList;