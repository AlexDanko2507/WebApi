using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Category
    {
        public Category()
        {
            Themes = new HashSet<Theme>();
            //Categorys = new HashSet<Category>();
        }

        public int Id { get; set; }
        //public int? ThemeId { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        //public virtual Theme Theme { get; set; }
        public virtual ICollection<Theme> Themes { get; set; }
    }
}
