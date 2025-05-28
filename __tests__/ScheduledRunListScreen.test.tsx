import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import { ScheduledRunListScreen } from '../src/ui/screens/ScheduledRunListScreen';
import { ScheduledRun } from '../src/domain/models/ScheduledRun';
import { RunStep } from '../src/domain/models/RunStep';
import { RunStepType } from '../src/domain/models/RunStepType';
import { ScheduledRunRepository } from '../src/domain/ports/ScheduledRunRepository';

class FakeScheduledRunRepository implements ScheduledRunRepository {
  constructor(private runs: ScheduledRun[]) {}

  async getAll(): Promise<ScheduledRun[]> {
    return this.runs;
  }

  async save(): Promise<void> {}
}

describe('ScheduledRunListScreen', () => {
  it('should display scheduled runs sorted by date', async () => {
    const steps = [new RunStep(RunStepType.Time, 600, { targetPace: '7:45' })];
    const repo = new FakeScheduledRunRepository([
      new ScheduledRun('Séance B', new Date('2025-06-10'), steps),
      new ScheduledRun('Séance A', new Date('2025-06-01'), steps),
    ]);

    render(<ScheduledRunListScreen repository={repo} />);

    await waitFor(() => {
      const items = screen.getAllByTestId('scheduled-run-title');
      expect(items.length).toBe(2);
      expect(items[0].props.children).toBe('Séance A');
      expect(items[1].props.children).toBe('Séance B');
    });
  });
});
