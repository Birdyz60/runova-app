import { ScheduledRun } from '../models/ScheduledRun';

export interface ScheduledRunRepository {
  save(run: ScheduledRun): Promise<void>;
  getAll(): Promise<ScheduledRun[]>;
}
