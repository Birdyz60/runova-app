import { ScheduledRun } from '../src/domain/models/ScheduledRun';
import { RunStep } from '../src/domain/models/RunStep';
import { RunStepType } from '../src/domain/models/RunStepType';
import { InMemoryScheduledRunRepository } from '../src/infrastructure/repositories/InMemoryScheduledRunRepository';
import { ScheduleRunPlanner } from '../src/application/usecases/ScheduleRunPlanner';

describe('ScheduleRunPlanner', () => {
  it('should create and store a scheduled run with steps', async () => {
    const repo = new InMemoryScheduledRunRepository();
    const planner = new ScheduleRunPlanner(repo);

    const steps = [
      new RunStep(RunStepType.Time, 15 * 60, { targetPace: '7:45' }),
      new RunStep(RunStepType.Distance, 2000, { targetPace: '7:00' }),
      new RunStep(RunStepType.Time, 10 * 60, { targetPace: '8:00' }),
    ];

    const run = new ScheduledRun('Sortie progressive', new Date('2025-06-02'), steps);

    await planner.schedule(run);

    const storedRuns = await repo.getAll();
    expect(storedRuns.length).toBe(1);
    expect(storedRuns[0].title).toBe('Sortie progressive');
    expect(storedRuns[0].steps.length).toBe(3);
  });
});
