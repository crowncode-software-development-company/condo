import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'


const FailurePage: PageComponentType = () => {
    return (
        <AccessDeniedPage/>
    )
}

FailurePage.skipUserPrefetch = true

export default FailurePage
