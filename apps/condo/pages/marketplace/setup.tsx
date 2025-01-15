import React from 'react'

import { AccessDeniedPage } from '@condo/domains/common/components/containers/AccessDeniedPage'
import { PageComponentType } from '@condo/domains/common/types'
import {
    MarketplaceSetupPermissionRequired,
} from '@condo/domains/marketplace/components/PageAccess'



type MarketplaceOnboardingPageProps = {
    onFinish: () => void
    withVerification?: boolean
}

const MarketplaceOnboardingPage: PageComponentType<MarketplaceOnboardingPageProps> = ({ onFinish, withVerification }) => {
    return (
        <AccessDeniedPage/>
    )
}

MarketplaceOnboardingPage.requiredAccess = MarketplaceSetupPermissionRequired

export default MarketplaceOnboardingPage
