CREATE PROCEDURE [dbo].[sprGetQuote]
	@quoteID VARCHAR(20)
AS
	SELECT * FROM [Quote]
	WHERE QuoteID = @quoteID
RETURN
