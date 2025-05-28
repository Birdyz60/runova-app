import { PaceTarget } from './PaceTarget';
import { RunStepType } from './RunStepType';

export class RunStep {
  constructor(
    public readonly type: RunStepType,
    public readonly value: number,
    public readonly target: PaceTarget,
  ) {}
}
