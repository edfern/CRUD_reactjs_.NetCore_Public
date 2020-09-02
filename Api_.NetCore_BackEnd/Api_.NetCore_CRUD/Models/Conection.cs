using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_.NetCore_CRUD.Models
{
    class Conection : DbContext
    {

        public Conection(DbContextOptions<Conection> options) : base(options) { }
        public DbSet<Clientes> Clientes { get; set; }
        public DbSet<Empleados> Empleados { get; set; }
        public DbSet<Puestos> Puestos { get; set; }
    }

    class Conectar
    {
        private const string url = "server=localhost;port=3306;database=db_empresa;userid=user_desarrollo;pwd=fernando";
        public static Conection Create()
        {
            var constructor = new DbContextOptionsBuilder<Conection>();
            constructor.UseMySQL(url);
            var Conection = new Conection(constructor.Options);
            return Conection;
        }
    }
}
