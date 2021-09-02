-- Adminer 4.7.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `baskets`;
CREATE TABLE `baskets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `basket_no` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `email` text NOT NULL,
  `items` text NOT NULL,
  `price` float NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `baskets` (`id`, `basket_no`, `type`, `email`, `items`, `price`, `status`) VALUES
(1,	'4df65gh46df54gh65',	'default',	'first@email.com',	'1:1',	250,	1);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `parent` tinytext NOT NULL,
  `name` text NOT NULL,
  `img_main` text NOT NULL,
  `img_thumbnail` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categories` (`id`, `type`, `parent`, `name`, `img_main`, `img_thumbnail`, `active`, `deleted`) VALUES
(1,	'default',	'',	'category.1',	'9pFRwJB.jpeg',	'EyzSmAg_as-archiv.jpeg',	1,	0),
(2,	'gallery',	'',	'gallery',	'Amazon.jpg',	'Amazon.jpg',	0,	0),
(3,	'default',	'1',	'subcategory',	'KdcCeld.jpeg',	'cropped-duck.jpeg',	1,	0);

DROP TABLE IF EXISTS `categories__cs`;
CREATE TABLE `categories__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `perex` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categories__cs` (`id`, `title`, `perex`, `content`) VALUES
(1,	'category 1 cs',	'',	'<p>dfghdfg hdfghjfghj fgh jfghjfghj </p>'),
(2,	'Gallery',	'',	'<p>gfhj fghjfghjfghj</p>'),
(3,	'Subcategory',	'fghj fghjfghjfghj',	'<p>fgd dfh dfghd fghdfghdfg </p>');

DROP TABLE IF EXISTS `categories__en`;
CREATE TABLE `categories__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `perex` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categories__en` (`id`, `title`, `perex`, `content`) VALUES
(1,	'category 1 en',	'',	'<p>dfgh df ghdfg hdfghdfgh </p>'),
(2,	'Gallery',	'',	'<p>gfhj fghjfghjfghj</p>'),
(3,	'Subcategory',	'hjf ghjfghjfghjfghj',	'<p>fgd dfh dfghd fghdfghdfg </p>');

DROP TABLE IF EXISTS `deliveries`;
CREATE TABLE `deliveries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `item_price` float NOT NULL,
  `item_weight_limit` float NOT NULL,
  `img_main` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `deliveries__cs`;
CREATE TABLE `deliveries__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `deliveries__en`;
CREATE TABLE `deliveries__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `distributors`;
CREATE TABLE `distributors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `img_main` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `nickname` text NOT NULL,
  `first_name` text NOT NULL,
  `middle_name` text NOT NULL,
  `last_name` text NOT NULL,
  `member_group` text NOT NULL,
  `member_country` text NOT NULL,
  `member_city` text NOT NULL,
  `member_address` text NOT NULL,
  `member_zip` text NOT NULL,
  `member_phone` text NOT NULL,
  `member_email` text NOT NULL,
  `description` text NOT NULL,
  `img_avatar` longtext NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `members` (`id`, `email`, `password`, `nickname`, `first_name`, `middle_name`, `last_name`, `member_group`, `member_country`, `member_city`, `member_address`, `member_zip`, `member_phone`, `member_email`, `description`, `img_avatar`, `active`, `deleted`) VALUES
(1,	'dfghdfg@jfghjfgh',	'',	'',	'',	'',	'',	'none',	'',	'',	'',	'',	'+420 645 465 465',	'dfghdfghdfg',	'',	'',	1,	0);

DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `parent` varchar(32) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menu` (`id`, `type`, `name`, `parent`, `active`, `deleted`) VALUES
(1,	'primary',	'first-menu',	'',	1,	0),
(2,	'secondary',	'second-menu',	'1',	1,	0);

DROP TABLE IF EXISTS `menuItems`;
CREATE TABLE `menuItems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `link` text NOT NULL,
  `parent` varchar(32) NOT NULL,
  `menu` varchar(32) NOT NULL,
  `item_order` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menuItems` (`id`, `type`, `name`, `link`, `parent`, `menu`, `item_order`, `active`, `deleted`) VALUES
(1,	'default',	'home',	'/',	'',	'1',	0,	1,	0),
(2,	'default',	'about',	'/first-page',	'',	'1',	2,	1,	0),
(3,	'default',	'contact-us',	'/dfghdfghdfg',	'',	'1',	4,	1,	0),
(4,	'default',	'references',	'/first-page',	'',	'1',	0,	1,	0),
(5,	'default',	'home',	'/',	'',	'2',	0,	1,	0),
(6,	'default',	'category-one',	'/dfghdfghdfg',	'',	'2',	0,	1,	0),
(7,	'default',	'category-two',	'/first-page',	'',	'2',	0,	1,	0),
(8,	'default',	'category-three',	'/dfghdfghdfg',	'',	'2',	0,	1,	0),
(9,	'default',	'tag-one',	'/first-page',	'',	'2',	0,	1,	0),
(10,	'external',	'external-link',	'http://google.com',	'',	'2',	0,	1,	0),
(11,	'default',	'category-one',	'/dfghdfghdfg',	'',	'1',	0,	1,	0),
(12,	'default',	'tag-one',	'/first-page',	'',	'1',	100,	1,	0),
(13,	'default',	'sub-1',	'/',	'6',	'2',	0,	1,	0),
(14,	'default',	'sub-sub-1',	'/',	'13',	'2',	0,	1,	0),
(15,	'default',	'sub-sub-sub-1',	'/',	'14',	'2',	0,	1,	0),
(16,	'default',	'reference-1',	'/',	'4',	'1',	0,	1,	0),
(17,	'default',	'reference-2',	'/',	'4',	'1',	0,	1,	0);

DROP TABLE IF EXISTS `menuitems__cs`;
CREATE TABLE `menuitems__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menuitems__cs` (`id`, `title`) VALUES
(1,	'dfgh dfghdfg'),
(2,	'dfghdfghd'),
(3,	'gfh jfghjfgh'),
(4,	'gfhj fghjfgh'),
(5,	'fg hjfghjfgh'),
(6,	'hgjk ghjkgh'),
(7,	'hjkghjkffghf'),
(8,	'dfgsdfg'),
(9,	'hljk lhjklj'),
(10,	'lůjkljkl'),
(11,	'jgh kghjk'),
(12,	'dsfgsdfg'),
(13,	'sub one'),
(14,	'sub sub one'),
(15,	'sub sub sub one'),
(16,	'reference sub 1'),
(17,	'reference sub 2');

DROP TABLE IF EXISTS `menuitems__en`;
CREATE TABLE `menuitems__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menuitems__en` (`id`, `title`) VALUES
(1,	'dfgh dfghdfg'),
(2,	'dfghdfghd'),
(3,	'gfh jfghjfgh'),
(4,	'gfhj fghjfgh'),
(5,	'fg hjfghjfgh'),
(6,	'hgjk ghjkgh'),
(7,	'hjkghjkffghf'),
(8,	'dfgsdfg'),
(9,	'hljk lhjklj'),
(10,	'lůjkljkl'),
(11,	'jgh kghjk'),
(12,	'dsfgsdfg'),
(13,	'sub one'),
(14,	'sub sub one'),
(15,	'sub sub sub one'),
(16,	'reference sub 1'),
(17,	'reference sub 2');

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `sender` text NOT NULL,
  `recipients` text NOT NULL,
  `subject` text NOT NULL,
  `content` text NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `messages` (`id`, `type`, `sender`, `recipients`, `subject`, `content`, `status`) VALUES
(1,	'default',	'sender@sender.com',	'recipient@email.com,recipient2@email.com',	'message 1 subject',	'message 1 content',	1),
(2,	'system',	'sender@email.com',	'recipient@email.com,recipient2@email.com',	'message 2 subject',	'message 2 content',	1);

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_no` text NOT NULL,
  `basket_no` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `member_email` text NOT NULL,
  `member_phone` text NOT NULL,
  `member_name` text NOT NULL,
  `member_country` text NOT NULL,
  `member_city` text NOT NULL,
  `member_address` text NOT NULL,
  `member_zip` text NOT NULL,
  `description` text NOT NULL,
  `delivery` tinytext NOT NULL,
  `payment` tinytext NOT NULL,
  `basket_items` text NOT NULL,
  `price_items` float NOT NULL,
  `price_total` float NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `orders` (`id`, `order_no`, `basket_no`, `type`, `member_email`, `member_phone`, `member_name`, `member_country`, `member_city`, `member_address`, `member_zip`, `description`, `delivery`, `payment`, `basket_items`, `price_items`, `price_total`, `status`) VALUES
(1,	'df5gh46df5g4h6d5f4',	'2ds14fg3s4dfg56',	'default',	'second@email.com',	'+420225445555',	'John Doe',	'Burkina Faso',	'Guagadougou',	'Gjhgjh 465',	'4654654',	'',	'1',	'1',	'1:1',	225,	235,	1);

DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `type_id` tinytext NOT NULL,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `pages` (`id`, `type`, `type_id`, `name`, `active`, `deleted`) VALUES
(1,	'system',	'',	'first-page',	1,	0),
(3,	'category',	'1',	'dfghdfghdfg',	1,	0);

DROP TABLE IF EXISTS `pages__cs`;
CREATE TABLE `pages__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `pages__cs` (`id`, `title`, `content`) VALUES
(1,	'First custom page',	'<p>fg4hj65dfh4jk6f5g 4h65fg4j65fgjg</p>'),
(3,	'dfghdfgh',	'<p>dfg hdfgh dfg sdgsdfgsdfg fg jfghjýárjfghj</p>');

DROP TABLE IF EXISTS `pages__en`;
CREATE TABLE `pages__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `pages__en` (`id`, `title`, `content`) VALUES
(1,	'First custom page',	'<p>fg4hj65dfh4jk6f5g 4h65fg4j65fgjg</p>'),
(3,	'dfghdfgh',	'<p>dfg hdfgh dfg sdgsdfgsdfg</p>');

DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `item_price` float NOT NULL,
  `item_weight_limit` float NOT NULL,
  `img_main` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `payments__cs`;
CREATE TABLE `payments__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `payments__en`;
CREATE TABLE `payments__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `category` text NOT NULL,
  `tags` text NOT NULL,
  `event_start` text NOT NULL,
  `event_end` text NOT NULL,
  `event_location` text NOT NULL,
  `event_address` text NOT NULL,
  `event_country` text NOT NULL,
  `event_city` text NOT NULL,
  `event_zip` text NOT NULL,
  `media` text NOT NULL,
  `post_options` text NOT NULL,
  `attachments` text NOT NULL,
  `img_main` text NOT NULL,
  `img_thumbnail` text NOT NULL,
  `published` text NOT NULL,
  `author` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `authorized` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `posts` (`id`, `type`, `name`, `category`, `tags`, `event_start`, `event_end`, `event_location`, `event_address`, `event_country`, `event_city`, `event_zip`, `media`, `post_options`, `attachments`, `img_main`, `img_thumbnail`, `published`, `author`, `rating`, `authorized`, `active`, `deleted`) VALUES
(1,	'article',	'first-post',	'1',	'2,3,5,6',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'EyzSmAg_as-archiv.jpeg',	'2021-05-31T10:23:00+02:00',	0,	0,	1,	0,	0),
(5,	'reference',	'maps-collection',	'',	'3,4,5',	'',	'',	'',	'',	'',	'',	'',	'MapA12456.jpg,croppedMap.jpg,Amazon.jpg,Map_1000.jpg,Map2002.jpg,ghm-cropped.jpeg,palec.jpg,Amaz.jpg,ghm-test.jpeg,ghm-test-two.jpeg,ghm_test.jpeg,ghm-vyrez.jpeg,dfghdfghdfgh.jpeg,uncropped-map.jpeg,ghm-test-xyyyy.jpeg',	'{\"a\": \"A\", \"b\": 2, \"c\": {\"ca\": \"CA\"}}',	'',	'Amazon.jpg',	'Amazon.jpg',	'2021-05-25T11:23:29+02:00',	0,	5,	0,	1,	0),
(6,	'event',	'event-post',	'',	'2,6',	'2021-07-01T20:45:00+02:00',	'2021-08-01T20:45:00+02:00',	'15.08240605654,37.496381431568',	'fghj fghj fghjfgh 64',	'hjkghjkghj',	'ghjk ghjk',	'1222555',	'KdcCeld.jpeg,gate.jpeg,ujRTM8f.jpeg,EyzSmAg_as-archiv.jpeg',	'',	'dokumente.pdf,test-archiv.zip',	'KdcCeld.jpeg',	'gate.jpeg',	'2021-05-31T10:47:00+02:00',	8,	0,	0,	1,	0),
(7,	'article',	'fgh-fghjfg',	'',	'7',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'2021-05-30T14:06:38+02:00',	0,	0,	1,	1,	0),
(8,	'event',	'hjlhjkl-hjkl-hjk',	'1',	'2,3,4',	'2021-05-30T14:31:15+02:00',	'2021-05-30T14:31:18+02:00',	'14.502990214148,50.075622222451',	'jkgh ghjk ghjk ghjk15',	'hgjkghjk',	'jhklhj kl',	'1258454',	'',	'',	'',	'',	'EyzSmAg_as-archiv.jpeg',	'2021-05-30T14:13:35+02:00',	0,	0,	1,	1,	0),
(9,	'custom_1',	'custom-post',	'2,3',	'5,4,6',	'',	'',	'',	'',	'',	'',	'',	'MapA12456.jpg,Amazon.jpg,croppedMap.jpg',	'',	'',	'MapA12456.jpg',	'MapA12456.jpg',	'2021-05-30T14:33:22+02:00',	8,	0,	0,	1,	0),
(10,	'blog',	'attachment-post',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'dokumente.pdf,dp-ts-2020.pdf',	'',	'',	'2021-05-30T15:55:48+02:00',	8,	0,	0,	1,	0),
(11,	'article',	'dhfgkjdfhg-kjdfghkjfdgh-',	'',	'2,1,4,6',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'2021-06-18T21:04:21+02:00',	8,	0,	0,	1,	0),
(12,	'article',	'hfg-jfghkghjkghj',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'2021-06-18T21:11:26+02:00',	8,	0,	0,	1,	0),
(13,	'article',	'ghk-fhgjkghj-gjkl',	'',	'2,4,3',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'2021-06-18T21:16:27+02:00',	8,	0,	1,	1,	0),
(14,	'article',	'šulinek',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'EyzSmAg_as-archiv.jpeg',	'pluto.jpeg',	'2021-06-18T21:59:56+02:00',	8,	0,	0,	1,	0),
(15,	'article',	'my-last-post',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'',	'dokumente.pdf,test-archiv.zip,dp-ts-2020.pdf,Archiv.zip',	'',	'',	'2021-06-18T22:00:47+02:00',	8,	0,	0,	1,	0);

