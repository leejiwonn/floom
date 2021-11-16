export function delay(milliSeconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, milliSeconds);
  });
}
