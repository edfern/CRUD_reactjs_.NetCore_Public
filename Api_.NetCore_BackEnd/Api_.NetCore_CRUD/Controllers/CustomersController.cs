using Api_.NetCore_CRUD.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Linq;
using System.Threading.Tasks;

namespace Api_.NetCore_CRUD.Controllers
{
    [Route("api/[controller]")]
    public class Customers : Controller 
    {
        private Conection conection;
        public Customers()
        {
            conection = Conectar.Create();
        }

        [HttpGet]
        public ActionResult getCustomers()
        {
            return Ok(conection.Clientes.ToArray());
        }

        [HttpGet("{id}")]
        public ActionResult getCustomer(int id)
        {
            var customer = conection.Clientes.SingleOrDefault(a => a.id_cliente == id);
            if (customer != null)
            {
                return Ok(customer);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult setCustomer([FromBody] Clientes cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                conection.Clientes.Add(cliente);
                conection.SaveChanges();
                return Created("api/customers", cliente);
            }
        }

        [HttpPut("{id}")]
        public ActionResult putCustomer(int id, [FromBody] Clientes cliente)
        {
            var customerR = conection.Clientes.SingleOrDefault(a => a.id_cliente == id);
            if (customerR != null && ModelState.IsValid)
            {
                conection.Entry(customerR).CurrentValues.SetValues(cliente);
                conection.SaveChanges();
                return getCustomers();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult deletCustomer(int id)
        {
            var customer = conection.Clientes.SingleOrDefault(a => a.id_cliente == id);
            if (customer != null)
            {
                conection.Clientes.Remove(customer);
                conection.SaveChanges();
                return getCustomers();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
