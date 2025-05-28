import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ScheduledRun } from '../../domain/models/ScheduledRun';
import { ScheduledRunRepository } from '../../domain/ports/ScheduledRunRepository';

type Props = {
  repository: ScheduledRunRepository;
};

export const ScheduledRunListScreen: React.FC<Props> = ({ repository }) => {
  const [runs, setRuns] = useState<ScheduledRun[]>([]);

  useEffect(() => {
    repository.getAll().then((all) => {
      const sorted = [...all].sort((a, b) => a.date.getTime() - b.date.getTime());
      setRuns(sorted);
    });
  }, [repository]);

  return (
    <ScrollView>
      {runs.map((run, idx) => (
        <View key={idx}>
          <Text testID="scheduled-run-title">{run.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
