Successful moderation actions create numbered cases with the reason, evidence and DM status. Use `/cases` to view them. Run `/setup` to choose the channels for audit, moderation, message, member, voice and case logs.

Message edits show readable before and after content, including embeds and Components V2. Longer evidence is attached as a text file. Repeated deliveries of the same update and automatic media-loading changes are ignored. Real edits by members and other bots remain eligible; Bolt's own messages are excluded so log cards cannot generate more log cards.

Deleted-message logs use content Bolt captured before deletion. Empty uncached deletions are skipped, and deleted messages cannot be fetched back from Discord. Up to four available images are re-uploaded, with a proxy fallback and an 8 MB limit per image. Unavailable images cannot be restored.

Discord audit entries are separate from message content logs. Bolt needs View Audit Log to receive audit entries; Discord cannot identify an executor for actions it does not audit.

Mute schedules and pending greeting deletions persist in MongoDB and resume after restarts. Downtime or missing Discord permissions can delay scheduled actions.
