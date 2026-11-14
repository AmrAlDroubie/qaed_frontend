import type { AttendanceMeeting } from '../data/attendance'

function escapeText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,')
}
// Fold at 75 UTF-8 octets without splitting Arabic characters.
function foldLine(line: string) {
  const encoder = new TextEncoder()
  const lines: string[] = []
  let current = ''
  let length = 0
  for (const character of line) {
    const size = encoder.encode(character).length
    if (length + size > 75) { lines.push(current); current = ' '; length = 1 }
    current += character
    length += size
  }
  lines.push(current)
  return lines.join('\r\n')
}
export function downloadMeetingCalendar(meetings: AttendanceMeeting[]) {
  if (!meetings.length) return
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Qaed//Meetings//AR', 'CALSCALE:GREGORIAN']
  for (const meeting of meetings) {
    const date = meeting.date.replace(/-/g, '')
    lines.push('BEGIN:VEVENT', `UID:${meeting.id}@qaed.local`, `DTSTAMP:${stamp}`, `DTSTART:${date}T${meeting.arrival.replace(':', '')}00`)
    if (meeting.departure) lines.push(`DTEND:${date}T${meeting.departure.replace(':', '')}00`)
    lines.push(`SUMMARY:${escapeText(meeting.title)}`, 'END:VEVENT')
  }
  lines.push('END:VCALENDAR')
  const url = URL.createObjectURL(new Blob([lines.map(foldLine).join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = meetings.length === 1 ? `qaed-${meetings[0]!.id}.ics` : 'qaed-meetings.ics'
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
