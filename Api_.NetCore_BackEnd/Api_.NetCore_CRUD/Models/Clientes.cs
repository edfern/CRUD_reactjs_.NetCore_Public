﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api_.NetCore_CRUD.Models
{
    public class Clientes
    {
        [Key]
        public int id_cliente { get; set;}
        public string nit { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
        public string fecha_nacimiento { get; set; }

    }
}
