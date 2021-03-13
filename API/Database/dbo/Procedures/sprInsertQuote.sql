CREATE PROCEDURE [dbo].[sprInsertQuote]
	@quoteID VARCHAR(20),
	@creationDate DATETIME,
	@preferredDate DATETIME,
	@quoteDesc VARCHAR(MAX),
	@quoteCost FLOAT,
	@quoteStatus VARCHAR(20),
	@userUN VARCHAR(20),
	@supplierUN VARCHAR(20)
AS
	INSERT INTO [Quote] (QuoteID, CreationDate, PreferredDate, QuoteDescription, QuoteCost, QuoteStatus)
	VALUES (@quoteID, @creationDate, @preferredDate, @quoteDesc, @quoteCost, @quoteStatus)
	-- May need GO separators
	INSERT INTO [UserQuotes] (UserUN, SupplierUN, QuoteID)
	VALUES (@userUN, @supplierUN, @quoteID)
RETURN
