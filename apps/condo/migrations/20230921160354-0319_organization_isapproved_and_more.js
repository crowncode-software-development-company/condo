// auto generated by kmigrator
// KMIGRATOR:0319_organization_isapproved_and_more:IyBHZW5lcmF0ZWQgYnkgRGphbmdvIDQuMC41IG9uIDIwMjMtMDktMjEgMTE6MDQKCmZyb20gZGphbmdvLmRiIGltcG9ydCBtaWdyYXRpb25zLCBtb2RlbHMKCgpjbGFzcyBNaWdyYXRpb24obWlncmF0aW9ucy5NaWdyYXRpb24pOgoKICAgIGRlcGVuZGVuY2llcyA9IFsKICAgICAgICAoJ19kamFuZ29fc2NoZW1hJywgJzAzMThfYXV0b18yMDIzMDkxOV8wNzE2JyksCiAgICBdCgogICAgb3BlcmF0aW9ucyA9IFsKICAgICAgICBtaWdyYXRpb25zLkFkZEZpZWxkKAogICAgICAgICAgICBtb2RlbF9uYW1lPSdvcmdhbml6YXRpb24nLAogICAgICAgICAgICBuYW1lPSdpc0FwcHJvdmVkJywKICAgICAgICAgICAgZmllbGQ9bW9kZWxzLkJvb2xlYW5GaWVsZChkZWZhdWx0PVRydWUpLAogICAgICAgICAgICBwcmVzZXJ2ZV9kZWZhdWx0PUZhbHNlLAogICAgICAgICksCiAgICAgICAgbWlncmF0aW9ucy5BZGRGaWVsZCgKICAgICAgICAgICAgbW9kZWxfbmFtZT0nb3JnYW5pemF0aW9uaGlzdG9yeXJlY29yZCcsCiAgICAgICAgICAgIG5hbWU9J2lzQXBwcm92ZWQnLAogICAgICAgICAgICBmaWVsZD1tb2RlbHMuQm9vbGVhbkZpZWxkKGJsYW5rPVRydWUsIG51bGw9VHJ1ZSksCiAgICAgICAgKSwKICAgICAgICBtaWdyYXRpb25zLkFkZEZpZWxkKAogICAgICAgICAgICBtb2RlbF9uYW1lPSd1c2VycmlnaHRzc2V0JywKICAgICAgICAgICAgbmFtZT0nY2FuTWFuYWdlT3JnYW5pemF0aW9ucycsCiAgICAgICAgICAgIGZpZWxkPW1vZGVscy5Cb29sZWFuRmllbGQoZGVmYXVsdD1GYWxzZSksCiAgICAgICAgICAgIHByZXNlcnZlX2RlZmF1bHQ9RmFsc2UsCiAgICAgICAgKSwKICAgICAgICBtaWdyYXRpb25zLkFkZEZpZWxkKAogICAgICAgICAgICBtb2RlbF9uYW1lPSd1c2VycmlnaHRzc2V0aGlzdG9yeXJlY29yZCcsCiAgICAgICAgICAgIG5hbWU9J2Nhbk1hbmFnZU9yZ2FuaXphdGlvbnMnLAogICAgICAgICAgICBmaWVsZD1tb2RlbHMuQm9vbGVhbkZpZWxkKGJsYW5rPVRydWUsIG51bGw9VHJ1ZSksCiAgICAgICAgKSwKICAgIF0K

exports.up = async (knex) => {
    await knex.raw(`
    BEGIN;
--
-- Add field isApproved to organization
--
ALTER TABLE "Organization" ADD COLUMN "isApproved" boolean DEFAULT true NOT NULL;
ALTER TABLE "Organization" ALTER COLUMN "isApproved" DROP DEFAULT;
--
-- Add field isApproved to organizationhistoryrecord
--
ALTER TABLE "OrganizationHistoryRecord" ADD COLUMN "isApproved" boolean NULL;
--
-- Add field canManageOrganizations to userrightsset
--
ALTER TABLE "UserRightsSet" ADD COLUMN "canManageOrganizations" boolean DEFAULT false NOT NULL;
ALTER TABLE "UserRightsSet" ALTER COLUMN "canManageOrganizations" DROP DEFAULT;
--
-- Add field canManageOrganizations to userrightssethistoryrecord
--
ALTER TABLE "UserRightsSetHistoryRecord" ADD COLUMN "canManageOrganizations" boolean NULL;
COMMIT;

    `)
}

exports.down = async (knex) => {
    await knex.raw(`
    BEGIN;
--
-- Add field canManageOrganizations to userrightssethistoryrecord
--
ALTER TABLE "UserRightsSetHistoryRecord" DROP COLUMN "canManageOrganizations" CASCADE;
--
-- Add field canManageOrganizations to userrightsset
--
ALTER TABLE "UserRightsSet" DROP COLUMN "canManageOrganizations" CASCADE;
--
-- Add field isApproved to organizationhistoryrecord
--
ALTER TABLE "OrganizationHistoryRecord" DROP COLUMN "isApproved" CASCADE;
--
-- Add field isApproved to organization
--
ALTER TABLE "Organization" DROP COLUMN "isApproved" CASCADE;
COMMIT;

    `)
}