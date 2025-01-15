import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { AuthRequired } from '@condo/domains/common/components/containers/AuthRequired'
import { PageComponentType } from '@condo/domains/common/types'

const GuidePage: PageComponentType = () => {

    return (
        <AccessDeniedPage/>
    )
}

GuidePage.requiredAccess = AuthRequired

export default GuidePage
