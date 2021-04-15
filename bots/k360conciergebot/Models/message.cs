using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace K360ConciergeBot.Models
{
    public class From
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class Recipient
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class InfoGeneral
    {
        public int mensjesActuales { get; set; }
        public string statusChat { get; set; }
    }

    public class Message
    {
        public string type { get; set; }
        public string id { get; set; }
        public string chatId { get; set; }
        public string timestamp { get; set; }
        public From from { get; set; }
        public Recipient recipient { get; set; }
        public string text { get; set; }
       
    }

    public class Root
    {
        public InfoGeneral infoGeneral { get; set; }
        public string title { get; set; }
        public List<Message> message { get; set; }
    }
}