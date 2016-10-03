using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Justjack.Dashboard.Models
{
    public class ApiResult<T>
    {
        public ApiResult(bool succeed, T data)
        {
            Succeeded = succeed;
            Data = data;
        }

        public ApiResult(bool succeed)
        {
            Succeeded = succeed;
        }

        public bool Succeeded { get; set; } = true;
        public T Data { get; set; }
        public string ErrorType { get; set; }
        public string Message { get; set; }
        public Exception Exception { get; set; }
    }
}