DROP TABLE IF EXISTS `posts__cs`;
CREATE TABLE `posts__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `perex` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `posts__cs` (`id`, `title`, `perex`, `content`) VALUES
(1,	'Title 1 in english',	'Nulla curae nisi lacinia dictum adipiscing ac lacinia vestibulum vulputate ac tincidunt a ghoptu zadek',	'<p>honcus vestibulum proin a dolor zadek eu felis eu bat\'leth rhoncus dignissim nulla ac tristique. Adanji consectetur tellus nulla eros ante maximus velit baktag eros eu nulla felis ac luctus. A baH venenatis amet dictum morbi ipsum non elit accumsan proin velit iaculis nisi he\' HImaH. Et pellentesque magna et pellentesque pulvinar morbi ac ut primis neque luctus pulvinar phasellus ghoptu.</p>'),
(5,	'English title',	'',	'<p>fg hjfghj fghjfghj</p>'),
(6,	'Event',	'',	'<p>fdsh dfgh dfghdfgh dfg ghfghdfghdfgh</p>'),
(7,	'gfh fgjh kghjk',	'',	''),
(8,	'candy',	'',	''),
(9,	'sugar tits',	'',	''),
(10,	'Attachment',	'',	''),
(0,	'redactors post',	'',	''),
(11,	'redactors post',	'',	''),
(12,	'ghjkhgjkghjkghj k',	'',	''),
(13,	'hjklhjklhjklhjkl',	'',	''),
(14,	'gfhj fghj fghjfg hd fghdfghdfhd',	'',	''),
(15,	'kajdžu',	'',	'');

DROP TABLE IF EXISTS `posts__en`;
CREATE TABLE `posts__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `perex` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `posts__en` (`id`, `title`, `perex`, `content`) VALUES
(1,	'Title 1 in english',	'Nulla curae nisi lacinia dictum adipiscing ac lacinia vestibulum vulputate ac tincidunt a ghoptu zadek',	'<p>honcus vestibulum proin a dolor zadek eu felis eu bat\'leth rhoncus dignissim nulla ac tristique. Adanji consectetur tellus nulla eros ante maximus velit baktag eros eu nulla felis ac luctus. A baH venenatis amet dictum morbi ipsum non elit accumsan proin velit iaculis nisi he\' HImaH. Et pellentesque magna et pellentesque pulvinar morbi ac ut primis neque luctus pulvinar phasellus ghoptu.</p>'),
(5,	'English title',	'',	'<p>fg hjfghj fghjfghj</p>'),
(6,	'Event',	'',	'<p>fdsh dfgh dfghdfgh dfg ghfghdfghdfgh</p>'),
(7,	'gfh fgjh kghjk',	'',	''),
(8,	'candy',	'',	''),
(9,	'sugar tits',	'',	''),
(10,	'Attachment',	'',	''),
(0,	'redactors post',	'',	''),
(11,	'redactors post',	'',	''),
(12,	'ghjkhgjkghjkghj k',	'',	''),
(13,	'hjklhjklhjklhjkl',	'',	''),
(14,	'gfhj fghj fghjfg',	'',	''),
(15,	'kaiju',	'',	'');

DROP TABLE IF EXISTS `producers`;
CREATE TABLE `producers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `img_main` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `category` text NOT NULL,
  `tags` text NOT NULL,
  `item_price` float NOT NULL,
  `item_discount` float NOT NULL,
  `item_amount` int(11) NOT NULL,
  `item_weight` float NOT NULL,
  `item_length` float NOT NULL,
  `item_width` float NOT NULL,
  `item_height` float NOT NULL,
  `items_related` text NOT NULL,
  `attachments` text NOT NULL,
  `img_main` text NOT NULL,
  `img_thumbnail` text NOT NULL,
  `products_options` text NOT NULL,
  `item_new` int(11) NOT NULL,
  `item_used` int(11) NOT NULL,
  `item_unboxed` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `products` (`id`, `type`, `name`, `category`, `tags`, `item_price`, `item_discount`, `item_amount`, `item_weight`, `item_length`, `item_width`, `item_height`, `items_related`, `attachments`, `img_main`, `img_thumbnail`, `products_options`, `item_new`, `item_used`, `item_unboxed`, `rating`, `active`, `deleted`) VALUES
(1,	'package',	'kghkgh-kjhgj',	'1',	'3,4,5',	1000,	0,	0,	0,	0,	0,	0,	'',	'dokumente.pdf,KdcCeld.jpeg',	'pluto.jpeg',	'ujRTM8f.jpeg',	'1',	1,	0,	0,	0,	1,	0);

DROP TABLE IF EXISTS `productsoptions`;
CREATE TABLE `productsoptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `value` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `productsoptions` (`id`, `name`, `type`, `value`, `active`, `deleted`) VALUES
(1,	'first-item',	'default',	'',	1,	0);

