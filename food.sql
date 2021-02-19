/*
 Navicat Premium Data Transfer

 Source Server         : Mysql
 Source Server Type    : MySQL
 Source Server Version : 50549
 Source Host           : localhost:3306
 Source Schema         : food

 Target Server Type    : MySQL
 Target Server Version : 50549
 File Encoding         : 65001

 Date: 19/04/2020 18:35:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `accountID` int(11) NOT NULL COMMENT '管理员id',
  `rname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '管理员名',
  `rpassword` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '管理员密码',
  PRIMARY KEY (`accountID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (123, '大闸蟹', '123');
INSERT INTO `admin` VALUES (1234, '椰子蟹', '1234');

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify`  (
  `cname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类名',
  `value` int(20) NOT NULL AUTO_INCREMENT COMMENT '分类值',
  PRIMARY KEY (`value`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES ('夜宵', 0);
INSERT INTO `classify` VALUES ('甜点', 1);
INSERT INTO `classify` VALUES ('早餐', 2);
INSERT INTO `classify` VALUES ('小吃', 3);
INSERT INTO `classify` VALUES ('午餐', 4);

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `cTime` datetime NULL DEFAULT NULL COMMENT '评论时间',
  `cname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '评论人',
  `content` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '内容',
  `gID` int(11) NULL DEFAULT NULL COMMENT '商品ID',
  `value` int(11) NULL DEFAULT NULL COMMENT '评定等级'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('2020-03-30 22:04:35', '李四', '还不错吧，给个四星鼓励下。', 1, 4);
INSERT INTO `comments` VALUES ('2020-04-02 22:29:01', '李四', '很好吃哦', 17, 5);
INSERT INTO `comments` VALUES ('2020-04-02 22:29:48', '李四', '适合拌着辣酱吃', 9, 4);
INSERT INTO `comments` VALUES ('2020-04-02 22:30:13', '李四', '不错哟', 3, 5);
INSERT INTO `comments` VALUES ('2020-04-02 22:45:54', '李四', '1', 17, 4);
INSERT INTO `comments` VALUES ('2020-04-02 22:45:57', '李四', '2', 17, 3);
INSERT INTO `comments` VALUES ('2020-04-02 22:46:00', '李四', '3', 17, 2);
INSERT INTO `comments` VALUES ('2020-04-02 22:46:02', '李四', '4', 17, 5);
INSERT INTO `comments` VALUES ('2020-04-02 22:46:10', '李四', '333', 9, 5);
INSERT INTO `comments` VALUES ('2020-04-02 22:46:16', '李四', '111', 9, 3);
INSERT INTO `comments` VALUES ('2020-04-02 22:46:20', '李四', '3333', 9, 5);
INSERT INTO `comments` VALUES ('2020-04-02 22:46:24', '李四', '222', 3, 2);
INSERT INTO `comments` VALUES ('2020-04-02 22:46:28', '李四', '3333', 3, 5);

-- ----------------------------
-- Table structure for delivery
-- ----------------------------
DROP TABLE IF EXISTS `delivery`;
CREATE TABLE `delivery`  (
  `name` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '配送员名',
  `delTel` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '配送员电话',
  `dID` int(11) NOT NULL AUTO_INCREMENT COMMENT '配送员ID',
  PRIMARY KEY (`dID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10005 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of delivery
-- ----------------------------
INSERT INTO `delivery` VALUES ('小张', '11223344556', 10000);
INSERT INTO `delivery` VALUES ('小李', '12345678912', 10001);
INSERT INTO `delivery` VALUES ('小宋', '45678912332', 10002);
INSERT INTO `delivery` VALUES ('小刘', '78945612356', 10003);
INSERT INTO `delivery` VALUES ('小叶', '18598456235', 10004);

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `url` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  `name` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品名',
  `gInfo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品信息',
  `gClassify` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品分类',
  `gAge` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '适合年龄',
  `gPrice` double(10, 2) NULL DEFAULT NULL COMMENT '商品价格',
  `gID` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `cID` int(11) NULL DEFAULT NULL COMMENT '促销ID',
  `num` int(11) NULL DEFAULT NULL COMMENT '商品数量',
  `tID` int(11) NULL DEFAULT NULL COMMENT '推荐ID',
  PRIMARY KEY (`gID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/24/2020032415850179609701958079.jpg?x-oss-process=style/c320', '油淋生菜', '青菜喜欢爆香蒜末油淋入味，吃起来特别香。', '4', '18', 6.00, 1, 0, 10, 1);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/21/2020032115847841951611958079.jpg?x-oss-process=style/c320', '火腿葱香面包', '霍霍面粉，准备下周的早餐，一份简单的葱香火腿面包，特别暄软…', '2', '12', 3.00, 2, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/21/2020032115847962615041958079.jpg?x-oss-process=style/c320', '韭菜粉丝鸡蛋馅饼', '春天的韭菜鲜美极了，最近每周都要吃上一次，今烫了一把粉丝，搭配鸡蛋，做几个馅饼，有菜也有主食了，美味又方便呢！', '2', '12', 4.00, 3, 0, 10, 1);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/23/2020032315849340172081958079.jpg?x-oss-process=style/c320', '炸麻圆儿', '圆圆滚滚，配合着清香的芝麻，简直极了！', '2', '16', 3.00, 4, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/21/2020032115847827788621958079.jpg?x-oss-process=style/c320', '手抓饼披萨', '手抓饼可千变万化的吃法，今天就用手抓饼来做披萨用，不用等发面这么麻烦，酥皮饼底，美味好吃。', '4', '16', 6.00, 5, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/22/2020032215848427595058197577.jpg?x-oss-process=style/c320', '草莓苹果奶昔', '美好的一天从食用水果开始，春天必吃的应季美味，草莓苹果奶昔，好喝还有营养，常喝不但补充维生素，帮助消化，促进新陈代谢，养肝明目，还能喝出好气色。', '1', '15', 6.00, 6, 0, 10, 1);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/22/2020032215848491562388197577.jpg?x-oss-process=style/c320', '卤水小鸡腿', '下饭菜，吃肉兽们的最爱。', '3', '18', 5.00, 7, 1, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/22/2020032215848437172288197577.jpg?x-oss-process=style/c320', '百合银耳雪梨羹', '经历这一次风波，人们对于健康方面越来越重视了，都说外行吃燕窝，内行吃银耳，银耳具有清热润肺、强身健体、提高免疫力和美容养颜等功效。这次做的银耳羹用的银耳是被东方卫视纪录片《本草中华》第二季推荐的本草银耳金燕耳，蛋白质含量等营养元素是普通银耳的数倍到数十倍，胶质是普通银耳的4倍，更益于人体吸收及调理，更好提高人体免疫力，全家老小皆可食用。', '2', '18', 5.00, 8, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/21/2020032115847958245631958079.jpg?x-oss-process=style/c320', '炸鱿鱼圈', '炸鱿鱼圈最好吃，肉质滑脆，一点不柴，不打齿，一口一个，好吃得停不下来。', '0', '12', 10.00, 9, 0, 9, 1);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/22/2020032215848439894988197577.jpg?x-oss-process=style/c320', '酱骨头', '酱骨头，酱而不腻', '4', '20', 12.00, 10, 1, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/21/2020032115847850242811958079.jpg?x-oss-process=style/c320', '红枣粽子', '糯米配红枣，好吃的不得了！', '2', '18', 3.00, 11, 1, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/21/2020032115847966181811958079.jpg?x-oss-process=style/c320', '剁椒蒜蓉粉丝虾', '蒜蓉的香味，糅合着鲜美的虾肉，Q弹倍爽', '3', '16', 12.00, 12, 1, 10, 0);
INSERT INTO `goods` VALUES ('static/img/xianglapaigu.jpg', '香辣排骨', '排骨与辣椒的组合，两种食物互相渗入，排骨有辣椒香辣的味道，辣椒又渗透着排骨的肉香味，味道鲜美，极佳搭配，会使菜香发挥到极致，拌饭真的太香了！', '4', '20', 25.00, 13, 0, 15, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/26/2020032615852088611331958079.jpg?x-oss-process=style/c320', '纯奶吐司', '大爱的吐司，一点不比面包房的差，有空还要做来吃！', '1', '14', 3.50, 14, 0, 10, 1);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/26/2020032615852015466111958079.jpg?x-oss-process=style/c320', '牛奶山药蒸馒头', '白白胖胖，味道又好，又能饱肚子！', '2', '15', 4.00, 15, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/27/2020032715852974001908197577.jpg?x-oss-process=style/c320', '牛肉烧麦', '灌汤牛肉烧麦，皮薄馅香', '2', '10', 5.00, 16, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/30/2020033015855329157668197577.jpg?x-oss-process=style/c320', '葱油拌面', '家常版葱油拌面，十分钟搞定，满满的葱香。', '3', '10', 8.00, 17, 0, 5, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/29/2020032915854866562161958079.jpg?x-oss-process=style/c320', '阳春面', '汤清味鲜，清淡爽口。', '4', '10', 8.00, 18, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/27/2020032715852998573728197577.jpg?x-oss-process=style/c320', '爆浆香蕉披萨', '用手抓饼做披萨皮真是简单美味', '0', '15', 6.00, 19, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/28/2020032815853889929008197577.jpg?x-oss-process=style/c320', '香卤鹌鹑蛋', '色泽诱人又Q弹入味，口感秒杀红烧肉，吃一次就让人欲罢不能，也是很好吃的小零食', '2', '10', 6.00, 20, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/27/2020032715852738539178197577.jpg?x-oss-process=style/c320', '泡菜鳕鱼', '微辣带甜，孩子都很喜欢吃！', '4', '10', 7.00, 21, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/29/2020032915854748141361958079.jpg?x-oss-process=style/c320', '草莓抱抱卷', '春天是吃草莓的时候、草莓好吃颜值又高', '1', '8', 3.00, 22, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/28/2020032815853914487208197577.jpg?x-oss-process=style/c320', '奶白鲫鱼汤', '一煎二姜三开水，大火数分钟，色白如玉，汤味鲜美。', '2', '10', 5.00, 23, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/27/2020032715853148357081958079.jpg?x-oss-process=style/c320', '蒸肉松蛋糕', '美味的蒸肉松蛋糕出锅啦！！！', '1', '10', 4.00, 24, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/26/2020032615851878572488197577.jpg?x-oss-process=style/c320', '香辣烤鱼', '口味香辣。具有肉美汁鲜的特色。', '4', '15', 10.00, 25, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/26/2020032615851883562448197577.jpg?x-oss-process=style/c320', '香蕉发面小饼', '这是一款带着淡淡香蕉香味的发面饼', '3', '10', 3.00, 26, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/28/2020032815853692762738197577.jpg?x-oss-process=style/c320', '西红柿香菇鸡蛋面', '番茄+香菇+鸡蛋，面条更加好吃又营养', '2', '10', 10.00, 27, 1, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/28/2020032815854018879438197577.jpg?x-oss-process=style/c320', '油淋娃娃菜', '懒人版娃娃菜', '4', '10', 4.00, 28, 1, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/28/2020032815853974792278197577.jpg?x-oss-process=style/c320', '秘制烤鸡腿', '一人吃4只嫌不够', '0', '10', 6.00, 29, 1, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/28/2020032815853666399778197577.jpg?x-oss-process=style/c320', '奶酪玉米烙', '甜香的玉米烙加了奶酪更美味哦，能量早餐！', '1', '10', 5.00, 30, 0, 10, 0);
INSERT INTO `goods` VALUES ('https://i3.meishichina.com/attachment/recipe/2020/03/29/2020032915854710925831958079.jpg?x-oss-process=style/c320', '广式水晶虾饺', 'Q弹鲜香的水晶虾饺', '2', '10', 6.00, 31, 0, 10, 0);

-- ----------------------------
-- Table structure for pays
-- ----------------------------
DROP TABLE IF EXISTS `pays`;
CREATE TABLE `pays`  (
  `pID` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `gID` int(11) NOT NULL COMMENT '商品ID',
  `num` int(11) NOT NULL COMMENT '购买数量',
  `info` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '配送员信息',
  `uname` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '购买人',
  `tel` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '购买人电话',
  `address` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  `state` int(11) NULL DEFAULT NULL COMMENT '订单状态',
  `userID` int(11) NULL DEFAULT NULL COMMENT '用户ID',
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品名',
  `gPrice` double(10, 2) NULL DEFAULT NULL COMMENT '商品价格',
  `url` varchar(120) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品图片',
  `sTime` datetime NULL DEFAULT NULL COMMENT '购买时间',
  `drawback` varchar(160) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '退回原因',
  PRIMARY KEY (`pID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of pays
-- ----------------------------
INSERT INTO `pays` VALUES (1, 17, 1, '小宋:45678912332', '李四', '18579657894', '湖南长沙青竹湖', 1, 1456, '葱油拌面', 8.00, 'https://i3.meishichina.com/attachment/recipe/2020/03/30/2020033015855329157668197577.jpg?x-oss-process=style/c320', '2020-04-02 22:28:50', '');
INSERT INTO `pays` VALUES (2, 9, 1, '等待配送', '李四', '18579657894', '湖南长沙青竹湖', 1, 1456, '炸鱿鱼圈', 10.00, 'https://i3.meishichina.com/attachment/recipe/2020/03/21/2020032115847958245631958079.jpg?x-oss-process=style/c320', '2020-04-02 22:29:20', '');
INSERT INTO `pays` VALUES (3, 3, 1, '等待配送', '李四', '18579657894', '湖南长沙青竹湖', 1, 1456, '韭菜粉丝鸡蛋馅饼', 4.00, 'https://i3.meishichina.com/attachment/recipe/2020/03/21/2020032115847962615041958079.jpg?x-oss-process=style/c320', '2020-04-02 22:30:04', '');

-- ----------------------------
-- Table structure for restaurants
-- ----------------------------
DROP TABLE IF EXISTS `restaurants`;
CREATE TABLE `restaurants`  (
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商店名',
  `rHistory` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商店信息'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of restaurants
-- ----------------------------
INSERT INTO `restaurants` VALUES ('大众餐馆', '1、便利快捷 \n制售快捷，食用便利，服务简便、迅速、高效，满足客户的基本需要和节省时间两方面的需求，服务方式遵循便利顾客的原则。\n2、经济实惠\n提供配套、合理、适中的菜品及服务，经营价位低廉物美，物有所值，与顾客的消费水平相适应，满足其“精打细算”的节俭心理。\n3、卫生安全\n餐饮单位持合法有效卫生许可证、食品卫生状况较好，从业人员身体健康，满足大众基本的食品安全和清洁的要求，提供无公害的就餐食品。');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `userID` int(11) NOT NULL COMMENT '用户ID',
  `uname` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `tel` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户电话',
  `upassword` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户密码',
  `address` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`userID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1234, '张三', '', '1234', '');
INSERT INTO `users` VALUES (1456, '李四', '18579657894', '1456', '湖南长沙青竹湖');

SET FOREIGN_KEY_CHECKS = 1;
