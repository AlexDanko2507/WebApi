using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Data
{
    public class DbInitializer
    {
        public static void Initialize(ForumContext context)
        {
            context.Database.EnsureCreated();

            if (context.Themes.Any())
            {
                return;
            }

            var themes = new Theme[]
            {
                new Theme{Name="Первая"},
                new Theme{Name="Вторая"},
                new Theme{Name="Третья"}
            };
            foreach (Theme t in themes)
            {
                context.Themes.Add(t);
            }
            context.SaveChanges();

            var posts = new Post[]
            {
                new Post { ThemeId=1,Text="Today, we are releasing the .NET Core May 2018 Update. This update includes .NET Core 2.1.200 SDK and ASP.NET Core 2.0.8. Security Microsoft is releasing this security advisory to provide information about a vulnerability in .NET Core and .NET native version 2.0." },
                new Post { ThemeId=2,Text="Today, we are excited to announce that the first release candidate of EF Core 2.1 is available, alongside .NET Core 2.1 RC 1 and ASP.NET Core 2.1 RC 1, for broad testing, and now also for production use! Go live support EF Core 2.1 RC1 is a “go live” release, which means once you test…" }
            };
            foreach (Post p in posts)
            {
                context.Posts.Add(p);
            }
            context.SaveChanges();
            
            foreach (Post p in posts)
            {
                context.Posts.Add(p);
            }
            context.SaveChanges();
        }
    }
}
