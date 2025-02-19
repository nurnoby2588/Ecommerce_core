using System.Data;
using System.Data.SqlClient;

namespace Ecommerce_core.Models
{
    public class Account
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }

        public static List<Account> listUser()
        {
            List<Account> lstUser = new List<Account>();
            DataTable dataTable = new DataTable();

            string ConnString = DBConnection.getDBConstring();

            SqlConnection connection = new SqlConnection(ConnString);
            connection.Open();

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = connection;
            cmd.CommandText = "dbo.spOst_lstMember";
            cmd.Parameters.Clear();
            //cmd.Parameters.Add(new SqlParameter("@UserName", this.UserName));
            //cmd.Parameters.Add(new SqlParameter("@Password", this.Password));
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.CommandTimeout = 0;


            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dataTable);
            cmd.Dispose();
            connection.Close();
            // link u sintex



            if (dataTable.Rows.Count > 0)
            {
                var pData = (from p in dataTable.AsEnumerable()
                            // where p.Field<string>("Name") == this.UserName && p.Field<string>("Password") == this.Password
                             select new
                             {
                                 UserName = p.Field<string>("Name"),
                                 Role = p.Field<string>("ServiceType")

                             }).ToList();
                foreach (var obj in pData)
                {
                    Account account = new Account();
                    account.UserName = obj.UserName;
                    account.Role = obj.Role;
                    lstUser.Add(account);
                }
                
            }
            return lstUser;

        }
    }
}
