import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import { InvoiceReadAndManagePermissionRequired } from '@condo/domains/marketplace/components/PageAccess'



const CreateInvoicePage: PageComponentType = () => {

    return (
        <AccessDeniedPage/>
    )
}

CreateInvoicePage.requiredAccess = InvoiceReadAndManagePermissionRequired

export default CreateInvoicePage
