import {useState} from 'react'
import {WuHeading, WuSegmentedSelector, WuSegmentedSelectorItem, WuThemeToggle} from '@npm-questionpro/wick-ui-lib'

import {ColorsPage} from './pages/ColorsPage'
import {DateRangePage} from './pages/DateRangePage'

const WICK_VERSION = '2.24.0-next.0'

type IPage = 'colors' | 'date-range'

export default function App() {
  const [page, setPage] = useState<IPage>('colors')

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbarTitle">
          <WuHeading size="lg">Wick UI preview</WuHeading>
          <span className="version">@npm-questionpro/wick-ui-lib {WICK_VERSION}</span>
        </div>
        <div className="row">
          <WuSegmentedSelector value={page} onChange={value => setPage(value as IPage)}>
            <WuSegmentedSelectorItem value="colors">Colors</WuSegmentedSelectorItem>
            <WuSegmentedSelectorItem value="date-range">Date range picker</WuSegmentedSelectorItem>
          </WuSegmentedSelector>
          <WuThemeToggle />
        </div>
      </header>
      {page === 'colors' ? <ColorsPage /> : <DateRangePage />}
    </div>
  )
}
