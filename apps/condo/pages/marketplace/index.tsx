import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import { MarketplaceReadPermissionRequired } from '@condo/domains/marketplace/components/PageAccess'


const MarketplacePage: PageComponentType = () => {
    return (
        <AccessDeniedPage/>
    )
}

MarketplacePage.requiredAccess = MarketplaceReadPermissionRequired

export default MarketplacePage
