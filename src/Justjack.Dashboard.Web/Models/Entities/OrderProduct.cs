using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Justjack.Dashboard.Models
{
    [Table("jk_order_product_map")]
    public partial class OrderProduct
    {
        [Key]
        [Column("MAP_CODE")]
        public int MapCode { get; set; }

        [Column("ORDER_CODE")]
        public string OrderCode { get; set; }

        [Column("PRODUCT_NAME")]
        public string Name { get; set; }

        [Column("PRODUCT_PRICE")]
        public decimal Price { get; set; }

        [Column("PROMOTION_CODE")]
        public string PromotionCode { get; set; }

        [Column("DISCOUNT_NUM")]
        public float? DiscountNumber { get; set; }

        [Column("PRODUCT_NUM")]
        public int Number { get; set; }

        [Column("PRODUCT_CODE")]
        public string Code { get; set; }

        [Column("PRODUCT_ORIGIN_PRICE")]
        public decimal OriginPrice { get; set; }

        [Column("PRODUCT_IMG")]
        public string Image { get; set; }
        
        [ForeignKey("OrderCode")]
        public virtual Order Order { get; set; }
    }
}
