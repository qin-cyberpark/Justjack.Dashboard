using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Justjack.Dashboard.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Justjack.Dashboard.Web.Controllers
{
    public class QueryController : Controller
    {
        private JustjackContext _db;
        public QueryController(JustjackContext context)
        {
            _db = context;
        }

        /// <summary>
        /// query
        /// </summary>
        /// <returns></returns>
        [Route("/query/selling/overall")]
        public IActionResult Selling([FromQuery(Name = "f")]DateTime? dtFrom, [FromQuery(Name = "t")]DateTime? dtTo)
        {
            var result = Reporter.Selling(_db, dtFrom, dtTo);
            return new OkObjectResult(new ApiResult<IList<OverallSellingRow>>(true) { Data = result });
        }

        [Route("/query/selling/single")]
        public IActionResult Selling([FromQuery(Name = "k")]string keyword, [FromQuery(Name = "f")]DateTime? dtFrom, [FromQuery(Name = "t")]DateTime? dtTo)
        {
            string msgType = null, msg = null;
            var result = Reporter.Selling(_db, keyword, dtFrom, dtTo, ref msgType, ref msg);
            return new OkObjectResult(new ApiResult<IList<SingleSellingRow>>(true) { Data = result, ErrorType = msgType, Message = msg });
        }
    }
}
