CREATE PROCEDURE [dbo].[sprGetItems]
AS
	SELECT
		I.ItemID AS id,
		I.ItemName AS [Name],
		I.ItemImageURL AS ImageUrl,
		I.ItemDescription AS [Description],
		I.ItemCost AS Cost,
		US.CompanyName AS SupplierName
	FROM Item I
	INNER JOIN SupplierItems SI ON I.ItemID = SI.ItemID
	INNER JOIN UserSupplier US ON SI.UserName = US.UserName
RETURN
