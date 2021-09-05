export function getThrottledFunction(func: (...args: any[]) => void, interval: number): (...args: any[]) => void {
  let lastCall = performance.now();
  return (...args: any[]) => {
    const now = performance.now();
    if (lastCall + interval > now) return;

    lastCall = now;
    func(...args);
  };
}