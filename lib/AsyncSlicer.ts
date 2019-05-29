export default class AsyncSlicer {
  static InterruptedError = new Error("AsyncSlicer: interrupted");

  // Timestamp of last slice
  private lastPause: number;

  // Size of minimum interval between pauses, in ms.
  // Null to disable pausing entirely.
  public ms: number | null;

  // If the process is running.
  private running: boolean;

  // Pass the number of ms between pauses.
  constructor(ms: number | null = 20) {
    this.ms = ms;
    this.running = true;
    this.lastPause = 0;
  }

  // Maybe pause until the next frame rendered.
  // Resolves with whether it did or not.
  async pause(): Promise<boolean> {
    if (!this.running) {
      throw AsyncSlicer.InterruptedError;
    }

    if (this.ms === null) {
      return false;
    }

    // Break on even increments, or on the first time around.
    const now = Date.now();
    if (this.lastPause + this.ms < now) {
      this.lastPause = now;

      // Using raf here because it's faster than InteractionManager, and doesn't block
      // the JS thread from yielding to the native runtime.
      return new Promise(resolve => requestAnimationFrame(() => resolve(true)));
    } else {
      return false;
    }
  }

  // Cancel the process. All further calls to pause() will
  // throw AsyncSlicer.InterruptedError.
  cancel() {
    this.running = false;
  }
}
