using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Justjack.Dashboard.Models
{
    public class OverallSellingRow
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public int Orders { get; set; }
        public string UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string Amount { get; set; }
    }

    public class SingleSellingRow
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string OrderCode { get; set; }
        public string PaidTime { get; set; }
    }

    public class Reporter
    {
        public static IList<OverallSellingRow> Selling(JustjackContext db, DateTime? from, DateTime? to)
        {
            var orderProducts = db.OrderProducts.Include(p => p.Order).Where(p => p.Order.PaidDateTime != null);
            if (from != null)
            {
                orderProducts = orderProducts.Where(p => p.Order.PaidDateTime.Value.Date >= from.Value.Date);
            }
            if (to != null)
            {
                orderProducts = orderProducts.Where(p => p.Order.PaidDateTime.Value.Date <= to.Value.Date);
            }

            var productGroups = orderProducts.GroupBy(p => new
            {
                Code = p.Code,
                Name = p.Name,
                UnitPrice = p.Price
            });

            var result = productGroups.Select(g => new OverallSellingRow()
            {
                Code = g.Key.Code,
                Name = g.Key.Name,
                Orders = g.Count(),
                UnitPrice = g.Key.UnitPrice.ToString("C"),
                Quantity = g.Sum(p => p.Number),
                Amount = g.Sum(p => p.Price).ToString("C")
            })
            .OrderBy(r => r.Code).ToList();

            return result;
        }

        public static IList<SingleSellingRow> Selling(JustjackContext db, string keyword, DateTime? from, DateTime? to,
            ref string msgType, ref string msg)
        {
            IList<SingleSellingRow> result = new List<SingleSellingRow>();
            if (string.IsNullOrEmpty(keyword))
            {
                msgType = "error";
                msg = "please entry a product code or name.";
                return result;
            }

            var orderProducts = db.OrderProducts.Include(p => p.Order).Where(p => p.Order.PaidDateTime != null);

            if (from != null)
            {
                orderProducts = orderProducts.Where(p => p.Order.PaidDateTime.Value.Date >= from.Value.Date);
            }
            if (to != null)
            {
                orderProducts = orderProducts.Where(p => p.Order.PaidDateTime.Value.Date <= to.Value.Date);
            }

            orderProducts = orderProducts.Where(p => p.Code.Equals(keyword) || p.Name.Contains(keyword));
            var productGroups = orderProducts.GroupBy(p => new
            {
                Code = p.Code
            });

            int grpCount = 0;

            grpCount = productGroups.Count();
            if (grpCount > 0)
            {
                result = productGroups.FirstOrDefault().Select(p => new SingleSellingRow()
                {
                    Code = p.Code,
                    Name = p.Name,
                    UnitPrice = p.Price.ToString("C"),
                    Quantity = p.Number,
                    OrderCode = p.OrderCode,
                    PaidTime = p.Order.PaidDateTime?.ToString("dd/MM/yyyy HH:mm:ss")
                }).OrderBy(p => p.OrderCode).ToList();
            }

            if (grpCount > 1)
            {
                msgType = "warning";
                msg = string.Format("{0} product matched, the first was displayed", grpCount);
            }

            return result;
        }
    }
}
