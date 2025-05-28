import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ScheduledRun } from '../../domain/models/ScheduledRun';

type Props = {
  run: ScheduledRun;
};

export const GuidedRunScreen: React.FC<Props> = ({ run }) => {
  const [started, setStarted] = useState(false);
  const step = run.steps[0];

  return (
    <View>
      <Text>Étape 1</Text>
      <Text>Durée : {step.value / 60} min</Text>
      <Text>{`Allure cible : ${String(step.target.targetPace)}/km`}</Text>
      {!started && <Button title="Démarrer" onPress={() => setStarted(true)} />}
    </View>
  );
};
