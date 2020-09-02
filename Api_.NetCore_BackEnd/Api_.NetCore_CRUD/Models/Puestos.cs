using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api_.NetCore_CRUD.Models
{
    public class Puestos
    {
        [Key]
        public int id_puesto { get; set; }
        public string puesto { get; set; }
    }
}
