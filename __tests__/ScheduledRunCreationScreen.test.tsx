import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { ScheduledRunCreationScreen } from '../src/ui/screens/ScheduledRunCreationScreen';
import { ScheduledRun } from '../src/domain/models/ScheduledRun';
import { RunStep } from '../src/domain/models/RunStep';
import { RunStepType } from '../src/domain/models/RunStepType';
import { ScheduledRunRepository } from '../src/domain/ports/ScheduledRunRepository';

class InMemoryTestRepo implements ScheduledRunRepository {
  private stored: ScheduledRun[] = [];

  async save(run: ScheduledRun): Promise<void> {
    this.stored.push(run);
  }

  async getAll(): Promise<ScheduledRun[]> {
    return this.stored;
  }

  getSavedRuns() {
    return this.stored;
  }
}

describe('ScheduledRunCreationScreen', () => {
  it('should create a new scheduled run and call the repository', async () => {
    const repo = new InMemoryTestRepo();
    const onCreated = jest.fn();

    render(<ScheduledRunCreationScreen repository={repo} onCreated={onCreated} />);

    fireEvent.changeText(screen.getByPlaceholderText('Titre de la séance'), 'Test Run');
    fireEvent.changeText(screen.getByPlaceholderText('Durée (en minutes)'), '10');
    fireEvent.changeText(screen.getByPlaceholderText('Allure cible (min/km)'), '7:30');
    fireEvent.press(screen.getByText('Ajouter étape'));
    fireEvent.press(screen.getByText('Valider'));

    await waitFor(() => {
      const runs = repo.getSavedRuns();
      expect(runs.length).toBe(1);
      expect(runs[0].title).toBe('Test Run');
      expect(runs[0].steps[0]).toBeInstanceOf(RunStep);
      expect(runs[0].steps[0].type).toBe(RunStepType.Time);
      expect(runs[0].steps[0].target.targetPace).toBe('7:30');
      expect(onCreated).toHaveBeenCalled();
    });
  });

  it('should allow adding multiple steps to the scheduled run', async () => {
    const repo = new InMemoryTestRepo();
    const onCreated = jest.fn();

    render(<ScheduledRunCreationScreen repository={repo} onCreated={onCreated} />);

    fireEvent.changeText(screen.getByPlaceholderText('Titre de la séance'), 'Multi Step');

    // Étape 1
    fireEvent.changeText(screen.getByPlaceholderText('Durée (en minutes)'), '10');
    fireEvent.changeText(screen.getByPlaceholderText('Allure cible (min/km)'), '7:30');
    fireEvent.press(screen.getByText('Ajouter étape'));

    // Étape 2
    fireEvent.changeText(screen.getByPlaceholderText('Distance (en mètres)'), '1000');
    fireEvent.changeText(screen.getByPlaceholderText('Allure cible (min/km)'), '6:15');
    fireEvent.press(screen.getByText('Ajouter étape'));

    fireEvent.press(screen.getByText('Ajouter étape'));
    fireEvent.press(screen.getByText('Valider'));

    await waitFor(() => {
      const runs = repo.getSavedRuns();
      expect(runs.length).toBe(1);
      expect(runs[0].steps.length).toBe(2);
      expect(runs[0].steps[0].type).toBe(RunStepType.Time);
      expect(runs[0].steps[1].type).toBe(RunStepType.Distance);
      expect(runs[0].steps[1].value).toBe(1000);
      expect(runs[0].steps[1].target.targetPace).toBe('6:15');
    });
  });
});
