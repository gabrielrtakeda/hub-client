import React from 'react'
import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import { SettingsMenu, MobilizationBasicsForm } from '~mobilizations/components'

const MobilizationBasicsPage = props => (
  <SettingsPageLayout>
    <SettingsMenu {...props} />
    <SettingsPageContentLayout>
      <MobilizationBasicsForm floatSubmit {...props} />
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

export default MobilizationBasicsPage