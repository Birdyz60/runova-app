import { RepeatBlock } from './RepeatBlock';
import { RunStep } from './RunStep';

export class ScheduledRun {
  constructor(
    public title: string,
    public date: Date,
    public steps: (RunStep | RepeatBlock)[],
  ) {}
}
