using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace WebApi.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            Posts = new HashSet<Post>();
            Themes = new HashSet<Theme>();
            Likes = new HashSet<Like>();
        }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Theme> Themes { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
    }
}
