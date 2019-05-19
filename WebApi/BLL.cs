using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi
{
    public class BLL
    {
        private ForumContext context;

        public BLL(ForumContext con)
        {
            context = con;
        }

        public int checkCountLike(int id)
        {
            return context.Likes.Where(i => i.PostId == id).Count();
        }
    }
}
