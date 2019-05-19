using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.DAL
{
    public class ThemeRepos : IThemeRepos, IDisposable
    {
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    try {
                        context.Dispose();
                    }
                    catch (Exception ex)
                    {
                        Log.Write(ex);
                    }
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        private ForumContext context;

        public ThemeRepos(ForumContext con)
        {
            context = con;
        }

        public IEnumerable<Theme> GetAllThemes()
        {
            return context.Themes.Include(p => p.Posts);
        }

        public Task<Theme> GetThemeById(int id)
        {
            return context.Themes.SingleOrDefaultAsync(m => m.Id == id);
        }

        public Theme FindThemeById(int id)
        {
            return context.Themes.Find(id);
        }

        public string FindCategoryImg(int? id)
        {
            return context.Categories.Find(id).Img;
        }

        public void AddTheme(Theme theme)
        {
            context.Themes.Add(theme);
        }

        public void UpdateTheme(Theme theme)
        {

        }

        public void DeleteTheme(int id)
        {
            Theme theme = context.Themes.Find(id);
            context.Themes.Remove(theme);
        }

        public void Save()
        {
            context.SaveChangesAsync();
        }
    }
}
