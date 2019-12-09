import React from 'react'
import cx from 'classnames'

import { paddingRight_l, margin_xs } from './styles.scss'

const App = () => {
  return (
    <div className={cx(margin_xs, paddingRight_l)}>
      Text with margin around it
    </div>
  )
}

export default App