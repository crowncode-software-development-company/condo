// This file is autogenerated by @graphql-codegen/cli
// Do not edit / add anything manually, since it will be overridden by codegen

import * as Types from '@/schema'

export type AuthenticatedUserQueryVariables = Types.Exact<{ [key: string]: never }>


export type AuthenticatedUserQuery = { __typename?: 'Query', authenticatedUser?: { __typename?: 'User', id: string, name?: string | null, type?: Types.UserTypeType | null } | null }