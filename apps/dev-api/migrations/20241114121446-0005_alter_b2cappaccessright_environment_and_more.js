// auto generated by kmigrator
// KMIGRATOR:0005_alter_b2cappaccessright_environment_and_more:IyBHZW5lcmF0ZWQgYnkgRGphbmdvIDQuMCBvbiAyMDI0LTExLTE0IDA3OjE0Cgpmcm9tIGRqYW5nby5kYiBpbXBvcnQgbWlncmF0aW9ucywgbW9kZWxzCgoKY2xhc3MgTWlncmF0aW9uKG1pZ3JhdGlvbnMuTWlncmF0aW9uKToKCiAgICBkZXBlbmRlbmNpZXMgPSBbCiAgICAgICAgKCdfZGphbmdvX3NjaGVtYScsICcwMDA0X3JlbW92ZV9iMmNhcHBhY2Nlc3NyaWdodGhpc3RvcnlyZWNvcmRfY29uZG91c2VyZW1haWwnKSwKICAgIF0KCiAgICBvcGVyYXRpb25zID0gWwogICAgICAgIG1pZ3JhdGlvbnMuQWx0ZXJGaWVsZCgKICAgICAgICAgICAgbW9kZWxfbmFtZT0nYjJjYXBwYWNjZXNzcmlnaHQnLAogICAgICAgICAgICBuYW1lPSdlbnZpcm9ubWVudCcsCiAgICAgICAgICAgIGZpZWxkPW1vZGVscy5DaGFyRmllbGQobWF4X2xlbmd0aD01MCksCiAgICAgICAgKSwKICAgICAgICBtaWdyYXRpb25zLkFsdGVyRmllbGQoCiAgICAgICAgICAgIG1vZGVsX25hbWU9J2IyY2FwcGFjY2Vzc3JpZ2h0aGlzdG9yeXJlY29yZCcsCiAgICAgICAgICAgIG5hbWU9J2hpc3RvcnlfYWN0aW9uJywKICAgICAgICAgICAgZmllbGQ9bW9kZWxzLkNoYXJGaWVsZChtYXhfbGVuZ3RoPTUwKSwKICAgICAgICApLAogICAgICAgIG1pZ3JhdGlvbnMuQWx0ZXJGaWVsZCgKICAgICAgICAgICAgbW9kZWxfbmFtZT0nYjJjYXBwYnVpbGRoaXN0b3J5cmVjb3JkJywKICAgICAgICAgICAgbmFtZT0naGlzdG9yeV9hY3Rpb24nLAogICAgICAgICAgICBmaWVsZD1tb2RlbHMuQ2hhckZpZWxkKG1heF9sZW5ndGg9NTApLAogICAgICAgICksCiAgICAgICAgbWlncmF0aW9ucy5BbHRlckZpZWxkKAogICAgICAgICAgICBtb2RlbF9uYW1lPSdiMmNhcHBoaXN0b3J5cmVjb3JkJywKICAgICAgICAgICAgbmFtZT0naGlzdG9yeV9hY3Rpb24nLAogICAgICAgICAgICBmaWVsZD1tb2RlbHMuQ2hhckZpZWxkKG1heF9sZW5ndGg9NTApLAogICAgICAgICksCiAgICAgICAgbWlncmF0aW9ucy5BbHRlckZpZWxkKAogICAgICAgICAgICBtb2RlbF9uYW1lPSdiMmNhcHBwdWJsaXNocmVxdWVzdGhpc3RvcnlyZWNvcmQnLAogICAgICAgICAgICBuYW1lPSdoaXN0b3J5X2FjdGlvbicsCiAgICAgICAgICAgIGZpZWxkPW1vZGVscy5DaGFyRmllbGQobWF4X2xlbmd0aD01MCksCiAgICAgICAgKSwKICAgICAgICBtaWdyYXRpb25zLkFsdGVyRmllbGQoCiAgICAgICAgICAgIG1vZGVsX25hbWU9J2NvbmZpcm1lbWFpbGFjdGlvbmhpc3RvcnlyZWNvcmQnLAogICAgICAgICAgICBuYW1lPSdoaXN0b3J5X2FjdGlvbicsCiAgICAgICAgICAgIGZpZWxkPW1vZGVscy5DaGFyRmllbGQobWF4X2xlbmd0aD01MCksCiAgICAgICAgKSwKICAgICAgICBtaWdyYXRpb25zLkFsdGVyRmllbGQoCiAgICAgICAgICAgIG1vZGVsX25hbWU9J2NvbmZpcm1waG9uZWFjdGlvbmhpc3RvcnlyZWNvcmQnLAogICAgICAgICAgICBuYW1lPSdoaXN0b3J5X2FjdGlvbicsCiAgICAgICAgICAgIGZpZWxkPW1vZGVscy5DaGFyRmllbGQobWF4X2xlbmd0aD01MCksCiAgICAgICAgKSwKICAgICAgICBtaWdyYXRpb25zLkFsdGVyRmllbGQoCiAgICAgICAgICAgIG1vZGVsX25hbWU9J3VzZXJoaXN0b3J5cmVjb3JkJywKICAgICAgICAgICAgbmFtZT0naGlzdG9yeV9hY3Rpb24nLAogICAgICAgICAgICBmaWVsZD1tb2RlbHMuQ2hhckZpZWxkKG1heF9sZW5ndGg9NTApLAogICAgICAgICksCiAgICAgICAgbWlncmF0aW9ucy5BbHRlckZpZWxkKAogICAgICAgICAgICBtb2RlbF9uYW1lPSd3ZWJob29raGlzdG9yeXJlY29yZCcsCiAgICAgICAgICAgIG5hbWU9J2hpc3RvcnlfYWN0aW9uJywKICAgICAgICAgICAgZmllbGQ9bW9kZWxzLkNoYXJGaWVsZChtYXhfbGVuZ3RoPTUwKSwKICAgICAgICApLAogICAgICAgIG1pZ3JhdGlvbnMuQWx0ZXJGaWVsZCgKICAgICAgICAgICAgbW9kZWxfbmFtZT0nd2ViaG9va3N1YnNjcmlwdGlvbmhpc3RvcnlyZWNvcmQnLAogICAgICAgICAgICBuYW1lPSdoaXN0b3J5X2FjdGlvbicsCiAgICAgICAgICAgIGZpZWxkPW1vZGVscy5DaGFyRmllbGQobWF4X2xlbmd0aD01MCksCiAgICAgICAgKSwKICAgIF0K

