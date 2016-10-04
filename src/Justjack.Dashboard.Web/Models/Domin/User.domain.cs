using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Justjack.Dashboard.Models
{
    public partial class User
    {
        private static string HashPassword(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return null;
            }

            var plainStr = username + password;
            var hashedStr = Utilities.GetMd5Hash(plainStr);
            return hashedStr.Substring(8, 16) + hashedStr.Substring(0, 8) + hashedStr.Substring(24);
        }

        public static User Verify(JustjackContext db, string username, string password, out string msg)
        {
            //get user
            var hasedPwd = HashPassword(username, password);
            User user = db.Users.FirstOrDefault(u => u.LoginCode.Equals(username) && u.Password.Equals(hasedPwd) && u.Status == 1);
            if (user == null)
            {
                msg = "Please check your entries and try again.";
                return null;
            }else if(!user.Password.Equals(password) || !user.LoginCode.Equals(username))
            {
                msg = "Please check your entries and try again.";
                return null;
            }
            else if (!"manager".Equals(user.Type))
            {
                msg = "You have no authority to access the Dashboard.";
                return null;
            }
            else
            {
                msg = "Succeed";
                return user;
            }
        }
    }
}
