import axios from 'axios';

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

export async function sendToSlack(type: string, data: any) {
    try {
        // Format data fields into readable text
        const formattedFields = Object.entries(data).map(([key, value]) => ({
            type: "mrkdwn",
            text: `*${key.charAt(0).toUpperCase() + key.slice(1)}:*\n${value}`
        }));

        const message = {
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: `🎯 New ${type}`,
                        emoji: true
                    }
                },
                {
                    type: "divider"
                },
                {
                    type: "section",
                    fields: formattedFields.slice(0, 10) // Slack limits to 10 fields per section
                },
                {
                    type: "divider"
                },
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: `🕒 Submitted at: ${new Date().toLocaleString()}`
                        }
                    ]
                }
            ]
        };

        await axios.post(SLACK_WEBHOOK_URL, message);
        console.log(`✅ Slack notification sent for ${type}`);
    } catch (error) {
        console.error('❌ Error sending Slack notification:', error);
    }
}