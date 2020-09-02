using Api_.NetCore_CRUD.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_.NetCore_CRUD.Controllers
{
    [Route("api/[controller]")]
    public class Employees : Controller
    {
        private Conection conection;
        public Employees()
        {
            conection = Conectar.Create();
        }

        [HttpGet]
        public ActionResult getEmployees()
        {
            try
            {
                return Ok(conection.Empleados.ToArray());
            } catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            
        }
        [HttpGet("{id}")]
        public ActionResult getEmployee(int id)
        {

            try
            {
                var employee = conection.Empleados.SingleOrDefault(a => a.id_empleado == id);
                return Ok(employee);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);

            }

        }
        [HttpPost]
        public ActionResult setEmployee([FromBody] Empleados empleado)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                conection.Empleados.Add(empleado);
                conection.SaveChanges();
                return Created("api/employees", empleado);
            }
        }
        [HttpPut("{id}")]
        public ActionResult putEmployee(int id, [FromBody] Empleados empleado)
        {
            var empleadoR = conection.Empleados.SingleOrDefault(a => a.id_empleado == id);
            if (empleadoR != null && ModelState.IsValid)
            {
                conection.Entry(empleadoR).CurrentValues.SetValues(empleado);
                conection.SaveChanges();
                return getEmployees();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult deletEmployee(int id)
        {
            var empleado = conection.Empleados.SingleOrDefault(a => a.id_empleado == id);
            if (empleado != null)
            {
                conection.Empleados.Remove(empleado);
                conection.SaveChanges();
                return getEmployees();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
