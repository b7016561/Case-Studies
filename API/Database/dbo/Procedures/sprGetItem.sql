﻿CREATE PROCEDURE [dbo].[sprGetItem]
	@itemID VARCHAR(20)
AS
	SELECT * FROM [Item]
	WHERE ItemID = @itemID
RETURN
