import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { AuthRequired } from '@condo/domains/common/components/containers/AuthRequired'
import { PageComponentType } from '@condo/domains/common/types'

const TourPage: PageComponentType = () => {
    return (
        <AccessDeniedPage />
    )
}

TourPage.requiredAccess = AuthRequired

export default TourPage
