using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;
using WebApi.DAL;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class ThemeController : ControllerBase
        {
            private readonly IThemeRepos themeRepos;
            //private readonly ForumContext _context;

            //public ThemeController(ForumContext context)
            //{
            //    _context = context;
            ////if (_context.Themes.Count() == 0)
            ////{
            ////    _context.Themes.Add(new Theme { Name = "Новая тема", Author = "t@gmail.com"});
            ////    _context.SaveChanges();
            ////}
            //}

            public ThemeController(IThemeRepos themeRepos)
            {
                this.themeRepos = themeRepos;
            }

            [HttpGet]
            public IEnumerable<Theme> GetAll()
            {
                //return _context.Themes.Include(p => p.Posts);
                return themeRepos.GetAllThemes();
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetTheme([FromRoute] int id)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                //var theme = await _context.Themes.SingleOrDefaultAsync(m => m.Id == id);
                var theme = await themeRepos.GetThemeById(id);
                if (theme == null)
                {
                    return NotFound();
                }

                return Ok(theme);
            }

            [HttpPost]
            public async Task<IActionResult> Create([FromBody] Theme theme)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                //theme.User = _context.Users.Find(User.Identity.Name);

                theme.DateTheme = DateTime.Now;
                //theme.Img = _context.Categories.Find(theme.CategoryId).Img;
                theme.Img = themeRepos.FindCategoryImg(theme.CategoryId);
                //_context.Themes.Add(theme);
                themeRepos.AddTheme(theme);
                //await _context.SaveChangesAsync();
                    themeRepos.Save();
                return CreatedAtAction("GetTheme", new { id = theme.Id }, theme);
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Theme theme)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                //var item = _context.Themes.Find(id);
                var item = themeRepos.FindThemeById(id);
                if (item == null)
                {
                    return NotFound();
                }

                //Post p = theme.Post.FirstOrDefault();
                //_context.Post.Add(p);
                if (theme.Name != null)
                    item.Name = theme.Name;
                if (theme.Message != null)
                    item.Message = theme.Message;

                //await _context.SaveChangesAsync();
                themeRepos.Save();
                return NoContent();
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> Delete([FromRoute] int id)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                //var item = _context.Themes.Find(id);
                var item = themeRepos.FindThemeById(id);
                if (item == null)
                {
                    return NotFound();
                }
                //_context.Themes.Remove(item);
                themeRepos.DeleteTheme(item.Id);
                //await _context.SaveChangesAsync();
                themeRepos.Save();
                return NoContent();
            }
        }
}
