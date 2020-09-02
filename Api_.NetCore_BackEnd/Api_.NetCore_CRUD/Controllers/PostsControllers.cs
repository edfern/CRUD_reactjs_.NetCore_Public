using Api_.NetCore_CRUD.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_.NetCore_CRUD.Controllers
{
    [Route("api/[controller]")]
    public class Posts : Controller
    {
        private Conection conection;
        public Posts()
        {
            conection = Conectar.Create();
        }

        [HttpGet]
        public ActionResult getPosts()
        {

            return Ok(conection.Puestos.ToArray());
        }
        [HttpGet("{id}")]
        public ActionResult getPost(int id)
        {
            var post = conection.Puestos.SingleOrDefault(a => a.id_puesto == id);
            if (post != null)
            {
                return Ok(post);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost]
        public ActionResult setPost([FromBody] Puestos puesto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                conection.Puestos.Add(puesto);
                conection.SaveChanges();
                return Created("api/posts", puesto);
            }
        }

        [HttpPut("{id}")]
        public ActionResult putPost(int id, [FromBody] Puestos puesto)
        {
            var postR = conection.Puestos.SingleOrDefault(a => a.id_puesto == id);
            if (postR != null && ModelState.IsValid)
            {
                conection.Entry(postR).CurrentValues.SetValues(puesto);
                conection.SaveChanges();
                return getPosts();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult deletPost(int id)
        {
            var post = conection.Puestos.SingleOrDefault(a => a.id_puesto == id);
            if (post != null)
            {
                conection.Puestos.Remove(post);
                conection.SaveChanges();
                return getPosts();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
