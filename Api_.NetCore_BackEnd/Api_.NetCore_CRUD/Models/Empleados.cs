using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api_.NetCore_CRUD.Models
{
    public class Empleados
    {
        [Key]
        public int id_empleado { get; set; }
        public string codigo { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
        public int id_puesto { get; set; }
        public string fecha_nac { get; set; }
    }
}
