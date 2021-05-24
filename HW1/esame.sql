-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 24, 2021 alle 21:23
-- Versione del server: 10.4.18-MariaDB
-- Versione PHP: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `esame`
--

DELIMITER $$
--
-- Procedure
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `P1` ()  begin
drop temporary table if exists temp;
create temporary table temp(ncopia integer);
insert into temp
select ncopia
from videogiochi
where costo >= all(
select costo
from videogiochi);

select * from temp;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `P2` (IN `c` VARCHAR(255))  begin
drop temporary table if exists temp;
create temporary table temp(cf varchar(255),
nome varchar(255),
lavora boolean,
inizioimpiego date,
fineimpiego date);
insert into temp
select I.cf,I.nome,A.tipo,A.inizio_imp,A.fine_imp
from (impiegato I join assunzione A on I.cf=A.impiegato) JOIN sede s ON s.codice=a.sede AND s.negozio=a.negozio
where I.cf in(select A1.impiegato
from assunzione A1 join sede S
where A1.sede=S.codice and A1.negozio=S.negozio and citta=c
) AND s.citta=c;
select * from temp;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `p3` (IN `i` INTEGER)  begin
if exists (select * from  prodotto where id=i)
then
    update prodotto set costo=
   case
      when ((select costo from prodotto where id=i) between 40 and 70) then costo - costo*0.15
      when ((select costo from prodotto where id=i)  >= 70) then costo-costo*0.3
      else costo
      end 
    where id=i;
end if;
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `P4` ()  begin
drop temporary table if exists tmp;
create temporary table tmp(anno integer, mediaStipendio float);
insert into tmp
select eta, avg(stipendio_m)
from impiegato
group by eta;

select * from tmp;
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `acquistato`
--

