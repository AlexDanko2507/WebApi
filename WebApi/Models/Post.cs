using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Post
    {
        public Post()
        {
            Likes = new HashSet<Like>();
        }
        public int Id { get; set; }
        public int ThemeId { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public string Author { get; set; }
        public virtual User User { get; set; }
        public virtual Theme Theme { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
    }
}
