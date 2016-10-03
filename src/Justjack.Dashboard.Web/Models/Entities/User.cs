using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Justjack.Dashboard.Models
{ 
    [Table("jk_user_info")]
    public partial class User
    {
        [Key]
        [Column("USER_CODE")]
        public int UserCode { get; set; }

        [Column("LOGIN_CODE")]
        public string LoginCode { get; set; }

        [Column("PWD")]
        public string Password { get; set; }

        [Column("SHOP_NAME")]
        public string ShopName { get; set; }

        [Column("USER_NAME")]
        public string Name { get; set; }

        [Column("USER_TYPE")]
        public string Type { get; set; } 

        [Column("STATUS")]
        public int Status { get; set; }
    }
}
