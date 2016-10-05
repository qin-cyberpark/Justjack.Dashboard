using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Justjack.Dashboard.Models;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Justjack.Dashboard.Web.Controllers
{
    public class HomeController : Controller
    {
        private JustjackContext _db;
        public HomeController(JustjackContext context)
        {
            _db = context;
        }

        /// <summary>
        /// login api
        /// </summary>
        /// <param name="vm"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Login(LoginVM vm)
        {
            string msg;
            //verify account
            var user = Models.User.Verify(_db, vm.Username, vm.Password, out msg);
            if (user == null)
            {
                //login failed
                return new OkObjectResult(new ApiResult<bool>(false) { Message = msg });
            }
            else
            {
                //set user
                var identity = new ClaimsIdentity("password");
                identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.LoginCode));
                identity.AddClaim(new Claim(ClaimTypes.Name, user.LoginCode));
                identity.AddClaim(new Claim(ClaimTypes.Role, user.Type));

                var pricipal = new ClaimsPrincipal(identity);

                await HttpContext.Authentication.SignInAsync("MyCookieMiddlewareInstance", pricipal);

                //login succeed
                return new OkObjectResult(new ApiResult<bool>(true) { Message = msg });
            }
        }

        [HttpPost]
        public async Task<IActionResult> SignOut()
        {
            await HttpContext.Authentication.SignOutAsync("MyCookieMiddlewareInstance");
            return new OkObjectResult(new ApiResult<string>(true) { Data = "/pages/login.html" });
        }

        [Authorize(Roles = "manager")]
        public IActionResult Index()
        {
            var user = Models.User.FindById(_db, User.Identity.Name);
            if (user == null)
            {
                Redirect("/pages/login.html");
            }
            ViewData["User"] = user;
            return View();
        }
    }
}
