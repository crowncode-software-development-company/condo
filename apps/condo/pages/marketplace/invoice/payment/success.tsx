import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'

const SuccessPage: PageComponentType = () => {
    return (
        <AccessDeniedPage/>
    )
}


SuccessPage.skipUserPrefetch = true

export default SuccessPage
