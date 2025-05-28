import { ScheduledRun } from '../../domain/models/ScheduledRun';
import { ScheduledRunRepository } from '../../domain/ports/ScheduledRunRepository';

export class ScheduleRunPlanner {
  constructor(private readonly repository: ScheduledRunRepository) {}

  async schedule(run: ScheduledRun): Promise<void> {
    await this.repository.save(run);
  }
}