exports.up = async (knex) => {
    await knex.raw(`
    BEGIN;
--
-- Alter field environment on b2cappaccessright
--
--
-- Alter field history_action on b2cappaccessrighthistoryrecord
--
--
-- Alter field history_action on b2cappbuildhistoryrecord
--
--
-- Alter field history_action on b2capphistoryrecord
--
--
-- Alter field history_action on b2capppublishrequesthistoryrecord
--
--
-- Alter field history_action on confirmemailactionhistoryrecord
--
--
-- Alter field history_action on confirmphoneactionhistoryrecord
--
--
-- Alter field history_action on userhistoryrecord
--
--
-- Alter field history_action on webhookhistoryrecord
--
--
-- Alter field history_action on webhooksubscriptionhistoryrecord
--
COMMIT;

    `)
}

exports.down = async (knex) => {
    await knex.raw(`
    BEGIN;
--
-- Alter field history_action on webhooksubscriptionhistoryrecord
--
--
-- Alter field history_action on webhookhistoryrecord
--
--
-- Alter field history_action on userhistoryrecord
--
--
-- Alter field history_action on confirmphoneactionhistoryrecord
--
--
-- Alter field history_action on confirmemailactionhistoryrecord
--
--
-- Alter field history_action on b2capppublishrequesthistoryrecord
--
--
-- Alter field history_action on b2capphistoryrecord
--
--
-- Alter field history_action on b2cappbuildhistoryrecord
--
--
-- Alter field history_action on b2cappaccessrighthistoryrecord
--
--
-- Alter field environment on b2cappaccessright
--
COMMIT;

    `)
}