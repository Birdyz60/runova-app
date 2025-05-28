import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { GuidedRunScreen } from '../src/ui/screens/GuidedRunScreen';
import { ScheduledRun } from '../src/domain/models/ScheduledRun';
import { RunStep } from '../src/domain/models/RunStep';
import { RunStepType } from '../src/domain/models/RunStepType';

describe('GuidedRunScreen', () => {
  it('should display the next step and start button', () => {
    const steps = [
      new RunStep(RunStepType.Time, 600, { targetPace: '7:45' }),
      new RunStep(RunStepType.Distance, 1000, { targetPace: '6:30' }),
    ];
    const run = new ScheduledRun('Test Run', new Date(), steps);

    render(<GuidedRunScreen run={run} />);

    expect(screen.getByText('Étape 1')).toBeTruthy();
    expect(screen.getByText('Durée : 10 min')).toBeTruthy();
    expect(screen.getByText('Allure cible : 7:45/km')).toBeTruthy();
    expect(screen.getByText('Démarrer')).toBeTruthy();

    fireEvent.press(screen.getByText('Démarrer'));

    expect(screen.queryByText('Démarrer')).toBeNull();
  });
});
