CREATE PROCEDURE [dbo].[sprInsertUser]
	@Username VARCHAR(20),
	@FirstName VARCHAR(20),
	@LastName VARCHAR(20),
	@Email VARCHAR(20),
	@Password VARCHAR(20)
AS
	INSERT INTO [User] (UserName, FirstName, LastName, Email, UserPassword, AccountType)
	VALUES (@Username, @FirstName, @LastName, @Email, @Password, 'U')
RETURN