DROP TABLE IF EXISTS `productsoptions__cs`;
CREATE TABLE `productsoptions__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `productsoptions__cs` (`id`, `title`, `description`) VALUES
(1,	'První položka',	'');

DROP TABLE IF EXISTS `productsoptions__en`;
CREATE TABLE `productsoptions__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `productsoptions__en` (`id`, `title`, `description`) VALUES
(1,	'First item',	'');

DROP TABLE IF EXISTS `products__cs`;
CREATE TABLE `products__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `products__cs` (`id`, `title`, `description`, `content`) VALUES
(1,	'hgj kghjk',	'',	'');

DROP TABLE IF EXISTS `products__en`;
CREATE TABLE `products__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `products__en` (`id`, `title`, `description`, `content`) VALUES
(1,	'hgj kghjk',	'',	'');

DROP TABLE IF EXISTS `requests`;
CREATE TABLE `requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `context` text NOT NULL,
  `value` text NOT NULL,
  `token` text NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `requests` (`id`, `type`, `context`, `value`, `token`, `status`) VALUES
(2,	'user',	'lostPassword',	'baggins@shire.ww',	'jkkbgien2474618859639151jvHe9fKjjmq2F5gg6qP1QqEIyI165aPQ',	0),
(3,	'user',	'lostPassword',	'sychrat@gmail.com',	'elnoqrmo3024098535878034DwA4DcKnzTzdN4tGVC2cguKi6g3JyyJt',	0),
(4,	'user',	'lostPassword',	'sychrat@gmail.com',	'fsbckxxe9533139847805646tgEWX3OoI02WoeBgxV8AvGnSnYwOk26K',	0),
(5,	'user',	'lostPassword',	'sychrat@gmail.com',	'tipsvpts9940437667910201xbnckeSYsJUwhD9YExaG91zKsm9cYnKW',	1),
(6,	'user',	'lostPassword',	'sychrat@gmail.com',	'rctwfddu5679419160591673QfMOGiWVknRSpUM8c9O45o85dV4WYXjZ',	1),
(7,	'user',	'lostPassword',	'sychrat@gmail.com',	'ogcfpilf8887768998113239WraerUuycfHB3HGGynB2UhnTZkxWZnEI',	1),
(8,	'user',	'lostPassword',	'sychrat@gmail.com',	'fca36782b921d4b365657fd127b95dd4',	0),
(9,	'user',	'lostPassword',	'sychrat@gmail.com',	'fca36782b921d4b365657fd127b95dd4',	0),
(10,	'user',	'lostPassword',	'sychrat@gmail.com',	'icnjilll9597281586227417RCHZ89mTdQuI4p5BzRp2SQWHHQFlAeQX',	0),
(11,	'user',	'lostPassword',	'sychrat@gmail.com',	'wjwkhwsl2743188705038983yVRIg9WKDDUXodwkOqiGPe87IEcjVSsj',	0),
(12,	'user',	'lostPassword',	'sychrat@gmail.com',	'nqwkckvb4060048325733786AHaRl86CQHP1CRQgc0wA44C3Kk9efrFh',	0),
(13,	'user',	'lostPassword',	'sychrat@gmail.com',	'aftudkjp2046742307964978NsArrw7UUTx4WzXAsi04FgEj2bhgUBkE',	0),
(14,	'user',	'lostPassword',	'sychrat@gmail.com',	'ijadelse2211667700971275O5pDrtIxxQ3XGZCTbN54Gny67DyOpz9C',	0),
(15,	'user',	'lostPassword',	'sychrat@gmail.com',	'yroxcrff5960592832272187K541EqGvSNi6ua1PGEEJOgy5jmV8nhON',	0);

DROP TABLE IF EXISTS `settings_cms`;
CREATE TABLE `settings_cms` (
  `name` varchar(32) NOT NULL,
  `value` text NOT NULL,
  `format` varchar(32) NOT NULL,
  `context` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `settings_cms` (`name`, `value`, `format`, `context`) VALUES
('project_name',	'PROJECT NAME',	'string',	'cms'),
('form_sender_email',	'NOREPLY@EMAIL.EMAIL.com',	'string',	'form'),
('form_recipients_email',	'RECIPIENT@EMAIL.EMAIL',	'array',	'form'),
('language_default',	'en',	'string',	'language'),
('language_installed',	'en,cs',	'array',	'language'),
('language_active',	'en,cs',	'array',	'language'),
('company_name',	'...',	'string',	'company'),
('company_description',	'...',	'string',	'company'),
('company_id',	'GFH65J4FG6H5J4F6G5H',	'string',	'company'),
('company_address',	'...',	'string',	'company'),
('company_city',	'...',	'string',	'company'),
('company_country',	'...',	'string',	'company'),
('company_zip',	'...',	'string',	'company'),
('company_location',	'14.449727369517,50.045754221915',	'array',	'company'),
('company_email',	'EMAIL@EMAIL.EMAIL',	'array',	'company'),
('company_phone',	'420111222555,420888777444',	'array',	'company'),
('company_bank',	'{}',	'json',	'company'),
('meta_title',	'YOUR PAGE TITLE',	'string',	'web'),
('meta_description',	'YOUR PAGE DESCRIPTION',	'string',	'web'),
('meta_robots',	'noindex,nofollow',	'string',	'web'),
('meta_keywords',	'',	'array',	'web'),
('mode_maintenance',	'false',	'boolean',	'mode'),
('mode_debug',	'false',	'boolean',	'mode'),
('mode_development',	'true',	'boolean',	'mode'),
('module_market_active',	'true',	'boolean',	'module'),
('module_market_installed',	'true',	'boolean',	'module'),
('comments_global_active',	'true',	'boolean',	'module'),
('comments_anonymous_active',	'true',	'boolean',	'module'),
('redactor_content_approval',	'true',	'boolean',	'web'),
('members_register_active',	'false',	'boolean',	'module'),
('members_login_active',	'false',	'boolean',	'module'),
('members_lostPassword_active',	'false',	'boolean',	'module'),
('module_members_active',	'true',	'boolean',	'module'),
('module_members_installed',	'true',	'boolean',	'module');

DROP TABLE IF EXISTS `stores`;
CREATE TABLE `stores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `type` varchar(32) NOT NULL,
  `store_address` text NOT NULL,
  `store_city` text NOT NULL,
  `store_country` text NOT NULL,
  `store_zip` text NOT NULL,
  `store_location` text NOT NULL,
  `store_email` text NOT NULL,
  `store_phone` text NOT NULL,
  `img_main` text NOT NULL,
  `img_thumbnail` text NOT NULL,
  `rating` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `stores__cs`;
