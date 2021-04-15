using System;
using System.Collections.Generic;
using Microsoft.Bot.Connector.DirectLine;
using System.Collections;

namespace K360ConciergeBot.Controllers
{
	public interface IConversation
	{

		public void StartConversation();

		public void SendMessage(string message);

		public ArrayList GetMessages();
		public UserProfile userProfile();
		public void SetUserProfile(UserProfile user);

	}
}