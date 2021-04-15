using Microsoft.Extensions.Configuration;

namespace K360ConciergeBot.Configurations
{
	public static class BotConversationsConf
	{
		static Controllers.IConversation conversation;
		public static Controllers.IConversation GetFirstConversationType(int AgentType) {
			var usar_bot = 2;

			if (AgentType == 1)
			{
				conversation = new Controllers.ThirdPartyBotConversationController();
			}
			else
			{
				conversation = new Controllers.AgentConversationController();
			}

			return conversation;
			
		}


	}
}
