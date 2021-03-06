﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    public class LikeController : Controller
    {
        // GET: api/<controller>
        private readonly ForumContext _context;
        public LikeController(ForumContext context)
        {
            _context = context;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Like> GetAll()
        {
            return _context.Likes; ;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public int Get(int id)
        {
            //return bLL.checkCountLike(id);
            return _context.Likes.Where(i => i.PostId == id).Count();
        }

        // POST api/<controller>
        public async Task<IActionResult> AddLike([FromBody]Like like)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_context.Likes.Where(i => i.PostId == like.PostId).Where(j => j.UserId == like.UserId).Count() == 0)
                _context.Likes.Add(like);
            else
            {
                var item = _context.Likes.Find(_context.Likes.Where(i => i.PostId == like.PostId).Where(j => j.UserId == like.UserId).FirstOrDefault().Id);
                _context.Likes.Remove(item);
            }
            if (like.UserId != null)
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLike", new { id = like.Id }, like);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
