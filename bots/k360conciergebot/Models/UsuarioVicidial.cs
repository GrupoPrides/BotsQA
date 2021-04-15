using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace K360ConciergeBot.Models
{
    public class UsuarioVicidial
    {
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string telefono { get; set; }
        public string chat { get; set; }
        public string group_id { get; set; }
        public string user { get; set; }
        public string email { get; set; }
        public string nombrevici { get; set; }
        public string idMensaje { get; set; }

        public UsuarioVicidial()
        {

        }
        public UsuarioVicidial(string user, string nombre, string apellido, string telefono, string chat, string group_id, string email)
        {
            this.user = user;
            this.apellido = apellido;
            this.nombre = nombre;
            this.telefono = telefono;
            this.chat = chat;
            this.group_id = group_id;
            this.email = email;
        }
    }

}
