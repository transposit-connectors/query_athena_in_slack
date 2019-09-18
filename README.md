# Query Athena in Slack

This app allows you to run Athena queries from Slack using dynamic tasks. Dynamic tasks is a feature that allows users to programmatically create and destroy scheduled tasks from Transposit operations. Read more about this feature on docs.transposit.com

Example: `/athena select \* from events limit 10`
When an user sends query via Slack, a Transposit webhook gets invoked, sends a query request to Athena, then creates a scheduled task to check on query status every 5s. The webhook will post back to Slack once results become available.

## Test against your own infrastructure

Step 0: Fork this app

Step 1: Set up Slack slash command
Go to api.slack.com, select `Your Apps`, then navigate to your app of choice to set up.
Click on `Slack Commands` on the left, then `Create New Command`.
In the `Request URL` field, enter the url you find in Transposit UI: Deploy -> Endpoints -> Webhook under 'cURL'
Enter command name of your choice for `Command` field

Step 2:
Make sure the app you just configured is installed, then navigate to Slack, type

`/command_name select * from database_name`
