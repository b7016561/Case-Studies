using API.Helpers.Database;
using API.Models;
using API.OAuth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("CorsPolicy", builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader())
            );

            services.AddControllers();

            services.AddTransient<IStoredProcedureExecutor>(sp =>
            {
                var connection = new SqlConnection(@"Data Source = (localdb)\ProjectsV13;Initial Catalog=Database;");
                return new StoredProcedureExecutor(connection);
            });

            services.AddTransient<IJwtTokenBuilder>(sp => new JwtTokenBuilder());

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuer = false,
                       ValidateAudience = false,
                       ValidateLifetime = false,
                       ValidateIssuerSigningKey = true,

                       IssuerSigningKey = JwtTokenBuilder.JwtSecurityKey
                   };
                   options.Events = new JwtBearerEvents
                   {
                       OnTokenValidated = context =>
                       {
                           // Get token
                           var token = context.SecurityToken as JwtSecurityToken;
                           // Add user context
                           context.HttpContext.Items["user"] = new UserContext(token.Claims);

                           return Task.CompletedTask;
                       }
                   };
               });

            services.AddAuthorization(options => options.AddPolicy("User",
                policy =>
                {
                    policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
                    policy.RequireClaim("user");
                    policy.RequireClaim("account_type");
                })
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
