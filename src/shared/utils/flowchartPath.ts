export interface PathPoint {
  x: number;
  y: number;
}

export interface PathConfig {
  fromRect: DOMRect;
  toRect: DOMRect;
  containerRect: DOMRect;
  lineExtension?: number;
}

export function calculateFlowchartPath(config: PathConfig): string {
  const { fromRect, toRect, containerRect, lineExtension = 10 } = config;
  
  // Horizontal layout only for desktop
  const fromX = fromRect.right - containerRect.left;
  const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
  const toX = toRect.left - containerRect.left;
  const toY = toRect.top + toRect.height / 2 - containerRect.top;
  
  // Add horizontal line extensions
  const startX = fromX - lineExtension;
  const endX = toX + lineExtension;
  
  // Calculate control points for bezier curve
  const distance = toX - fromX;
  const controlOffset = distance * 0.4;
  
  // Path with horizontal line extensions
  return `M ${startX} ${fromY} L ${fromX} ${fromY} C ${fromX + controlOffset} ${fromY}, ${toX - controlOffset} ${toY}, ${toX} ${toY} L ${endX} ${toY}`;
}