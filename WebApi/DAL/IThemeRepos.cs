using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.DAL
{
    public interface IThemeRepos : IDisposable
    {
        IEnumerable<Theme> GetAllThemes();
        Task<Theme> GetThemeById(int id);
        Theme FindThemeById(int id);
        string FindCategoryImg(int? id);
        void AddTheme(Theme theme);
        void UpdateTheme(Theme theme);
        void DeleteTheme(int id);
        void Save();
    }
}
