// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
//
// Generated with Bot Builder V4 SDK Template for Visual Studio EchoBot v4.12.2

using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Text;
namespace K360ConciergeBot.Bots
{
	public class ConciergeBot : ActivityHandler
	{
		private Controllers.IConversation conversation_controller;
		private BotState _conversationState;
		private BotState _userState;

		public ConciergeBot(ConversationState conversationState, UserState userState) {
			_conversationState = conversationState;
			_userState = userState;

		}
		protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
		{

			var userText = turnContext.Activity.Text;

			var userStateAccessors = _userState.CreateProperty<UserProfile>(nameof(UserProfile));
			var userProfile = await userStateAccessors.GetAsync(turnContext, () => new UserProfile());
		

			StringBuilder replyText = new StringBuilder();
			var _conversationData = _conversationState.CreateProperty<ConversationData>(nameof(ConversationData));
			var userConversationData = await _conversationData.GetAsync(turnContext, () => new ConversationData());

			// Se define segun configuracion, con quien conversa el usuario.
			if (userText.ToLower() =="agente")
            {				
				userConversationData.AgentType = 2;

            }
            else if(userText.ToLower() == "bot")
            {
				userConversationData.AgentType = 1;

			}
			conversation_controller = Configurations.BotConversationsConf.GetFirstConversationType(userConversationData.AgentType);
			//conversation_controller.StartConversation();

			if (userConversationData.AgentType == 2 && userConversationData.Ingreso == null)
			{
				//conversation_controller.StartConversation();
				var user = conversation_controller.userProfile();
				if (user != null)
                {
					userConversationData.Ingreso = "si";
					userProfile.ChatId = user.ChatId;
					userProfile.UserID = user.UserID;
					userProfile.NombreVici = user.NombreVici;
				}
				

            }
            else if (userConversationData.AgentType == 1)
			{
				conversation_controller.StartConversation();
			}

            if (userProfile.ChatId!=null && userConversationData.AgentType == 2)
            {
				conversation_controller.SetUserProfile(userProfile);
			}

			conversation_controller.SendMessage(userText);

			if (userConversationData.AgentType == 2)
			{
				var user = conversation_controller.userProfile();
				//userProfile.ChatId = user.ChatId;
				//userProfile.UserID = user.UserID;
				userProfile.IdMensaje = user.IdMensaje;


			}

			var list = conversation_controller.GetMessages();
			foreach (string a in list)
			{
				replyText.Append(a);
			}
			//******************************************************************


			// Envio de respuesta el usuario.
			await turnContext.SendActivityAsync(MessageFactory.Text(replyText.ToString(), replyText.ToString()), cancellationToken);
		}
		public override async Task OnTurnAsync(ITurnContext turnContext, CancellationToken cancellationToken = default)
		{
			await base.OnTurnAsync(turnContext, cancellationToken);

			await _conversationState.SaveChangesAsync(turnContext, false, cancellationToken);

			await _userState.SaveChangesAsync(turnContext, false, cancellationToken).ConfigureAwait(false);
			await _conversationState.SaveChangesAsync(turnContext, false, cancellationToken).ConfigureAwait(false);
			// return base.OnTurnAsync(turnContext, cancellationToken);    
		}

		protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
		{
			var welcomeText = "Hola, soy el Concierge BOT de K360, cómo te llamas ?";
			var _conversationData = _conversationState.CreateProperty<ConversationData>(nameof(ConversationData));
			var userConversationData = await _conversationData.GetAsync(turnContext, () => new ConversationData());
			userConversationData.AgentType = 1;

			foreach (var member in membersAdded)
			{
				if (member.Id != turnContext.Activity.Recipient.Id)
				{
					await turnContext.SendActivityAsync(MessageFactory.Text(welcomeText, welcomeText), cancellationToken);
				}
			}
		}
	}
}
