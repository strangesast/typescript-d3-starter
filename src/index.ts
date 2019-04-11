import {select, Selection} from 'd3';

const rootElement = select(document.body).append('svg')
  .attr('width', '100%')
  .attr('height', '100%');

let currentMonthSel;

let {width, height} = (rootElement.node() as SVGElement).getBoundingClientRect();

function changeMonth(day: Date) {
  const [w, h] = [width / 7, height / 5];
  const p = Math.min(w, h) / 20;
  const days = daysOfMonth(day);
  const first = days[0];
  const newMonthSel = rootElement.selectAll('.day').data(days, ({date}) => date);
  newMonthSel.exit().remove();
  const group = newMonthSel.enter().append('g').classed('day', true);
  
  currentMonthSel = group.merge(newMonthSel).attr('transform', ({date, row, col}) => `translate(${col * w},${row * h})`);

  group.append('rect')
    .attr('width', w)
    .attr('height', h)
    .attr('stroke', 'black')
    .attr('fill', 'white');

  group.append('text')
    .attr('x', w / 20)
    .attr('y', w / 20)
    .attr('text-align', 'right')
    .attr('alignment-baseline', 'hanging')
    .text(d => d.date.getDate());
}

function resize() {
  ({width, height} = (rootElement.node() as SVGElement).getBoundingClientRect());
  console.log('here', width, height);
  const [w, h] = [width / 7, height / 5];
  const p = Math.min(w, h) / 20;

  let sel = currentMonthSel.attr('transform', ({date, row, col}) => `translate(${col * w},${row * h})`)

  sel.select('rect').attr('width', w).attr('height', h);
  sel.select('text').attr('x', p).attr('y', p);
}

let next;
function debounce() {
  clearTimeout(next);
  next = setTimeout(() => resize(), 100);
}
window.addEventListener('resize', debounce);

function daysOfMonth(day: Date) {
  const [year, month] = [day.getFullYear(), day.getMonth()];
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = [];
  for (
    let d = new Date(year, month, 1-first.getDay()), row = -1, col;
    col = d.getDay(), row += col == 0 ? 1 : 0, d <= last || col > 0;
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
  ) {
    days.push({date: d, row, col});
  }

  return days;
}

changeMonth(new Date());
