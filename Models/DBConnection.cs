namespace Ecommerce_core.Models
{
    public class DBConnection
    {
        public static IConfiguration Configuration { get; set; }
        public static string getDBConstring()
        {
            string strConnection = "";
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            strConnection = Configuration["ConnString"].ToString();
            return strConnection;
        }
    }
}
