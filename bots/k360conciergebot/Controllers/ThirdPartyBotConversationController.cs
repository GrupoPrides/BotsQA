// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
//
// Generated with Bot Builder V4 SDK Template for Visual Studio EchoBot v4.12.2
using Microsoft.Bot.Connector.DirectLine;
using System.Collections.Generic;
using System.Collections;

namespace K360ConciergeBot.Controllers
{
	public class ThirdPartyBotConversationController:IConversation
	{
		readonly string directLineSecret = "nhAVOtqiopU.D3tk_LWh4edqjIjikcwLr86q8zCwYXNP7wRcke25J_Q";
		//readonly string botId = "Deni";
		readonly string fromUser = "testuser";
		Conversation _conversation;

		readonly Microsoft.Bot.Connector.DirectLine.DirectLineClient _directLineInterface;
		string _watermark;


		public ThirdPartyBotConversationController()
		{
			_directLineInterface = new Microsoft.Bot.Connector.DirectLine.DirectLineClient(directLineSecret);
		}

		public void StartConversation()
		{
			_conversation = _directLineInterface.Conversations.StartConversation();

			//return _conversation;
		}

		public void SendMessage(string message)
		{
			var fromProperty = new ChannelAccount(fromUser);

			var activity = new Activity(text: message, fromProperty: fromProperty, type: "message");

			_directLineInterface.Conversations.PostActivity(_conversation.ConversationId, activity);
		}
		public ArrayList GetMessages()
		{
			var list = GetActivities();
			ArrayList respuestas = new ArrayList();

			foreach (Microsoft.Bot.Connector.DirectLine.Activity a in list)
			{
				respuestas.Add(a.Text);
			}

			return respuestas;
		}

		private IList<Activity> GetActivities()
		{
			var response = _directLineInterface.Conversations.GetActivities(_conversation.ConversationId, _watermark);

			_watermark = response.Watermark;

			return response.Activities;
		}

        public UserProfile userProfile()
        {
            throw new System.NotImplementedException();
        }

        public void SetUserProfile(UserProfile userProfile)
        {
            throw new System.NotImplementedException();
        }
    }
}
