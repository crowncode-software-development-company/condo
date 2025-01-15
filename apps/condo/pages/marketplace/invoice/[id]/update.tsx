import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import {
    InvoiceReadAndManagePermissionRequired,
} from '@condo/domains/marketplace/components/PageAccess'



const UpdateInvoicePage: PageComponentType = () => {
    return (
        <AccessDeniedPage/>
    )
}

UpdateInvoicePage.requiredAccess = InvoiceReadAndManagePermissionRequired

export default UpdateInvoicePage
