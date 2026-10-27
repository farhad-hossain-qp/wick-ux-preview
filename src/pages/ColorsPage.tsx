import {useState} from 'react'
import {
  WuAlert,
  WuBadge,
  WuButton,
  WuCard,
  WuCardFooter,
  WuCardHeader,
  WuChip,
  WuHeading,
  WuInput,
  WuSegmentedSelector,
  WuSegmentedSelectorItem,
  WuToggle,
} from '@npm-questionpro/wick-ui-lib'

const FAMILIES = ['electric-blue', 'dark-blue', 'lead', 'green', 'yellow', 'orange', 'red']
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const BUTTON_COLORS = ['primary', 'error', 'upgrade', 'neutral', 'deep'] as const
const BUTTON_VARIANTS = ['primary', 'secondary', 'outlined'] as const

export function ColorsPage() {
  const [view, setView] = useState('week')

  return (
    <>
      <section className="section">
        <WuHeading size="md">Palette</WuHeading>
        <p className="sectionHint">Every step of each colour family, as shipped in the package.</p>
        <div className="palette">
          {FAMILIES.map(family => (
            <Family key={family} family={family} />
          ))}
        </div>
      </section>

      <section className="section">
        <WuHeading size="md">Buttons</WuHeading>
        <p className="sectionHint">Each colour in each variant. Hover, focus with Tab, and press to check every state.</p>
        {BUTTON_VARIANTS.map(variant => (
          <div className="row" key={variant}>
            <span className="rowLabel">{variant}</span>
            {BUTTON_COLORS.map(color => (
              <WuButton key={color} variant={variant} color={color}>
                {color}
              </WuButton>
            ))}
            <WuButton variant={variant} disabled>
              disabled
            </WuButton>
            <WuButton variant={variant} loading>
              loading
            </WuButton>
          </div>
        ))}
      </section>

      <section className="section">
        <WuHeading size="md">Chips</WuHeading>
        <div className="row">
          <span className="rowLabel">primary</span>
          <WuChip>Default</WuChip>
          <WuChip selected>Selected</WuChip>
          <WuChip color="success">Success</WuChip>
          <WuChip color="warning">Warning</WuChip>
          <WuChip color="danger">Danger</WuChip>
          <WuChip disabled>Disabled</WuChip>
          <WuChip onClose={() => undefined}>Closable</WuChip>
        </div>
        <div className="row">
          <span className="rowLabel">secondary</span>
          <WuChip variant="secondary">Default</WuChip>
          <WuChip variant="secondary" selected>
            Selected
          </WuChip>
          <WuChip variant="secondary" color="success">
            Success
          </WuChip>
          <WuChip variant="secondary" color="warning">
            Warning
          </WuChip>
          <WuChip variant="secondary" color="danger">
            Danger
          </WuChip>
          <WuChip variant="secondary" disabled>
            Disabled
          </WuChip>
        </div>
      </section>

      <section className="section">
        <WuHeading size="md">Badges</WuHeading>
        <div className="row">
          <WuBadge Content={3} color="primary">
            <WuButton variant="outlined">Primary</WuButton>
          </WuBadge>
          <WuBadge Content={12} color="success">
            <WuButton variant="outlined">Success</WuButton>
          </WuBadge>
          <WuBadge Content={5} color="warning">
            <WuButton variant="outlined">Warning</WuButton>
          </WuBadge>
          <WuBadge Content={120} max={99} color="danger">
            <WuButton variant="outlined">Danger</WuButton>
          </WuBadge>
        </div>
      </section>

      <section className="section">
        <WuHeading size="md">Alerts</WuHeading>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, maxInlineSize: 640}}>
          <WuAlert variant="info">Info: your survey is saved as a draft.</WuAlert>
          <WuAlert variant="success">Success: the report was exported.</WuAlert>
          <WuAlert variant="warning">Warning: 3 questions have no answers.</WuAlert>
          <WuAlert variant="danger">Danger: the upload failed. Try again.</WuAlert>
          <WuAlert variant="beta">Beta: this feature is still being tested.</WuAlert>
          <WuAlert variant="premium">Premium: upgrade to unlock this feature.</WuAlert>
        </div>
      </section>

      <section className="section">
        <WuHeading size="md">Form fields</WuHeading>
        <div className="grid">
          <WuInput Label="Default" placeholder="Type here" />
          <WuInput Label="Invalid" placeholder="Type here" invalid />
          <WuInput Label="Disabled" placeholder="Type here" disabled />
          <WuInput Label="Read-only" defaultValue="Read-only value" readonly />
        </div>
        <div className="row" style={{marginBlockStart: 16}}>
          <WuToggle Label="Toggle on" defaultChecked />
          <WuToggle Label="Toggle off" />
          <WuToggle Label="Disabled" disabled />
          <WuSegmentedSelector value={view} onChange={setView}>
            <WuSegmentedSelectorItem value="day">Day</WuSegmentedSelectorItem>
            <WuSegmentedSelectorItem value="week">Week</WuSegmentedSelectorItem>
            <WuSegmentedSelectorItem value="month">Month</WuSegmentedSelectorItem>
          </WuSegmentedSelector>
        </div>
      </section>

      <section className="section">
        <WuHeading size="md">Cards</WuHeading>
        <div className="grid">
          <SampleCard title="Default" />
          <SampleCard title="Selected" selected />
          <SampleCard title="Disabled" disabled />
          <SampleCard title="Dragging" dragging />
        </div>
      </section>
    </>
  )
}

function Family({family}: {family: string}) {
  return (
    <>
      <span className="paletteFamily">{family.replace('-', ' ')}</span>
      {STEPS.map(step => (
        <div className="swatch" key={step}>
          <div className="swatchColor" style={{backgroundColor: `var(--wu-color-${family}-${step})`}} />
          <span>{step}</span>
        </div>
      ))}
    </>
  )
}

function SampleCard({title, ...props}: {title: string; selected?: boolean; disabled?: boolean; dragging?: boolean}) {
  return (
    <WuCard {...props}>
      <WuCardHeader className="cardBody">{title}</WuCardHeader>
      <div className="cardBody">Customer satisfaction survey, 248 responses.</div>
      <WuCardFooter className="cardBody">Updated today</WuCardFooter>
    </WuCard>
  )
}
