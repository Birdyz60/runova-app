import { RunStep } from './RunStep';

export class RepeatBlock {
  constructor(
    public readonly repeatCount: number,
    public readonly steps: RunStep[],
  ) {}
}
