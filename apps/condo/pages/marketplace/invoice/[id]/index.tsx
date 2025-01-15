import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import { InvoiceReadPermissionRequired } from '@condo/domains/marketplace/components/PageAccess'


const InvoiceIdPage: PageComponentType = () => {

    return (
        <AccessDeniedPage/>
    )
}

InvoiceIdPage.requiredAccess = InvoiceReadPermissionRequired

export default InvoiceIdPage
