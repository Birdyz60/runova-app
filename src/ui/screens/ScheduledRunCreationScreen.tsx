import React, { useState } from 'react';
import { TextInput, Button, Text, ScrollView } from 'react-native';
import { ScheduledRun } from '../../domain/models/ScheduledRun';
import { RunStep } from '../../domain/models/RunStep';
import { RunStepType } from '../../domain/models/RunStepType';
import { ScheduledRunRepository } from '../../domain/ports/ScheduledRunRepository';

type Props = {
  repository: ScheduledRunRepository;
  onCreated: () => void;
};

export const ScheduledRunCreationScreen: React.FC<Props> = ({ repository, onCreated }) => {
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState<RunStep[]>([]);

  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [pace, setPace] = useState('');

  const addStep = () => {
    if (duration) {
      setSteps([
        ...steps,
        new RunStep(RunStepType.Time, parseInt(duration, 10) * 60, { targetPace: pace }),
      ]);
      setDuration('');
    } else if (distance) {
      setSteps([
        ...steps,
        new RunStep(RunStepType.Distance, parseInt(distance, 10), { targetPace: pace }),
      ]);
      setDistance('');
    }
    setPace('');
  };

  const handleSubmit = async () => {
    const run = new ScheduledRun(title, new Date(), steps);
    await repository.save(run);
    onCreated();
  };

  return (
    <ScrollView>
      <TextInput placeholder="Titre de la séance" value={title} onChangeText={setTitle} />

      <TextInput
        placeholder="Durée (en minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <TextInput
        placeholder="Distance (en mètres)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />

      <TextInput placeholder="Allure cible (min/km)" value={pace} onChangeText={setPace} />

      <Button title="Ajouter étape" onPress={addStep} />

      {steps.map((step, i) => (
        <Text key={i}>
          {step.type} - {step.value} - {step.target.targetPace}
        </Text>
      ))}

      <Button title="Valider" onPress={handleSubmit} />
    </ScrollView>
  );
};
