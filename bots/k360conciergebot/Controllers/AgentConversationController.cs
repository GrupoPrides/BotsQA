using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Collections;
using K360ConciergeBot.Models;
using Microsoft.Bot.Builder;
using System.Threading;

namespace K360ConciergeBot.Controllers
{
    public class AgentConversationController : IConversation
    {
        private BotState _conversationState;
        private BotState _userState;
        UserProfile GetUser { get; set; }

        string first_name { get; set; }
        string last_name { get; set; }
        string phone_number { get; set; }
        string group_id { get; set; }
        string email { get; set; }
        string send_request { get; set; }
        string chat_id { get; set; }


        // GET: AgentConversation
        public void StartConversation()
        {

            var user = new UsuarioVicidial("", first_name, last_name, phone_number, "", group_id, email);
            try
            {
                var client = new RestClient("http://localhost:8080/chatvicidial/Chat/login");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                Random rnd = new Random();
                int month = rnd.Next(1, 55);  // creates a number between 1 and 12

                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddParameter("first_name", "josueprueba");
                request.AddParameter("last_name", "Becerra");
                request.AddParameter("phoneNumber", "88452509");
                request.AddParameter("email", "jbecerra@gmail.com");
                //request.AddParameter("send_request", send_request);
                request.AddParameter("group_id", "ChatTest");

                IRestResponse response = client.Execute(request);
                HttpStatusCode statusCode = response.StatusCode;
                int numericStatusCode = (int)statusCode;
                var objet = response.Content;

                JObject JsonResult1 = JObject.Parse(response.Content);
                var title = JsonResult1["title"];

                if (!title.ToString().Equals("Error"))
                {
                    JObject JsonResult = JObject.Parse(response.Content);

                    var array = JsonResult["message"];
                    var chat_id = array["chat_id"];
                    var user_vici = array["user_id"];
                    var chat_member_name = array["chat_member_name"];
                    this.chat_id = chat_id.ToString();

                    user.user = user_vici.ToString();
                    user.chat = chat_id.ToString();
                    GetUser = new UserProfile();
                    GetUser.ChatId = user.chat;
                    GetUser.UserID = user.user;
                    GetUser.NombreVici = chat_member_name.ToString();

                    //  UserInfo = user; //Aqui se asigna a una variable de seccion (UserProfile)

                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        public void SendMessage(string chat_message)
        {
            try
            {
                GetUser = new UserProfile();
                var user = new UsuarioVicidial(); //Este tien que ser un User de seccion (UserProfile).

                var client = new RestClient("http://localhost:8080/chatvicidial/Chat/sendMessage");
                client.Timeout = -1;
                var userP = GetUser;
                //userP.NombreVici = "josueprueba Becerra";
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddParameter("chat_id", "248");///userP.ChatId);
                request.AddParameter("chat_message", chat_message);
                request.AddParameter("user", "1618499868.13709");//userP.UserID);
                request.AddParameter("chat_member_name", "josueprueba Becerra");//userP.NombreVici);

                IRestResponse response = client.Execute(request);
                HttpStatusCode statusCode = response.StatusCode;
                int numericStatusCode = (int)statusCode;
                var objet = response.Content;
                JObject JsonResult = JObject.Parse(response.Content);

                var message = JsonResult["message"];
                var numMessage = message["numMessage"];
                GetUser.IdMensaje = numMessage.ToString();


            }
            catch (Exception e)
            {
                var reuslt = e.Message;

                //throw;
            }

        }

        public ArrayList GetMessages()
        {

            try
            {
                ArrayList respuestas = new ArrayList();
                for (int i = 0; i < 100; i++)
                {
                    Thread.Sleep(2000);

                    var user = new UsuarioVicidial(); //Este tien que ser un User de seccion (UserProfile).

                    var client = new RestClient("http://localhost:8080/chatvicidial/Chat/leerMensajes");
                    client.Timeout = -1;

                    var request = new RestRequest(Method.POST);
                    request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                    request.AddParameter("chat_id", "248");// GetUser.ChatId);
                    request.AddParameter("user", "1618499868.13709"); //GetUser.UserID);
                    request.AddParameter("group_id", "ChatTest");

                    if (user != null && GetUser.IdMensaje != null)
                    {
                        request.AddParameter("idMensaje", GetUser.IdMensaje);
                    }


                    IRestResponse response = client.Execute(request);
                    Console.WriteLine(response.Content);
                    HttpStatusCode statusCode = response.StatusCode;
                    int numericStatusCode = (int)statusCode;
                    var objet = response.Content;
                    Root myDeserializedClass = new Root();

                    if (numericStatusCode == 200)
                    {

                        JObject JsonResult = JObject.Parse(objet);
                        var infoGeneral = JsonResult["infoGeneral"];
                        var statusChat = infoGeneral["statusChat"].ToString();

                        if (!statusChat.Contains("cerrado") && !statusChat.Contains("espera"))
                        {


                            var array = JsonResult["message"];
                            var cont = array.Count();
                            if (cont != 0)
                            {
                                myDeserializedClass = JsonConvert.DeserializeObject<Root>(objet);
                                user.idMensaje = myDeserializedClass.message.Select(x => x.id).Last(); ;
                                GetUser.IdMensaje = myDeserializedClass.message.Select(x => x.id).Last();
                            }
                            else
                            {

                                myDeserializedClass.title = JsonResult["title"].ToString();
                                myDeserializedClass.infoGeneral = JsonConvert.DeserializeObject<InfoGeneral>(JsonResult["infoGeneral"].ToString());

                            }

                        }
                        else
                        {
                            myDeserializedClass.title = JsonResult["title"].ToString();
                            myDeserializedClass.infoGeneral = JsonConvert.DeserializeObject<InfoGeneral>(JsonResult["infoGeneral"].ToString());
                        }
                        var messa = myDeserializedClass.message;
                       // ArrayList respuestas = new ArrayList();
                        if (messa != null)
                        {
                            foreach (var item in messa)
                            {
                                //ArrayList respuestas = new ArrayList();
                                var from = item.from.id;
                                if (from != GetUser.UserID)
                                {
                                    respuestas.Add(item.text);
                                }

                            }
                        }
                        if (respuestas.Count != 0)
                        {
                            return respuestas;
                        }



                    }
                    else
                    {
                        //return myDeserializedClass;

                    }
                    //return null;

                }
                respuestas.Add("Tiempo de espera termina el agente no respondio");
                return respuestas;
            }
            catch (Exception)
            {

                throw;
            }


        }

        public UserProfile userProfile()
        {
            return GetUser;

        }

        public void SetUserProfile(UserProfile userProfile)
        {
            GetUser = userProfile;

        }
    }
}