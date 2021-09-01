create table towns(
  code varchar(3) UNIQUE NOT NULL PRIMARY KEY,
  town varchar(100) NOT NULL
);

create table registration_numbers(
  reg_number varchar(9) UNIQUE NOT NULL PRIMARY KEY,
  code varchar(3) NOT NULL REFERENCES towns(code)
);

INSERT INTO towns (code,town) VALUES ('CA', 'Cape Town');
INSERT INTO towns (code,town) VALUES ('CF',	'Kuils River, Brackenfell, Kraaifontein');
INSERT INTO towns (code,town) VALUES ('CG',	'Oudtshoorn');
INSERT INTO towns (code,town) VALUES ('CJ',	'Paarl');
INSERT INTO towns (code,town) VALUES ('CK',	'Malmesbury & Darling');
INSERT INTO towns (code,town) VALUES ('CL',	'Stellenbosch & Franschhoek');
INSERT INTO towns (code,town) VALUES ('CN',	'Wellington');
INSERT INTO towns (code,town) VALUES ('CO',	'Calitzdorp');
INSERT INTO towns (code,town) VALUES ('CR',	'Hopefield, Langebaan & Langebaan Road');
INSERT INTO towns (code,town) VALUES ('CS',	'Bredasdorp & Napier');
INSERT INTO towns (code,town) VALUES ('CT',	'Ceres');
INSERT INTO towns (code,town) VALUES ('CV',	'Vredendal');
INSERT INTO towns (code,town) VALUES ('CW',	'Worcester, De Doorns & Touws River');
INSERT INTO towns (code,town) VALUES ('CX',	'Knysna, Sedgefield & Plettenberg Bay');
INSERT INTO towns (code,town) VALUES ('CY',	'Bellville, Durbanville, Parow, Goodwood');
INSERT INTO towns (code,town) VALUES ('CZ',	'Beaufort West');
INSERT INTO towns (code,town) VALUES ('CAA', 'Cape Town');
INSERT INTO towns (code,town) VALUES ('CAM', 'Caledon & Kleinmond');
INSERT INTO towns (code,town) VALUES ('CAR', 'Clanwilliam, Lambert''s Bay, Citrusdal, Graafwater');
INSERT INTO towns (code,town) VALUES ('CAW', 'George');
INSERT INTO towns (code,town) VALUES ('CAG',  'George');
INSERT INTO towns (code,town) VALUES ('CBL',	'Ladismith');
INSERT INTO towns (code,town) VALUES ('CBM',	'Laingsburg');
INSERT INTO towns (code,town) VALUES ('CBR',	'Montagu');
INSERT INTO towns (code,town) VALUES ('CBS',	'Mossel Bay & Hartenbos');
INSERT INTO towns (code,town) VALUES ('CBT',	'Murraysburg');
INSERT INTO towns (code,town) VALUES ('CBY',	'Piketberg');
INSERT INTO towns (code,town) VALUES ('CCA',	'Prince Albert');
INSERT INTO towns (code,town) VALUES ('CCC',	'Riversdale & Stilbaai');
INSERT INTO towns (code,town) VALUES ('CCD',	'Robertson & McGregor');
INSERT INTO towns (code,town) VALUES ('CCK',	'Swellendam & Barrydale');
INSERT INTO towns (code,town) VALUES ('CCM',	'Tulbagh');
INSERT INTO towns (code,town) VALUES ('CCO',	'Uniondale');
INSERT INTO towns (code,town) VALUES ('CCP',	'Van Rhynsdorp');
INSERT INTO towns (code,town) VALUES ('CEA',	'Moorreesburg');
INSERT INTO towns (code,town) VALUES ('CEG',	'Heidelberg');
INSERT INTO towns (code,town) VALUES ('CEM',	'Hermanus, Gansbaai, Onrus River & Stanford');
INSERT INTO towns (code,town) VALUES ('CEO',	'Grabouw & Elgin');
INSERT INTO towns (code,town) VALUES ('CER',	'Bonnievale');
INSERT INTO towns (code,town) VALUES ('CES',	'Albertinia');
INSERT INTO towns (code,town) VALUES ('CEX',	'Porterville');
INSERT INTO towns (code,town) VALUES ('CEY',	'Strand & Gordon''s Bay');
INSERT INTO towns (code,town) VALUES ('CFA',	'Wolseley');
INSERT INTO towns (code,town) VALUES ('CFG',	'Vredenburg, Saldanha & St Helena Bay');
INSERT INTO towns (code,town) VALUES ('CFM',	'Somerset West');
INSERT INTO towns (code,town) VALUES ('CFP',	'Velddrif & Laaiplek');
INSERT INTO towns (code,town) VALUES ('CFR',	'Kuils River & Brackenfell');
INSERT INTO towns (code,town) VALUES ('CCT',	'Cape Town municipal vehicles');