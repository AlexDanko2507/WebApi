using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Theme
    {
        public Theme()
        {
            Posts = new HashSet<Post>();
            //Categorys = new HashSet<Category>();
        }
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public string Author { get; set; }
        public DateTime DateTheme { get; set; }
        public int Favorite { get; set; }
        public int ?CategoryId { get; set; }
        public string Img { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        //public virtual ICollection<Category> Categorys { get; set; }
        public virtual Category Category { get; set; }
        public virtual User User { get; set; }
    }
}
