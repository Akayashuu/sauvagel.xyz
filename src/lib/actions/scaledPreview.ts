/**
 * Scales an embedded preview (iframe) so that a fixed virtual desktop viewport
 * (`virtualWidth`, default 1280px) is rendered at full desktop layout, then
 * shrunk to exactly fit the host element's width. The host should be
 * `position: relative; overflow: hidden` with a fixed height; the iframe inside
 * uses `transform: scale(var(--preview-scale))` and `transform-origin: top left`.
 *
 * Reliable across browsers (no CSS length-division), responsive via ResizeObserver.
 */
export function scaledPreview(node: HTMLElement, virtualWidth = 1280) {
  let vw = virtualWidth;

  const update = () => {
    const w = node.clientWidth;
    if (w > 0) node.style.setProperty('--preview-scale', String(w / vw));
  };

  update();

  const ro = new ResizeObserver(update);
  ro.observe(node);

  return {
    update(next: number) {
      vw = next ?? virtualWidth;
      update();
    },
    destroy() {
      ro.disconnect();
    },
  };
}
