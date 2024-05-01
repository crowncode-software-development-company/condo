// auto generated by kmigrator
// KMIGRATOR:0384_bankaccount_isapproved_and_more:IyBHZW5lcmF0ZWQgYnkgRGphbmdvIDQuMi40IG9uIDIwMjQtMDQtMTUgMTU6MjIKCmZyb20gZGphbmdvLmRiIGltcG9ydCBtaWdyYXRpb25zLCBtb2RlbHMKCgpjbGFzcyBNaWdyYXRpb24obWlncmF0aW9ucy5NaWdyYXRpb24pOgoKICAgIGRlcGVuZGVuY2llcyA9IFsKICAgICAgICAoJ19kamFuZ29fc2NoZW1hJywgJzAzODNfYWx0ZXJfYjJiYXBwX2RldGFpbGVkZGVzY3JpcHRpb25fYW5kX21vcmUnKSwKICAgIF0KCiAgICBvcGVyYXRpb25zID0gWwogICAgICAgIG1pZ3JhdGlvbnMuQWRkRmllbGQoCiAgICAgICAgICAgIG1vZGVsX25hbWU9J2JhbmthY2NvdW50JywKICAgICAgICAgICAgbmFtZT0naXNBcHByb3ZlZCcsCiAgICAgICAgICAgIGZpZWxkPW1vZGVscy5Cb29sZWFuRmllbGQoZGVmYXVsdD1GYWxzZSksCiAgICAgICAgKSwKICAgICAgICBtaWdyYXRpb25zLkFkZEZpZWxkKAogICAgICAgICAgICBtb2RlbF9uYW1lPSdiYW5rYWNjb3VudGhpc3RvcnlyZWNvcmQnLAogICAgICAgICAgICBuYW1lPSdpc0FwcHJvdmVkJywKICAgICAgICAgICAgZmllbGQ9bW9kZWxzLkJvb2xlYW5GaWVsZChibGFuaz1UcnVlLCBudWxsPVRydWUpLAogICAgICAgICksCiAgICAgICAgbWlncmF0aW9ucy5BbHRlckZpZWxkKAogICAgICAgICAgICBtb2RlbF9uYW1lPSdiaWxsaW5ncmVjaXBpZW50JywKICAgICAgICAgICAgbmFtZT0naXNBcHByb3ZlZCcsCiAgICAgICAgICAgIGZpZWxkPW1vZGVscy5Cb29sZWFuRmllbGQoYmxhbms9VHJ1ZSwgbnVsbD1UcnVlKSwKICAgICAgICApLAogICAgXQo=

exports.up = async (knex) => {
    await knex.raw(`
    BEGIN;
--
-- Add field isApproved to bankaccount
--
ALTER TABLE "BankAccount" ADD COLUMN "isApproved" boolean DEFAULT false NOT NULL;
ALTER TABLE "BankAccount" ALTER COLUMN "isApproved" DROP DEFAULT;
--
-- Add field isApproved to bankaccounthistoryrecord
--
ALTER TABLE "BankAccountHistoryRecord" ADD COLUMN "isApproved" boolean NULL;
--
-- Alter field isApproved on billingrecipient
--
ALTER TABLE "BillingRecipient" ALTER COLUMN "isApproved" DROP NOT NULL;
COMMIT;

    `)
}

exports.down = async (knex) => {
    await knex.raw(`
    BEGIN;
--
-- Alter field isApproved on billingrecipient
--
ALTER TABLE "BillingRecipient" ALTER COLUMN "isApproved" SET NOT NULL;
--
-- Add field isApproved to bankaccounthistoryrecord
--
ALTER TABLE "BankAccountHistoryRecord" DROP COLUMN "isApproved" CASCADE;
--
-- Add field isApproved to bankaccount
--
ALTER TABLE "BankAccount" DROP COLUMN "isApproved" CASCADE;
COMMIT;

    `)
}