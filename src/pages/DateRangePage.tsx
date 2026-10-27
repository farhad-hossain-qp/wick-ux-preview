import {useState} from 'react'
import type {DateRange} from 'react-day-picker'
import {WuDateRangePicker, WuHeading, type IWuDateRangePreset} from '@npm-questionpro/wick-ui-lib'

type IDateRange = DateRange

const today = new Date()
const daysAgo = (days: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() - days)

export function DateRangePage() {
  return (
    <section className="section">
      <WuHeading size="md">Date range picker</WuHeading>
      <p className="sectionHint">
        Pick a start and end date across the two linked calendars, or choose a preset, then press Apply.
      </p>
      <div className="grid">
        <Scenario title="Default" note="Built-in presets, empty to start.">
          {onChange => <WuDateRangePicker Label="Date range" onChange={onChange} />}
        </Scenario>

        <Scenario title="With a starting value" note="Opens on the last 7 days.">
          {onChange => <ControlledPicker onChange={onChange} />}
        </Scenario>

        <Scenario title="Includes today" note="Rolling presets end today instead of yesterday.">
          {onChange => <WuDateRangePicker Label="Date range" includeToday onChange={onChange} />}
        </Scenario>

        <Scenario title="Extra presets" note="Custom presets added after the built-in ones.">
          {onChange => (
            <WuDateRangePicker
              Label="Date range"
              presetRanges={[
                {label: 'Last 14 days', value: 14},
                {label: 'Last 90 days', value: 90},
              ]}
              onChange={onChange}
            />
          )}
        </Scenario>

        <Scenario title="Only custom presets" note="Built-in presets turned off.">
          {onChange => (
            <WuDateRangePicker
              Label="Date range"
              append={false}
              presetRanges={[
                {label: 'Last 3 days', value: 3},
                {label: 'Last 30 days', value: 30},
              ]}
              onChange={onChange}
            />
          )}
        </Scenario>

        <Scenario title="Min and max dates" note="Only the last 60 days can be picked.">
          {onChange => <WuDateRangePicker Label="Date range" minDate={daysAgo(60)} maxDate={today} onChange={onChange} />}
        </Scenario>

        <Scenario title="Weekends disabled" note="Saturdays and Sundays can't be picked.">
          {onChange => (
            <WuDateRangePicker Label="Date range" disabledDate={{dayOfWeek: [0, 6]}} onChange={onChange} />
          )}
        </Scenario>

        <Scenario title="Month, quarter and year" note="Switch the period in the header.">
          {onChange => (
            <WuDateRangePicker Label="Date range" period={['day', 'month', 'quarter', 'year']} onChange={onChange} />
          )}
        </Scenario>

        <Scenario title="Primary trigger" note="Filled trigger button.">
          {onChange => <WuDateRangePicker Label="Date range" variant="primary" onChange={onChange} />}
        </Scenario>

        <Scenario title="Invalid" note="Error border on the trigger.">
          {onChange => <WuDateRangePicker Label="Date range" invalid onChange={onChange} />}
        </Scenario>

        <Scenario title="Label on the left" note="Label beside the trigger.">
          {onChange => <WuDateRangePicker Label="Date range" labelPosition="left" onChange={onChange} />}
        </Scenario>

        <Scenario title="Right to left" note="Arabic / Hebrew layout.">
          {onChange => (
            <div dir="rtl">
              <WuDateRangePicker Label="نطاق التاريخ" onChange={onChange} />
            </div>
          )}
        </Scenario>
      </div>
    </section>
  )
}

function ControlledPicker({onChange}: {onChange: IOnChange}) {
  const [range, setRange] = useState<IDateRange | undefined>({from: daysAgo(7), to: today})

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

type IOnChange = (range: IDateRange | undefined, preset: IWuDateRangePreset) => void

function Scenario({title, note, children}: {title: string; note: string; children: (onChange: IOnChange) => React.ReactNode}) {
  const [result, setResult] = useState<string>('Nothing applied yet')

  const handleChange: IOnChange = (range, preset) => {
    setResult(`${formatDate(range?.from)} → ${formatDate(range?.to)}\npreset: ${preset.label} (${preset.value})`)
  }

  return (
    <div className="scenario">
      <h3 className="scenarioTitle">{title}</h3>
      <p className="scenarioNote">{note}</p>
      {children(handleChange)}
      <pre className="output">{result}</pre>
    </div>
  )
}

function formatDate(date?: Date) {
  return date ? date.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}) : '—'
}