CREATE TABLE `stores__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `stores__en`;
CREATE TABLE `stores__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tags` (`id`, `name`, `active`, `deleted`) VALUES
(1,	'tag1',	0,	0),
(2,	'tag-2',	1,	0),
(3,	'tag3',	0,	0),
(4,	'tag4',	1,	0),
(5,	'tag5',	1,	0),
(6,	'tag6',	1,	0),
(7,	'hmmm',	1,	0);

DROP TABLE IF EXISTS `translations`;
CREATE TABLE `translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `translations` (`id`, `name`, `active`, `deleted`) VALUES
(1,	'trans.key.1',	1,	0),
(2,	'new.translation',	1,	0),
(3,	'hdfgh-dfghdf',	1,	0),
(4,	'ghj-fghjfgh',	1,	0),
(5,	'fgh-fghj-fgh',	1,	1);

DROP TABLE IF EXISTS `translations__cs`;
CREATE TABLE `translations__cs` (
  `id` int(11) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `translations__cs` (`id`, `value`) VALUES
(1,	'value čeština'),
(2,	'value en'),
(3,	'jghj fghjfghj'),
(4,	'fghjfgj'),
(5,	'ghjlkghjkgh');

DROP TABLE IF EXISTS `translations__en`;
CREATE TABLE `translations__en` (
  `id` int(11) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `translations__en` (`id`, `value`) VALUES
(1,	'value english'),
(2,	'value en'),
(3,	'jghj fghjfghj'),
(4,	'fghjfgj'),
(5,	'ghjlkghjkgh');

DROP TABLE IF EXISTS `uploads`;
CREATE TABLE `uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) NOT NULL,
  `name` text NOT NULL,
  `extension` text NOT NULL,
  `file_name` text NOT NULL,
  `file_mime` text NOT NULL,
  `file_size` text NOT NULL,
  `category` text NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `uploads` (`id`, `type`, `name`, `extension`, `file_name`, `file_mime`, `file_size`, `category`, `active`, `deleted`) VALUES
(2,	'image',	'map4',	'jpg',	'Map_4.jpg',	'image/jpeg',	'709506',	'',	0,	1),
(3,	'image',	'map3',	'jpg',	'Map_3.jpg',	'image/jpeg',	'1031936',	'',	0,	1),
(4,	'document',	'some-document',	'pdf',	'dp-ts-2020.pdf',	'application/pdf',	'2584672',	'',	1,	1),
(5,	'image',	'ghms',	'jpeg',	'ghm.jpeg',	'image/jpeg',	'494872',	'',	0,	1),
(6,	'image',	'Map_2',	'jpg',	'Map_2.jpg',	'image/jpeg',	'1161411',	'2',	1,	1),
(7,	'image',	'Map_303',	'jpg',	'Map_303.jpg',	'image/jpeg',	'1031936',	'',	1,	1),
(8,	'image',	'Map_444',	'jpg',	'Map_444.jpg',	'image/jpeg',	'709506',	'',	1,	1),
(9,	'image',	'Map_4000',	'jpg',	'Map_4000.jpg',	'image/jpeg',	'709506',	'2',	1,	1),
(10,	'image',	'Map_1000',	'jpg',	'Map_1000.jpg',	'image/jpeg',	'328421',	'',	1,	0),
(11,	'image',	'Map_999',	'jpg',	'Map_999.jpg',	'image/jpeg',	'328421',	'',	1,	1),
(12,	'image',	'Map_1024',	'jpg',	'Map_1024.jpg',	'image/jpeg',	'328421',	'',	1,	1),
(13,	'image',	'Map_129',	'jpg',	'Map_129.jpg',	'image/jpeg',	'328421',	'',	1,	1),
(14,	'image',	'Map648',	'jpg',	'Map648.jpg',	'image/jpeg',	'328421',	'',	1,	1),
(15,	'image',	'Map912',	'jpg',	'Map912.jpg',	'image/jpeg',	'328421',	'',	1,	1),
(16,	'image',	'Map54654',	'jpg',	'Map54654.jpg',	'image/jpeg',	'328421',	'',	1,	1),
(17,	'image',	'MapA12456',	'jpg',	'MapA12456.jpg',	'image/jpeg',	'1161411',	'',	1,	0),
(18,	'image',	'croppedMap',	'jpg',	'croppedMap.jpg',	'image/jpeg',	'1031936',	'2',	1,	0),
(19,	'image',	'Amazon',	'jpg',	'Amazon.jpg',	'image/jpeg',	'709506',	'',	1,	0),
(20,	'image',	'Map2002',	'jpg',	'Map2002.jpg',	'image/jpeg',	'1161411',	'',	1,	0),
(21,	'document',	'dokumente',	'pdf',	'dokumente.pdf',	'application/pdf',	'2584672',	'',	1,	0),
(22,	'image',	'bzzzz',	'jpeg',	'bzzzz.jpeg',	'image/jpeg',	'29195',	'',	1,	0),
(23,	'archive',	'test-archiv',	'zip',	'test-archiv.zip',	'application/zip',	'2550',	'',	1,	0),
(24,	'image',	'KdcCeld',	'jpeg',	'KdcCeld.jpeg',	'image/jpeg',	'67167',	'',	1,	0),
(25,	'image',	'ghm-cropped',	'jpeg',	'ghm-cropped.jpeg',	'image/jpeg',	'494872',	'',	1,	0),
(26,	'image',	'gate',	'jpeg',	'gate.jpeg',	'image/jpeg',	'67167',	'',	1,	0),
(27,	'image',	'palec',	'jpg',	'palec.jpg',	'image/jpeg',	'328421',	'',	1,	0),
(28,	'image',	'805_1000',	'jpg',	'805_1000.jpg',	'image/jpeg',	'98745',	'',	1,	1),
(29,	'image',	'k-u-n-d-a',	'jpg',	'k-u-n-d-a.jpg',	'image/jpeg',	'123602',	'',	1,	1),
(30,	'image',	'iBygBhk',	'jpeg',	'iBygBhk.jpeg',	'image/jpeg',	'38415',	'',	1,	0),
(31,	'image',	'ujRTM8f',	'jpeg',	'ujRTM8f.jpeg',	'image/jpeg',	'155681',	'',	1,	0),
(32,	'image',	'pluto',	'jpeg',	'pluto.jpeg',	'image/jpeg',	'145029',	'',	1,	0),
(33,	'image',	'EyzSmAg_as-archiv',	'jpeg',	'EyzSmAg_as-archiv.jpeg',	'image/jpeg',	'169658',	'',	1,	0),
(34,	'image',	'Amaz',	'jpg',	'Amaz.jpg',	'image/jpeg',	'709506',	'',	1,	0),
(35,	'document',	'dp-ts-2020',	'pdf',	'dp-ts-2020.pdf',	'application/pdf',	'2584672',	'',	1,	0),
(36,	'image',	'Donald',	'jpeg',	'Donald.jpeg',	'image/jpeg',	'169658',	'',	1,	0),
(37,	'image',	'ghm-test',	'jpeg',	'ghm-test.jpeg',	'image/jpeg',	'494872',	'',	1,	0),
(38,	'image',	'ghm-test-two',	'jpeg',	'ghm-test-two.jpeg',	'image/jpeg',	'494872',	'',	1,	0),
(39,	'image',	'ghm_test',	'jpeg',	'ghm_test.jpeg',	'image/jpeg',	'494872',	'',	1,	0),
(40,	'image',	'ghm-vyrez',	'jpeg',	'ghm-vyrez.jpeg',	'image/jpeg',	'494872',	'',	1,	0),
(41,	'image',	'dfghdfghdfgh',	'jpeg',	'dfghdfghdfgh.jpeg',	'image/jpeg',	'494872',	'',	1,	0),
(42,	'image',	'cropped-duck',	'jpeg',	'cropped-duck.jpeg',	'image/jpeg',	'169658',	'',	1,	0),
(43,	'image',	'uncropped-map',	'jpeg',	'uncropped-map.jpeg',	'image/jpeg',	'494872',	'',	1,	0),
(44,	'image',	'ghm-test-xyyyy',	'jpeg',	'ghm-test-xyyyy.jpeg',	'image/jpeg',	'494872',	'',	1,	0),
(45,	'archive',	'Archiv',	'zip',	'Archiv.zip',	'application/zip',	'2550',	'',	1,	0),
(46,	'image',	'9pFRwJB',	'jpeg',	'9pFRwJB.jpeg',	'image/jpeg',	'29820',	'2',	1,	0);

DROP TABLE IF EXISTS `uploads__cs`;
CREATE TABLE `uploads__cs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `uploads__cs` (`id`, `title`) VALUES
(2,	'Map 4'),
(3,	'Map 3'),
(4,	'Document XY'),
(5,	''),
(6,	''),
(7,	''),
(8,	'dfgdfghdfg'),
(9,	''),
(10,	''),
(11,	''),
(12,	''),
(13,	''),
(14,	''),
(15,	''),
(16,	''),
(17,	''),
(18,	''),
(19,	''),
(20,	'Map 2002'),
(21,	''),
(22,	''),
(23,	''),
(24,	''),
(25,	''),
(26,	''),
(27,	''),
(28,	''),
(29,	''),
(30,	''),
(31,	''),
(32,	''),
(33,	''),
(34,	''),
(35,	''),
(36,	''),
(37,	''),
(38,	''),
(39,	''),
(40,	''),
(41,	''),
(42,	''),
(43,	''),
(44,	''),
(45,	''),
(46,	'');

DROP TABLE IF EXISTS `uploads__en`;
CREATE TABLE `uploads__en` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `uploads__en` (`id`, `title`) VALUES
(2,	'Map 4'),
(3,	'Map 3'),
(4,	'Document XY'),
(5,	''),
(6,	''),
(7,	''),
(8,	'dfgdfghdfg'),
(9,	''),
(10,	''),
(11,	''),
(12,	''),
(13,	''),
(14,	''),
(15,	''),
(16,	''),
(17,	''),
(18,	''),
(19,	''),
(20,	'Map 2002'),
(21,	''),
(22,	''),
(23,	''),
(24,	''),
(25,	''),
(26,	''),
(27,	''),
(28,	''),
(29,	''),
(30,	''),
(31,	''),
(32,	''),
(33,	''),
(34,	''),
(35,	''),
(36,	''),
(37,	''),
(38,	''),
(39,	''),
(40,	''),
(41,	''),
(42,	''),
(43,	''),
(44,	''),
(45,	''),
(46,	'');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `nickname` text NOT NULL,
  `first_name` text NOT NULL,
  `middle_name` text NOT NULL,
  `last_name` text NOT NULL,
  `user_level` int(11) NOT NULL,
  `user_group` text NOT NULL,
  `img_avatar` longtext NOT NULL,
  `active` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `email`, `password`, `nickname`, `first_name`, `middle_name`, `last_name`, `user_level`, `user_group`, `img_avatar`, `active`, `deleted`) VALUES
(1,	'john.doe@yahoooo.com',	'gf54j6g5hj46fg5h4j6g54j',	'john',	'John',	'',	'Doe',	0,	'default',	'',	0,	0),
(2,	'kenobi.master@jedi.ttn',	'$argon2i$v=19$m=2048,t=4,p=3$YjFSb0l3MG5zV0VqVmNCQQ$/nHy7AdtYFnDnQUyRA0HfuDWJSZebdoGzkW2wc68CJc',	'ben',	'Obi',	'Wan',	'Kenobi',	5,	'default',	'',	1,	0),
(3,	'nakadi.ahmed@goooogle.com',	'fghfhf32g1h3f2g1h3fg21h',	'ahmed',	'Ahmed',	'',	'Nakadi',	3,	'default',	'',	1,	0),
(4,	'baggins@shire.ww',	'ghjfg32hj1g3h2j1fg5h46fgh',	'bilbo',	'Bilbo',	'',	'Baggins',	3,	'redactors',	'',	0,	0),
(5,	'tony@stark-industries.fw',	'gh13j1fg3h2j1fg3hj1f6g5h',	'ironman',	'Tony',	'',	'Stark',	7,	'managers',	'',	1,	0),
(6,	'homer.j.simpson@snpp.com',	'$argon2i$v=19$m=2048,t=4,p=3$Y3hZMUwxWXR2MEp6bnoyTw$hl6sI2PzOBqjLFewZaDURuVTZNvJfCbtGCDg9QQjRYU',	'hoju',	'Homer',	'Jay',	'Simpson',	2,	'redactors',	'',	1,	0),
(7,	'kent.clark@dailyplanet.mps',	'kal-el',	'superman',	'Clark',	'',	'Kent',	5,	'redactors',	'',	0,	0),
(8,	'sychrat@gmail.com',	'$argon2i$v=19$m=2048,t=4,p=3$b3RkMWJLY0FXSkxoRXBpMA$GbMxNO4BFxaiRjMWFXwzzaJeur2cMO/aLIM+b+RFdQo',	'zpecter',	'Tomáš',	'',	'Sychra',	7,	'default',	'data:image/png;base64,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',	1,	0);

-- 2021-09-02 15:58:07
