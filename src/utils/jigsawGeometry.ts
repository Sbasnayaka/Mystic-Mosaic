export type EdgeType = 'flat' | 'tab' | 'blank';

export interface PieceEdges {
  top: EdgeType;
  right: EdgeType;
  bottom: EdgeType;
  left: EdgeType;
}

/**
 * Draws the path for a single jigsaw piece.
 * This does NOT fill or stroke; it only creates the shape path.
 */
export function drawJigsawPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  edges: PieceEdges
) 
{
  // The size of the "bump" relative to the piece size
  const tabSize = Math.min(width, height) * 0.2;

  ctx.beginPath();
  ctx.moveTo(x, y);

  // Helper to draw one edge (Top, Right, Bottom, or Left)
  const drawEdge = (
    startX: number, startY: number,
    endX: number, endY: number,
    type: EdgeType,
    isHorizontal: boolean
  ) => {
    if (type === 'flat') {
      ctx.lineTo(endX, endY);
      return;
    }

    // Direction: 'tab' goes out, 'blank' goes in
    // For Top/Left, "out" is negative. For Bottom/Right, "out" is positive.
    // We'll handle this logic by passing the correct sign in the caller or calculating it.
    // Simplified: We assume the caller passes the correct "bulge" direction.
    
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    // Control points for the Bezier curve
    let cp1x, cp1y, cp2x, cp2y;

    if (isHorizontal) {
      // Top or Bottom edge
      // We need to bulge Up (negative Y) or Down (positive Y)
      const bulge = type === 'tab' ? -tabSize : tabSize; 
      // Note: This assumes 'tab' on top means bulging UP. 
      // We will refine this in the specific calls below.
      
      // Let's use a simpler "bump" logic that works for all sides
      const offset = type === 'tab' ? -tabSize : tabSize; // Default assumption
      
      // Actually, let's be precise.
      // Top edge (y=0): Tab = Up (-), Blank = Down (+)
      // Bottom edge (y=h): Tab = Down (+), Blank = Up (-)
      
      let finalOffset = offset;
      if (startY === y + height) finalOffset = -offset; // Bottom edge logic flip

      cp1x = startX + (endX - startX) * 0.3;
      cp1y = startY + finalOffset;
      cp2x = startX + (endX - startX) * 0.7;
      cp2y = startY + finalOffset;
    } else {
      // Left or Right edge
      const offset = type === 'tab' ? -tabSize : tabSize;
      let finalOffset = offset;
      if (startX === x + width) finalOffset = -offset; // Right edge logic flip

      cp1x = startX + finalOffset;
      cp1y = startY + (endY - startY) * 0.3;
      cp2x = startX + finalOffset;
      cp2y = startY + (endY - startY) * 0.7;
    }

    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
  };

  // 1. Top Edge
  drawEdge(x, y, x + width, y, edges.top, true);
  // 2. Right Edge
  drawEdge(x + width, y, x + width, y + height, edges.right, false);
  // 3. Bottom Edge
  drawEdge(x + width, y + height, x, y + height, edges.bottom, true);
  // 4. Left Edge
  drawEdge(x, y + height, x, y, edges.left, false);

  ctx.closePath();
}