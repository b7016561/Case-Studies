﻿using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace API.OAuth
{
    public class JwtTokenBuilder : IJwtTokenBuilder
    {
        private const string SECRET = "CSSD-JWT-secret-key";

        public static SymmetricSecurityKey JwtSecurityKey => new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SECRET));

        private SigningCredentials JwtSigningCredentials => new SigningCredentials(JwtSecurityKey, SecurityAlgorithms.HmacSha256);

        public string Build(string user, string accountType)
        {
            var token = new JwtSecurityToken(claims: CreateClaims(user, accountType), signingCredentials: JwtSigningCredentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private IEnumerable<Claim> CreateClaims(string user, string accountType) => new List<Claim>()
        {
            new Claim("user", user),
            new Claim("account_type", accountType)
        };
    }
}
