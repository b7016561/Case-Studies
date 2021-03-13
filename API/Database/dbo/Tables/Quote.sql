CREATE TABLE [dbo].[Quote] (
    QuoteID VARCHAR (15)  NOT NULL PRIMARY KEY,
    CreationDate DATETIME  NOT NULL,
    PreferredDate DATETIME NOT NULL,
    QuoteDescription VARCHAR (MAX) NULL,
    QuoteCost FLOAT NULL,
    QuoteStatus VARCHAR(20) NOT NULL
);