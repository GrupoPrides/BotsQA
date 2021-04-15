using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace K360ConciergeBot
{
	public class ConversationData
	{
        // The time-stamp of the most recent incoming message.  
        public string Timestamp { get; set; }

        // The ID of the user's channel.  
        public string ChannelId { get; set; }
        public string Ingreso { get; set; }
        public int AgentType { get; set; }


        // Track whether we have already asked the user's name  
        public bool PromptedUserForName { get; set; } = false;

    }

}