CREATE TABLE `acquistato` (
  `nome` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `acquistato`
--

INSERT INTO `acquistato` (`nome`, `id`) VALUES
('carmelo', '3'),
('luca', '1'),
('luca', '3');

-- --------------------------------------------------------

--
-- Struttura della tabella `assunzione`
--

CREATE TABLE `assunzione` (
  `sede` int(11) NOT NULL,
  `negozio` int(11) NOT NULL,
  `impiegato` varchar(16) NOT NULL,
  `tipo` tinyint(1) DEFAULT NULL,
  `inizio_imp` date NOT NULL,
  `fine_imp` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `assunzione`
--

INSERT INTO `assunzione` (`sede`, `negozio`, `impiegato`, `tipo`, `inizio_imp`, `fine_imp`) VALUES
(1, 1, '1234', 0, '2016-05-22', '2019-07-24'),
(1, 1, '1234', 1, '2020-07-28', '0000-00-00'),
(2, 1, '1234', 0, '2019-07-27', '2020-07-26');

-- --------------------------------------------------------

--
-- Struttura della tabella `carrello`
--

CREATE TABLE `carrello` (
  `nome` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  `quantita` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `carrello`
--

INSERT INTO `carrello` (`nome`, `id`, `quantita`) VALUES
('carmelo', '2', 1),
('luca', '2', 1),
('luca', '3', 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `cliente`
--

CREATE TABLE `cliente` (
  `cf` varchar(16) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `cliente`
--

INSERT INTO `cliente` (`cf`, `nome`, `password`) VALUES
('1111', 'luca', '$2y$10$EQ4cncxfFlMMP1b10bgh4O46C3/CUi2O9DtL7h0jNGRCowED7s8ee'),
('2222', 'carmelo', '$2y$10$1t2UrBZyI7zvgNNDZ7oI/uauVq5kMTCIXXr9DkwsrKZbBAhPdBn7a');

-- --------------------------------------------------------

--
-- Struttura della tabella `copia`
--

CREATE TABLE `copia` (
  `codice` int(11) NOT NULL,
  `gioco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `copia`
--

INSERT INTO `copia` (`codice`, `gioco`) VALUES
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(19, 3),
(20, 3),
(21, 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `film`
--

CREATE TABLE `film` (
  `id` int(11) NOT NULL,
  `titolo` varchar(255) DEFAULT NULL,
  `genere` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `gioco`
--

CREATE TABLE `gioco` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `console` varchar(255) DEFAULT NULL,
  `immagine` varchar(1024) DEFAULT NULL,
  `descrizione` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `gioco`
--

INSERT INTO `gioco` (`id`, `nome`, `console`, `immagine`, `descrizione`) VALUES
(1, 'The Witcher 3', '-PS4', 'http://images.esellerpro.com/2365/I/183/85/PS4WI01.jpg', 'The Witcher 3: Wild Hunt è un videogioco action RPG del 2015'),
(2, 'Animal Crossing', '-SWITCH', 'https://freenintendoswitch.com/wp-content/uploads/2019/12/ACNewHorizonsTempLarge.jpg', 'Animal Crossing è una serie di videogiochi simulatori di vita sviluppati da Nintendo EAD e pubblicati da Nintendo a partire dal 2001.'),
(3, 'Returnal', '-PS5', 'https://www.gamingtalker.it/wp-content/uploads/2020/09/returnal-cover-art.jpg', 'Returnal è un videogioco sparatutto in terza persona horror psicologico in corso di sviluppo da Housemarque, pubblicato da Sony Interactive Entertainment per PlayStation 5 il 30 aprile 2021.');

-- --------------------------------------------------------

--
-- Struttura della tabella `impiegato`
--

CREATE TABLE `impiegato` (
  `cf` varchar(16) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `stipendio_m` int(11) DEFAULT NULL,
  `stipendio_a` int(11) DEFAULT NULL,
  `eta` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `impiegato`
--

INSERT INTO `impiegato` (`cf`, `nome`, `stipendio_m`, `stipendio_a`, `eta`, `password`) VALUES
('1234', 'mario', 5833, 70000, 21, '1234'),
('4567', 'leandro', 4167, 50000, 22, '4567');

--
-- Trigger `impiegato`
--
DELIMITER $$
CREATE TRIGGER `ASSEGNA_MENSILITA` BEFORE INSERT ON `impiegato` FOR EACH ROW begin
set new.stipendio_m=new.stipendio_a/12;
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `max_stipendio` BEFORE INSERT ON `impiegato` FOR EACH ROW begin
if (new.stipendio_a>100000)
then signal sqlstate'45000' set message_text='un impiegato può guadagnare al massimo 100000';
end if;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `negozi`
--

CREATE TABLE `negozi` (
  `id_negozio` int(11) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `indirizzo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `negozi`
--

INSERT INTO `negozi` (`id_negozio`, `telefono`, `indirizzo`) VALUES
(1, 957867471, 'Contrada Valcorrente 23'),
(2, 950938199, 'Piazza Stesicoro 54');

-- --------------------------------------------------------

--
-- Struttura della tabella `preferiti`
--

CREATE TABLE `preferiti` (
  `nome` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `preferiti`
--

INSERT INTO `preferiti` (`nome`, `id`) VALUES
('123', '3'),
('carmelo', '2'),
('lol', '3'),
('luca', '3');

-- --------------------------------------------------------

--
-- Struttura della tabella `prodotto`
--

CREATE TABLE `prodotto` (
  `id` int(11) NOT NULL,
  `costo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `prodotto`
--

INSERT INTO `prodotto` (`id`, `costo`) VALUES
(1, 20),
(2, 43),
(3, 35);

-- --------------------------------------------------------

--
-- Struttura della tabella `sede`
--

CREATE TABLE `sede` (
  `codice` int(11) NOT NULL,
  `negozio` int(11) NOT NULL,
  `citta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `sede`
--

INSERT INTO `sede` (`codice`, `negozio`, `citta`) VALUES
(1, 1, 'Belpasso'),
(2, 1, 'Catania');

-- --------------------------------------------------------

--
-- Struttura della tabella `vendita`
--

CREATE TABLE `vendita` (
  `impiegato` varchar(16) NOT NULL,
  `data` date NOT NULL,
  `ora` time NOT NULL,
  `quantita` int(11) DEFAULT NULL,
  `prodotto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura stand-in per le viste `videogiochi`
-- (Vedi sotto per la vista effettiva)
--
CREATE TABLE `videogiochi` (
`codProd` int(11)
,`costo` int(11)
,`nomegioco` varchar(255)
,`console` varchar(255)
,`ncopia` int(11)
);

-- --------------------------------------------------------

--
-- Struttura per vista `videogiochi`
--
DROP TABLE IF EXISTS `videogiochi`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `videogiochi`  AS SELECT `p`.`id` AS `codProd`, `p`.`costo` AS `costo`, `g`.`nome` AS `nomegioco`, `g`.`console` AS `console`, `c`.`codice` AS `ncopia` FROM ((`prodotto` `p` join `gioco` `g` on(`p`.`id` = `g`.`id`)) join `copia` `c` on(`c`.`gioco` = `g`.`id`)) ;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `acquistato`
--
ALTER TABLE `acquistato`
  ADD PRIMARY KEY (`nome`,`id`);

--
-- Indici per le tabelle `assunzione`
--
ALTER TABLE `assunzione`
  ADD PRIMARY KEY (`sede`,`negozio`,`impiegato`,`inizio_imp`),
  ADD KEY `new_s` (`sede`),
  ADD KEY `new_ne` (`negozio`),
  ADD KEY `new_i` (`impiegato`);

--
-- Indici per le tabelle `carrello`
--
ALTER TABLE `carrello`
  ADD PRIMARY KEY (`nome`,`id`);

--
-- Indici per le tabelle `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cf`);

--
-- Indici per le tabelle `copia`
--
ALTER TABLE `copia`
  ADD PRIMARY KEY (`codice`,`gioco`),
  ADD KEY `new_gi1` (`gioco`);

--
-- Indici per le tabelle `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id`),
  ADD KEY `new_fi` (`id`);

--
-- Indici per le tabelle `gioco`
--
ALTER TABLE `gioco`
  ADD PRIMARY KEY (`id`),
  ADD KEY `new_gi` (`id`);

--
-- Indici per le tabelle `impiegato`
--
ALTER TABLE `impiegato`
  ADD PRIMARY KEY (`cf`);

--
-- Indici per le tabelle `negozi`
--
ALTER TABLE `negozi`
  ADD PRIMARY KEY (`id_negozio`);

--
-- Indici per le tabelle `preferiti`
--
ALTER TABLE `preferiti`
  ADD PRIMARY KEY (`nome`,`id`);

--
-- Indici per le tabelle `prodotto`
--
ALTER TABLE `prodotto`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `sede`
--
ALTER TABLE `sede`
  ADD PRIMARY KEY (`codice`,`negozio`),
  ADD KEY `new_n` (`negozio`);

--
-- Indici per le tabelle `vendita`
--
ALTER TABLE `vendita`
  ADD PRIMARY KEY (`impiegato`,`prodotto`,`data`,`ora`),
  ADD KEY `new_i1` (`impiegato`),
  ADD KEY `new_p1` (`prodotto`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `assunzione`
--
ALTER TABLE `assunzione`
  ADD CONSTRAINT `assunzione_ibfk_1` FOREIGN KEY (`sede`,`negozio`) REFERENCES `sede` (`codice`, `negozio`),
  ADD CONSTRAINT `assunzione_ibfk_2` FOREIGN KEY (`impiegato`) REFERENCES `impiegato` (`cf`);

--
-- Limiti per la tabella `copia`
--
ALTER TABLE `copia`
  ADD CONSTRAINT `copia_ibfk_1` FOREIGN KEY (`gioco`) REFERENCES `prodotto` (`id`);

--
-- Limiti per la tabella `film`
--
ALTER TABLE `film`
  ADD CONSTRAINT `film_ibfk_1` FOREIGN KEY (`id`) REFERENCES `prodotto` (`id`);

--
-- Limiti per la tabella `gioco`
--
ALTER TABLE `gioco`
  ADD CONSTRAINT `gioco_ibfk_1` FOREIGN KEY (`id`) REFERENCES `gioco` (`id`);

--
-- Limiti per la tabella `sede`
--
ALTER TABLE `sede`
  ADD CONSTRAINT `sede_ibfk_1` FOREIGN KEY (`negozio`) REFERENCES `negozi` (`id_negozio`);

--
-- Limiti per la tabella `vendita`
--
ALTER TABLE `vendita`
  ADD CONSTRAINT `vendita_ibfk_1` FOREIGN KEY (`impiegato`) REFERENCES `impiegato` (`cf`),
  ADD CONSTRAINT `vendita_ibfk_2` FOREIGN KEY (`prodotto`) REFERENCES `prodotto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
