import { RepeatBlock } from '../src/domain/models/RepeatBlock';
import { RunStep } from '../src/domain/models/RunStep';
import { RunStepType } from '../src/domain/models/RunStepType';
import { ScheduledRun } from '../src/domain/models/ScheduledRun';

describe('ScheduledRun', () => {
  it('should build a complex scheduled run with steps and a repeat block', () => {
    const warmup = new RunStep(RunStepType.Time, 15 * 60, { targetPace: '7:45' }); // 15 minutes
    const interval1 = new RunStep(RunStepType.Distance, 1000, { targetPace: '6:30' }); // 1km
    const interval2 = new RunStep(RunStepType.Time, 60, { targetPace: '8:00' }); // 1min

    const repeatBlock = new RepeatBlock(3, [interval1, interval2]);

    const cooldown = new RunStep(RunStepType.Time, 10 * 60, { targetPace: '7:45' }); // 10 minutes

    const run = new ScheduledRun('Séance du 1er juin', new Date('2025-06-01'), [
      warmup,
      repeatBlock,
      cooldown,
    ]);

    expect(run.title).toBe('Séance du 1er juin');
    expect(run.date.toISOString()).toBe(new Date('2025-06-01').toISOString());
    expect(run.steps.length).toBe(3);
    expect(run.steps[1]).toBeInstanceOf(RepeatBlock);
    expect((run.steps[1] as RepeatBlock).repeatCount).toBe(3);
    expect((run.steps[1] as RepeatBlock).steps[0].target.targetPace).toBe('6:30');
  });
});
