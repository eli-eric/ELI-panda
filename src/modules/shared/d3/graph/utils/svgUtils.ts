import type { Selection, ZoomBehavior } from 'd3'
import { zoom } from 'd3'

export function setupSVGDefinitions(
  svg: Selection<SVGSVGElement, unknown, null, undefined>,
  circleRadius: number
) {
  // Remove existing definitions
  svg.select('defs').remove()
  const defs = svg.append('defs')

  // Define arrow markers
  defs
    .append('marker')
    .attr('id', 'arrowhead')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 17)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0,-5 L 10,0 L 0,5')
    .attr('fill', '#ccc')

  defs
    .append('marker')
    .attr('id', 'arrowhead-highlight')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', circleRadius + 7)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0,-5 L 10,0 L 0,5')
    .attr('fill', 'orange')
}

export function initializeZoomBehavior(
  svg: Selection<SVGSVGElement, unknown, null, undefined>,
  zoomRef: React.MutableRefObject<ZoomBehavior<SVGSVGElement, unknown> | null>
) {
  const zoomHandler = zoom<SVGSVGElement, unknown>().on('zoom', event => {
    svg.select('g').attr('transform', event.transform)
  })
  svg.call(zoomHandler)
  zoomRef.current = zoomHandler
}

export function createOrSelectGroupElement(
  svg: Selection<SVGSVGElement, unknown, null, undefined>
) {
  let g = svg.select<SVGGElement>('g')
  if (g.empty()) {
    g = svg.append('g')
  }
  return g
}
