using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Justjack.Dashboard.Models
{
    [Table("jk_order")]
    public partial class Order
    {
        public Order()
        {
            Products = new HashSet<OrderProduct>();
        }
        [Key]
        [Column("ORDER_CODE")]
        public string Code { get; set; }

        [Column("SHOP_CODE")]
        public string ShopCode { get; set; }

        [Column("SHOP_NAME")]
        public string ShopName { get; set; }

        [Column("ORDER_MONEY")]
        public decimal OrderMoney { get; set; }

        [Column("FAV_MONEY")]
        public decimal? FavMoney { get; set; }

        [Column("REALITY_MONEY")]
        public decimal RealityMoney { get; set; }

        [Column("ADD_DATETIME")]
        public DateTime AddedDateTime { get; set; }

        [Column("PAY_DATE")]
        public DateTime? PaidDateTime { get; set; }

        [Column("SOURCE")]
        public string Source { get; set; }

        [Column("ADD_UID")]
        public string AddedUserId { get; set; }

        [Column("PAY_TYPE")]
        public string PaymentType { get; set; }

        [Column("PAY_STATUS")]
        public int? PaymentStatus { get; set; }

        [Column("ORDER_STATUS")]
        public int OrderStatus { get; set; }

        [Column("ARRIVAL_START_DATETIME")]
        public DateTime? ArrivalStartDateTime { get; set; }

        [Column("ARRIVAL_END_DATETIME")]
        public DateTime? ArrivalEndDateTime { get; set; }

        [Column("DELIVER_NAME")]
        public string DeliveryManName { get; set; }

        [Column("DELIVER_TEL")]
        public string DeliveryManPhone { get; set; }

        [Column("DELIVER_MOBLIE")]
        public string DeliveryManMobile { get; set; }

        [Column("POST_CODE")]
        public string PostCode { get; set; }

        [Column("ADDR")]
        public string Address { get; set; }

        [Column("FARE_MONEY")]
        public decimal FareMoney { get; set; }

        [Column("REMARK")]
        public string Remark { get; set; }

        [Column("CANCEL_REASON")]
        public string CancelReason { get; set; }

        [Column("READ_STATUS")]
        public string ReadStatus { get; set; }

        [Column("SEND_DATETIME")]
        public DateTime? SendDateTime { get; set; }

        [Column("USE_COUPON_MONEY")]
        public decimal? UseCouponMoney { get; set; }

        [Column("SEND_CODE")]
        public int? SendCode { get; set; }

        [Column("SEND_NAME")]
        public string SendName { get; set; }

        [Column("COUPON_CODE")]
        public string CouponCode { get; set; }

        [Column("SEND_PHONE")]
        public string SendPhone { get; set; }

        [Column("IS_DEL")]
        public int? IsDeleted { get; set; }

        [Column("PAYMENT_URL")]
        public string PaymentUrl { get; set; }

        public virtual ICollection<OrderProduct> Products { get; set; }
    }
}
