import {useState} from 'react'
import type {DateRange} from 'react-day-picker'
import {WuChip, WuDateRangePicker, WuHeading, type IWuDateRangePreset} from '@npm-questionpro/wick-ui-lib'

type IOnChange = (range: DateRange | undefined, preset: IWuDateRangePreset) => void

const today = new Date()
const daysAgo = (days: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() - days)

export function DateRangePage() {
  return (
    <>
      <section className="intro">
        <WuHeading size="md">Date range picker</WuHeading>
        <p className="sectionHint">The two calendars now pick one range together and move as a linked pair.</p>
        <ul className="checklist">
          <li>Click a start, then an end, in either calendar. A third click starts a new range.</li>
          <li>Hover to preview the range. While picking the end, days before the start are disabled.</li>
          <li>Each calendar moves on its own until it meets the other; one more step slides both.</li>
          <li>Pick a preset or Custom range, then Apply. The card shows the range and the preset it came from.</li>
          <li>Close without Apply: the picker goes back to the last applied range.</li>
        </ul>
      </section>

      <div className="scenarioGrid">
        <Scenario title="Pick a range" note="Nothing selected. Built-in presets and Custom range.">
          {onChange => <WuDateRangePicker Label="Date range" onChange={onChange} />}
        </Scenario>
        <Scenario title="With a starting value" note="Opens on the last 7 days.">
          {onChange => <ControlledPicker onChange={onChange} />}
        </Scenario>
        <Scenario title="Month, quarter and year" note="Switch the period in the header.">
          {onChange => (
            <WuDateRangePicker Label="Date range" period={['day', 'month', 'quarter', 'year']} onChange={onChange} />
          )}
        </Scenario>
      </div>
    </>
  )
}

function ControlledPicker({onChange}: {onChange: IOnChange}) {
  const [range, setRange] = useState<DateRange | undefined>({from: daysAgo(7), to: today})

  return (
    <WuDateRangePicker
      Label="Date range"
      value={range}
      onChange={(next, preset) => {
        setRange(next)
        onChange(next, preset)
      }}
      onReset={() => setRange(undefined)}
    />
  )
}

type IApplied = {range?: DateRange; preset: IWuDateRangePreset}

function Scenario({title, note, children}: {title: string; note: string; children: (onChange: IOnChange) => React.ReactNode}) {
  const [applied, setApplied] = useState<IApplied>()

  return (
    <article className="scenario">
      <header className="scenarioHeader">
        <h3 className="scenarioTitle">{title}</h3>
        <p className="scenarioNote">{note}</p>
      </header>
      <div className="scenarioBody">{children((range, preset) => setApplied({range, preset}))}</div>
      <footer className="scenarioResult">
        <span className="resultLabel">Applied</span>
        {applied ? (
          <span className="resultValue">
            <span>
              {formatDate(applied.range?.from)} – {formatDate(applied.range?.to)}
            </span>
            <WuChip size="sm">
              {applied.preset.label}
            </WuChip>
          </span>
        ) : (
          <span className="resultEmpty">Nothing yet</span>
        )}
      </footer>
    </article>
  )
}

function formatDate(date?: Date) {
  return date ? date.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'}) : '—'
}
