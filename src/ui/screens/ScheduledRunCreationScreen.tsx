import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
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
  const [duration, setDuration] = useState('');
  const [pace, setPace] = useState('');

  const handleSubmit = async () => {
    const step = new RunStep(RunStepType.Time, parseInt(duration) * 60, {
      targetPace: pace,
    });

    const run = new ScheduledRun(title, new Date(), [step]);
    await repository.save(run);
    onCreated();
  };

  return (
    <View>
      <TextInput placeholder="Titre de la séance" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Durée (en minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput placeholder="Allure cible (min/km)" value={pace} onChangeText={setPace} />
      <Button title="Valider" onPress={handleSubmit} />
    </View>
  );
};
