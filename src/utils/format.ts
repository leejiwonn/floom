/**
 * 123 -> 02:03
 * @param {number} duration 초단위
 */
export function formatDuration(duration: number) {
  const minutes = String(Math.floor(duration / 60));
  const seconds = String(Math.floor(duration % 60));

  const formatTime = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;

  return formatTime;
}
