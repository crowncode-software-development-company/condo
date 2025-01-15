import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import { MarketItemReadAndManagePermissionRequired } from '@condo/domains/marketplace/components/PageAccess'



const UpdateInvoicePage: PageComponentType = () => {
    return (
        <AccessDeniedPage/>
    )
}

UpdateInvoicePage.requiredAccess = MarketItemReadAndManagePermissionRequired

export default UpdateInvoicePage
