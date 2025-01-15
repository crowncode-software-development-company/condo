import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import { ServicesReadPermissionRequired } from '@condo/domains/miniapp/components/PageAccess'


const MiniappDescriptionPage: PageComponentType = () => {
    return <AccessDeniedPage />
}

MiniappDescriptionPage.requiredAccess = ServicesReadPermissionRequired

export default MiniappDescriptionPage
