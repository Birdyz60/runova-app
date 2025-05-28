import { ScheduledRun } from '../../domain/models/ScheduledRun';
import { ScheduledRunRepository } from '../../domain/ports/ScheduledRunRepository';

export class InMemoryScheduledRunRepository implements ScheduledRunRepository {
  private runs: ScheduledRun[] = [];

  async save(run: ScheduledRun): Promise<void> {
    this.runs.push(run);
  }

  async getAll(): Promise<ScheduledRun[]> {
    return this.runs;
  }
}
