/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50624
Source Host           : 127.0.0.1:3306
Source Database       : wisdomcampus

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-05-15 09:28:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tell` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `group_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `institute_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='adminPermission_code:权限\r\nadminRole_no：学工号';

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('052a62c3-85a5-4bfb-91ea-cfb233fa6db5', 'Tony', '13878996521', '3215465885@qq.com', '2', '123', '1');
INSERT INTO `admin` VALUES ('1', '超级管理员', '12345668998', '22222222222@qq.com', '4', '243566714', '');
INSERT INTO `admin` VALUES ('19ca3b6b-7856-4bad-818c-5b94902b87ac', '消息管理员', '13500135000', '2546884699@163.com', '1', '123', '10');
INSERT INTO `admin` VALUES ('2560389a-919b-488b-98bd-382c5170fb2a', '神一般的小编', '1665984556', '45566433320@qq.com', '1', '123', '1');
INSERT INTO `admin` VALUES ('59e8f8f1-8d86-49c3-9e02-758d43615580', '忧郁的枷锁', '14455663212', '23452345@qq.com', '1,2', '123', '1');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `c_no` varchar(50) NOT NULL,
  `c_name` varchar(20) DEFAULT NULL,
  `p_no` varchar(50) DEFAULT NULL,
  `i_no` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`c_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('1e88607b-04b2-417b-a765-29daa594340a', '13软件1班', '71939eb0-a3f9-478d-9961-1ee4fc6daa74', '1');
INSERT INTO `class` VALUES ('25b4b1f1-09e8-41d5-8aae-0716ab003e13', '16软件1班', '71939eb0-a3f9-478d-9961-1ee4fc6daa74', '1');
INSERT INTO `class` VALUES ('290c651a-1511-4212-8828-e297ec3886fc', '12软件1班', '71939eb0-a3f9-478d-9961-1ee4fc6daa74', '1');
INSERT INTO `class` VALUES ('36df859a-be6b-4828-8523-0ee3dac9393f', '13数控1班', '31680ff8-e251-4eeb-bc86-1e21ba1f686e', '6');
INSERT INTO `class` VALUES ('3e030dba-32e7-44c6-ab2a-f75247fad410', '15物联网2班', '95bcf414-afa3-4802-901b-6587736930f1', '1');
INSERT INTO `class` VALUES ('4cb85887-4879-4743-be1b-00465e692d80', '14科技2班', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '1');
INSERT INTO `class` VALUES ('51a8de57-30c4-430b-9985-689c8042c89e', '14网络工程1班', 'e64a0be7-3470-4148-94da-d5c0cfc2f605', '1');
INSERT INTO `class` VALUES ('5a4dfdfb-7098-4f1c-9528-0a79bb996d8a', '12软件1班', 'e64a0be7-3470-4148-94da-d5c0cfc2f605', '1');
INSERT INTO `class` VALUES ('5cf3bf47-469a-4778-bef9-da1d126483b8', '12生物学1班', 'ee4d715e-89bb-4ad6-86e0-2efb29eeab4a', '10');
INSERT INTO `class` VALUES ('98588511-7d3e-4df2-8d3e-611220822d2d', '12科技1班', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '1');
INSERT INTO `class` VALUES ('aadcaf2a-0fc9-4223-a5f4-f478fa00ca7a', '13网络工程1班', 'e64a0be7-3470-4148-94da-d5c0cfc2f605', '1');
INSERT INTO `class` VALUES ('abc7d46a-6823-45ba-93d6-fcb28789ca26', '13软件一班', '71939eb0-a3f9-478d-9961-1ee4fc6daa74', '1');
INSERT INTO `class` VALUES ('afb42a99-0a88-421b-bfc7-637884a10f6f', '园林1班', '5adfb5cb-cf1a-44a4-a4da-327a26bd129b', '10');
INSERT INTO `class` VALUES ('c52631fc-e923-4485-ac48-a12ecb9e0786', '13科技1班', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '1');
INSERT INTO `class` VALUES ('c98995ca-de6a-413c-9f2f-7904b434e392', '16生技', '5adfb5cb-cf1a-44a4-a4da-327a26bd129b', '10');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `cs_no` varchar(50) NOT NULL,
  `cs_name` varchar(50) DEFAULT NULL,
  `teacher_no` varchar(255) DEFAULT NULL,
  `i_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cs_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('2d275cef-87b6-459e-86d2-490b1aa10a6c', 'Java基础知识', '10b7ec1a-efc6-423d-b5a8-a3d06fdfde51', '1');
INSERT INTO `course` VALUES ('9768b930-0b49-41bc-a6aa-e2cc34060a0d', '软件工程', 'e31efb61-342c-4be4-a13c-b3e8ac67a42f,f06405d0-e98f-4625-b9d5-22f25aec73a2', '1');
INSERT INTO `course` VALUES ('9f6a514c-112a-470c-af50-8c8ae672812f', '概率论', '792438de-3796-4f6d-b8d6-86e10e0106da,e469a9e8-7181-49c4-8743-c985776c251c', '1');
INSERT INTO `course` VALUES ('b57e385e-25f9-4885-be29-5e9bc9d337fc', '大学英语', '792438de-3796-4f6d-b8d6-86e10e0106da', '1');
INSERT INTO `course` VALUES ('e36d9d54-10e1-41fd-a170-db7f3fee382b', 'C语言', 'e31efb61-342c-4be4-a13c-b3e8ac67a42f,e469a9e8-7181-49c4-8743-c985776c251c', '1');
INSERT INTO `course` VALUES ('e86dfdc4-63f9-4d6c-8a47-bc58ce94cbcc', '毛泽东概论', 'f06405d0-e98f-4625-b9d5-22f25aec73a2', '1');
INSERT INTO `course` VALUES ('eaccf2de-ac51-468a-ad4e-c9565a68aeca', '离散数学', 'f06405d0-e98f-4625-b9d5-22f25aec73a2,931d09cf-c35e-402c-8def-87ae240d9564,968160a2-3ecf-4006-8aa8-a2523990ec09', '1');
INSERT INTO `course` VALUES ('fa3ba5a7-2ff1-49aa-bb1b-4cbc1ada51c2', '数据结构', 'ac2d21a9-1563-45ee-bfb0-79e114cc9599', '1');
INSERT INTO `course` VALUES ('fb53006d-67ad-49b0-83ff-7e856b2060a6', '设计模式', 'b866052a-329a-45a3-b19f-bf958f471827', '1');

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `group_id` varchar(5) NOT NULL,
  `group_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group
-- ----------------------------
INSERT INTO `group` VALUES ('1', '消息管理');
INSERT INTO `group` VALUES ('2', '师生信息编辑');
INSERT INTO `group` VALUES ('3', '成绩录入');
INSERT INTO `group` VALUES ('4', '超级管理员');

-- ----------------------------
-- Table structure for institute
-- ----------------------------
DROP TABLE IF EXISTS `institute`;
CREATE TABLE `institute` (
  `i_no` varchar(50) NOT NULL,
  `i_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`i_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='i_code:学院代码';

-- ----------------------------
-- Records of institute
-- ----------------------------
INSERT INTO `institute` VALUES ('1', '计算机学院');
INSERT INTO `institute` VALUES ('10', '生命科学学院');
INSERT INTO `institute` VALUES ('2', '电子工程学院');
INSERT INTO `institute` VALUES ('3', '体育学院');
INSERT INTO `institute` VALUES ('4', '美术学院');
INSERT INTO `institute` VALUES ('5', '政法学院');
INSERT INTO `institute` VALUES ('6', '数学学院');
INSERT INTO `institute` VALUES ('8', '文学院');
INSERT INTO `institute` VALUES ('8886c923-38f4-4bfe-838b-5e8b166198b6', '音乐学院');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `n_id` varchar(50) NOT NULL,
  `n_title` varchar(50) DEFAULT NULL,
  `n_author` varchar(10) DEFAULT NULL,
  `n_date` datetime DEFAULT NULL,
  `n_content` varchar(10000) DEFAULT NULL,
  `newsType_id` varchar(10) DEFAULT NULL,
  `n_status` varchar(5) DEFAULT NULL,
  `n_abstract` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`n_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('01', '肇庆学院招聘会', 'team', '2017-03-10 13:49:42', '有华盛顿法定松岛枫发稿硕大的更改个人傻吊反对党发个非官方个非官方', '2', '0', '4月30号在福慧图书馆门前举行');
INSERT INTO `news` VALUES ('02', '互联网带给我们的好处', 'Ocean', '2016-12-16 00:00:00', '如今互联网触手可及，初中以上的学生都几乎人手一个手机', '1', '1', '利用好互联网，将受益良多');
INSERT INTO `news` VALUES ('03', '教练型训练', 'kerrey', '2016-12-21 10:15:55', '教育是自由发挥，因材施教，而不是生搬硬套', '3', '0', '因地制宜，因材施教');
INSERT INTO `news` VALUES ('04', '大数据时代', 'Tom', '2016-12-22 10:16:40', '大数据融入现代生活', '3', '1', '数据就是金钱');
INSERT INTO `news` VALUES ('05', '天气预报', 'kk', '2016-12-21 10:17:55', '接下来得几天会有强降温', '1', '0', '注意保暖');
INSERT INTO `news` VALUES ('59592665-3678-4f72-b313-1d7c168f697d', '数据回来啦', '飞翔', '2017-04-05 09:58:14', '同一人育儿', '3', '0', '卡路里的人家问爱上对方过后就哭了');

-- ----------------------------
-- Table structure for newstype
-- ----------------------------
DROP TABLE IF EXISTS `newstype`;
CREATE TABLE `newstype` (
  `nt_id` varchar(10) NOT NULL,
  `nt_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`nt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of newstype
-- ----------------------------
INSERT INTO `newstype` VALUES ('1', '新闻');
INSERT INTO `newstype` VALUES ('2', '招聘会');
INSERT INTO `newstype` VALUES ('3', '学术讲座');

-- ----------------------------
-- Table structure for organization
-- ----------------------------
DROP TABLE IF EXISTS `organization`;
CREATE TABLE `organization` (
  `id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of organization
-- ----------------------------
INSERT INTO `organization` VALUES ('234524', '校医院');
INSERT INTO `organization` VALUES ('29b40497-94ee-417c-80de-644f7b463ba8', '教务处');
INSERT INTO `organization` VALUES ('2b2e2c3d-b8c5-4661-b1d0-27466cdf4bcb', '学生会');
INSERT INTO `organization` VALUES ('33456456', '巡检队');
INSERT INTO `organization` VALUES ('a96d92d4-2c8f-406f-b05b-efe339a0baca', '保洁大队');
INSERT INTO `organization` VALUES ('d76c00a3-04f6-43f6-8eac-3bfd9f3a76b3', '宿管会');

-- ----------------------------
-- Table structure for organizer
-- ----------------------------
DROP TABLE IF EXISTS `organizer`;
CREATE TABLE `organizer` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `organization_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tell` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of organizer
-- ----------------------------
INSERT INTO `organizer` VALUES ('0854f59b-795d-4ad8-8c08-abac88afba50', '29b40497-94ee-417c-80de-644f7b463ba8', '梁山伯', '13522463321', '22255415@qq.com');
INSERT INTO `organizer` VALUES ('19e25aca-b67a-426c-9d8c-1b037158db2e', '29b40497-94ee-417c-80de-644f7b463ba8', '祝英台', '13044556666', '987962442@qq.com');
INSERT INTO `organizer` VALUES ('2578c392-f179-40b0-82fe-f9b9374b0634', '2b2e2c3d-b8c5-4661-b1d0-27466cdf4bcb', '张亮', '14522243454', '2388499224@qq.com');
INSERT INTO `organizer` VALUES ('3060e1c9-d6d4-412e-a728-e7de1442524f', '33456456', '马东东', '12233321232', '332345235@qq.com');
INSERT INTO `organizer` VALUES ('3e5cbbaf-ec13-43b6-8f04-e2eaa93ed946', '2b2e2c3d-b8c5-4661-b1d0-27466cdf4bcb', '韩信', '10098842222', '435562234@sina.com');
INSERT INTO `organizer` VALUES ('59dc6665-a92b-4895-90fe-70cd9effbd8e', '33456456', '胡大夫', '13415777777', '1213425563@qq.com');
INSERT INTO `organizer` VALUES ('67664b41-90a9-4bd8-9c35-bbd1f76a5469', '33456456', '张亮', '14522243454', '2388499224@qq.com');
INSERT INTO `organizer` VALUES ('986783d0-0f1d-4c17-9c72-5294f23e5de3', '29b40497-94ee-417c-80de-644f7b463ba8', '于华龙', '15369877788', '15853542@qq.com');
INSERT INTO `organizer` VALUES ('9def3f66-07ab-4033-882b-a163889c9cfa', 'd76c00a3-04f6-43f6-8eac-3bfd9f3a76b3', '方大同', '13655544449', '2012335943@qq.com');
INSERT INTO `organizer` VALUES ('a0efaf40-be46-4b87-9bdc-9f797c577725', '234524', '陈原账', '12345566555', '2225541355@qq.com');
INSERT INTO `organizer` VALUES ('dd87c299-275b-4de3-95d3-0e741180ac3b', '234524', '李馋懒', '15555884464', '1538535452@qq.com');
INSERT INTO `organizer` VALUES ('e2662767-6f25-4518-a67e-4a8b74373ae9', '2b2e2c3d-b8c5-4661-b1d0-27466cdf4bcb', '胡大夫', '13415777777', '1213425563@qq.com');
INSERT INTO `organizer` VALUES ('e994442a-e0af-4688-867a-d79faff6292f', '234524', '钟晓蓝', '13235234536', '2345242345@qq.com');

-- ----------------------------
-- Table structure for profession
-- ----------------------------
DROP TABLE IF EXISTS `profession`;
CREATE TABLE `profession` (
  `p_id` varchar(50) NOT NULL,
  `p_name` varchar(30) DEFAULT NULL,
  `i_no` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of profession
-- ----------------------------
INSERT INTO `profession` VALUES ('31680ff8-e251-4eeb-bc86-1e21ba1f686e', '数控原理', '6');
INSERT INTO `profession` VALUES ('342660ca-b191-4dc2-bf6a-56a7141d18a8', '科技', '1');
INSERT INTO `profession` VALUES ('52ab1a39-e824-4b31-aeab-0084168d0872', '气血', '2');
INSERT INTO `profession` VALUES ('5adfb5cb-cf1a-44a4-a4da-327a26bd129b', '生命科学与技术', '10');
INSERT INTO `profession` VALUES ('637ffcbd-6174-4cfd-a5c7-c372b0a53c0e', '临床医学', '560024e5-eadd-4baa-be0b-ad232c7f852c');
INSERT INTO `profession` VALUES ('71939eb0-a3f9-478d-9961-1ee4fc6daa74', '软件工程', '1');
INSERT INTO `profession` VALUES ('90148c3d-f800-47a1-b7d2-99e08c669f00', '生命研究', '10');
INSERT INTO `profession` VALUES ('95bcf414-afa3-4802-901b-6587736930f1', '物联网', '1');
INSERT INTO `profession` VALUES ('e64a0be7-3470-4148-94da-d5c0cfc2f605', '网络工程', '1');

-- ----------------------------
-- Table structure for schedule
-- ----------------------------
DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule` (
  `id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `class_name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `class_no` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `course_name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `course_no` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `teacher_name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `teacher_no` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `institute_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `year` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `week` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `term` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of schedule
-- ----------------------------
INSERT INTO `schedule` VALUES ('0b3167b6-16c2-4c7f-9658-37fca2a12882', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', 'Java基础知识', '2d275cef-87b6-459e-86d2-490b1aa10a6c', '伊鲁卡', '201224131110', '1', '2012-2013', '星期二', '上学期', '5-6节');
INSERT INTO `schedule` VALUES ('13c41e19-7e3b-4c9d-8077-aab4a4b5692e', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', '软件工程', '9768b930-0b49-41bc-a6aa-e2cc34060a0d', 'teacher2', '201224131111', '1', '2013-2014', '星期二', '上学期', '5-6节');
INSERT INTO `schedule` VALUES ('2256c436-b2e1-4e1a-8095-c1d4252783a2', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', '大学英语', 'b57e385e-25f9-4885-be29-5e9bc9d337fc', '陈龙', '201224131112', '1', '2012-2013', '星期一', '上学期', '3-4节');
INSERT INTO `schedule` VALUES ('2768880c-1532-49ba-af71-2c6edf5fd273', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', '大学英语', 'b57e385e-25f9-4885-be29-5e9bc9d337fc', '陈龙', '201224131112', '1', '2014-2015', '星期一', '上学期', '5-6节');
INSERT INTO `schedule` VALUES ('2a590331-648d-463e-bffa-090d89afc8de', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', 'Java基础知识', '2d275cef-87b6-459e-86d2-490b1aa10a6c', '伊鲁卡', '201224131110', '1', '2012-2013', '星期五', '上学期', '5-6节');
INSERT INTO `schedule` VALUES ('567eba3d-3450-4e8c-9567-00a6f71cc706', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', '设计模式', 'fb53006d-67ad-49b0-83ff-7e856b2060a6', '卓青梅', '201224131114', '1', '2012-2013', '星期四', '上学期', '3-4节');
INSERT INTO `schedule` VALUES ('5dd24c3c-7b49-4395-9f81-6bd158ed13ef', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', '软件工程', '9768b930-0b49-41bc-a6aa-e2cc34060a0d', '卓别林', '201224131115', '1', '2012-2013', '星期一', '上学期', '7-8节');
INSERT INTO `schedule` VALUES ('7bce0049-5b2f-4f4e-a4fe-0e3654128d31', '16软件1班', '25b4b1f1-09e8-41d5-8aae-0716ab003e13', 'Java基础知识', '2d275cef-87b6-459e-86d2-490b1aa10a6c', '伊鲁卡', '201224131110', '1', '2017-2018', '星期一', '下学期', '1-2节');
INSERT INTO `schedule` VALUES ('8829a356-8434-47d8-b2a3-ea83f535b4f5', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', 'C语言', 'e36d9d54-10e1-41fd-a170-db7f3fee382b', '卓别林', '201224131115', '1', '2012-2013', '星期二', '上学期', '3-4节');
INSERT INTO `schedule` VALUES ('adf4e794-212e-435a-a52d-42c92c910d93', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', 'Java基础知识', '2d275cef-87b6-459e-86d2-490b1aa10a6c', '伊鲁卡', '201224131110', '1', '2012-2013', '星期一', '上学期', '1-2节');
INSERT INTO `schedule` VALUES ('bc102839-8d5e-4392-899d-03ca3027d39c', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', '数据结构', 'fa3ba5a7-2ff1-49aa-bb1b-4cbc1ada51c2', '李逵', '201224131118', '1', '2012-2013', '星期二', '上学期', '1-2节');
INSERT INTO `schedule` VALUES ('bdf22c10-d316-4755-abd2-db393ffcaf3b', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', '软件工程', '9768b930-0b49-41bc-a6aa-e2cc34060a0d', '卓别林', '201224131115', '1', '2014-2015', '星期一', '上学期', '3-4节');
INSERT INTO `schedule` VALUES ('c636923c-9ece-46e2-a480-66a57923bdc6', '13软件1班', '1e88607b-04b2-417b-a765-29daa594340a', 'Java基础知识', '2d275cef-87b6-459e-86d2-490b1aa10a6c', '伊鲁卡', '201224131110', '1', '2012-2013', '星期三', '上学期', '1-2节');

-- ----------------------------
-- Table structure for server
-- ----------------------------
DROP TABLE IF EXISTS `server`;
CREATE TABLE `server` (
  `server_id` varchar(50) NOT NULL,
  `server_name` varchar(20) DEFAULT NULL,
  `server_tell` varchar(15) DEFAULT NULL,
  `server_address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`server_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of server
-- ----------------------------
INSERT INTO `server` VALUES ('01', '门卫处', '1382345623', '第一田径场');
INSERT INTO `server` VALUES ('02', '咨询处', '13258963147', '福慧图书馆');
INSERT INTO `server` VALUES ('3ba30d4a-de2d-44b8-be79-772e54bbbdb9', '游泳池', '13223444545', '第三教学楼');
INSERT INTO `server` VALUES ('75adc6c3-b465-4a6a-b5fc-46d5a4c030d5', '校医院', '13549977452', '紫荆路');

-- ----------------------------
-- Table structure for StudentVo
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` varchar(50) DEFAULT NULL,
  `s_no` varchar(20) DEFAULT NULL,
  `s_name` varchar(10) DEFAULT NULL,
  `s_tell` varchar(15) DEFAULT NULL,
  `s_picture` varchar(255) DEFAULT NULL,
  `s_mail` varchar(20) DEFAULT NULL,
  `i_id` varchar(50) DEFAULT NULL,
  `p_id` varchar(50) DEFAULT NULL,
  `class_no` varchar(50) DEFAULT NULL,
  `s_sex` varchar(10) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of StudentVo
-- ----------------------------
INSERT INTO `student` VALUES ('7d8ac129-7273-43f6-840e-667be10704b3', '23314632213', '陈晓春', '13664548782', '../studentPic/1491642518539.jpg', '31649874656@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '98588511-7d3e-4df2-8d3e-611220822d2d', '女', '23314632213', '1');
INSERT INTO `student` VALUES ('1d2c5992-0a66-499a-937c-3508fde71c5b', '2013245523', '梅长苏', '13566444723', '../studentPic/1492314434183.jpg', '21345962218@qq.com', '1', '95bcf414-afa3-4802-901b-6587736930f1', '3e030dba-32e7-44c6-ab2a-f75247fad410', '女', '123', '1');
INSERT INTO `student` VALUES ('9f9c6069-8445-40a9-8eab-eecf045c53d9', '2333445672', '梁离殇', '13566444722', '../studentPic/1491642397888.jpg', '21345968@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '98588511-7d3e-4df2-8d3e-611220822d2d', '女', '2333445672', '1');
INSERT INTO `student` VALUES ('8ab76c37-224e-4fc3-ab4a-a6b218dcc992', '20134653211', '张志科', '13054987465', '../studentPic/1492335548179.jpg', '1223464125@qq.com', '10', '5adfb5cb-cf1a-44a4-a4da-327a26bd129b', '70a64f99-313b-4c93-9bcc-4e54e9d5e296', '男', '20134653211', '1');
INSERT INTO `student` VALUES ('c3c1e954-c85a-428a-bd53-0947ec4fb3da', '2654651326', '钟馗', '13549846546', '../studentPic/1492337112140.jpg', '2546546987@qq.com', '10', '5adfb5cb-cf1a-44a4-a4da-327a26bd129b', 'c98995ca-de6a-413c-9f2f-7904b434e392', '女', '2654651326', '1');
INSERT INTO `student` VALUES ('86ceb53e-a382-4dba-b4bf-0899799e5bf6', '20135665445', '梁单波', '13556665556', '../studentPic/1492339232395.jpg', '98465654@qq.com', '1', '71939eb0-a3f9-478d-9961-1ee4fc6daa74', '25b4b1f1-09e8-41d5-8aae-0716ab003e13', '男', '20135665445', '1');
INSERT INTO `student` VALUES ('f6a52155-d050-44c5-9a8b-1a5c2e33415d', '201624164456', '关羽', '13566441123', './image/default.png', '265465654@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '4cb85887-4879-4743-be1b-00465e692d80', '男', '201624164456', '1');
INSERT INTO `student` VALUES ('18d45c10-7294-4344-8d09-296a356ca61c', '201624164457', '项羽', '13577994561', './image/default.png', '213654665@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '4cb85887-4879-4743-be1b-00465e692d80', '男', '201624164457', '0');
INSERT INTO `student` VALUES ('543ba75b-939d-493d-8d3e-e88abf5166f3', '201624164458', '诸葛亮', '14533665555', './image/default.png', '6546522313@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '4cb85887-4879-4743-be1b-00465e692d80', '男', '201624164458', '1');
INSERT INTO `student` VALUES ('22cdc446-9aaa-4fb1-953e-676035a7c428', '201624164459', '曹操', '16855664422', '../studentPic/1492596223984.jpg', '987421332@163.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '4cb85887-4879-4743-be1b-00465e692d80', '男', null, '1');
INSERT INTO `student` VALUES ('2705b419-d122-4756-bf1c-623f10157688', '201624164460', '许露娜', '18799645523', './image/default.png', '6456546656@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '4cb85887-4879-4743-be1b-00465e692d80', '女', '201624164460', '0');
INSERT INTO `student` VALUES ('c1820a7b-7578-4cef-8f1e-03d1f0b0121b', '201624164461', '黄贯中', '13645845699', './image/default.png', '654652132@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '4cb85887-4879-4743-be1b-00465e692d80', '男', '201624164461', '1');
INSERT INTO `student` VALUES ('d52618df-629b-4c8f-9074-ae6bb989a61e', '201624164462', '邓紫棋', '16644855954', './image/default.png', '453534623@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '4cb85887-4879-4743-be1b-00465e692d80', '女', '201624164462', '0');
INSERT INTO `student` VALUES ('d519d7e2-052d-45ea-b987-4932dcf8e84e', '201624164463', '黄骊山', '18475623356', '../studentPic/1492407790606.jpg', '98776562@163.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '4cb85887-4879-4743-be1b-00465e692d80', '女', '123', '1');
INSERT INTO `student` VALUES ('e0c8ba9e-5e0e-4f93-984c-b81ff5701eb7', '201355664448', '柯震东', '13566445781', '../studentPic/1492408557216.jpg', '6451326456@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', '98588511-7d3e-4df2-8d3e-611220822d2d', '男', '201355664448', '1');
INSERT INTO `student` VALUES ('f1adaac2-c750-458b-a799-c06ddc691463', '201322254456', '钟无艳', '135444667742', '../studentPic/1492408830274.jpg', '789846532@163.com', '6', '31680ff8-e251-4eeb-bc86-1e21ba1f686e', '36df859a-be6b-4828-8523-0ee3dac9393f', '女', '201322254456', '1');
INSERT INTO `student` VALUES ('d0b0ae5e-21c3-4a52-ae64-b77dbf258527', '201355566644', '江泽宏', '13253654895', '../studentPic/1492432595245.jpg', '98465162@qq.com', '1', '71939eb0-a3f9-478d-9961-1ee4fc6daa74', '1e88607b-04b2-417b-a765-29daa594340a', '男', '201355566644', '1');
INSERT INTO `student` VALUES ('1afd31c8-438a-44d4-a2e0-0a36673de250', '201566445565', '李建', '13566457895', '../studentPic/1492532730738.jpg', '46543213@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201566445565', '1');
INSERT INTO `student` VALUES ('dec3349f-28a6-40da-a652-f1fa39a556e8', '201455665441', '王峰', '13644685662', '../studentPic/1492532792675.jpg', '254466547@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201455665441', '1');
INSERT INTO `student` VALUES ('5e31b902-567b-498d-aac6-0b621fc1e29f', '201324133140', '欧卓航', '13456756655', '../studentPic/1492596060190.jpg', '264654633@qq.com', '1', '71939eb0-a3f9-478d-9961-1ee4fc6daa74', '1e88607b-04b2-417b-a765-29daa594340a', '男', '201324133140', '1');
INSERT INTO `student` VALUES ('3d358707-ee6e-4f04-83dd-f02efc6cfa55', '201324164456', '关羽', '13566441123', './image/default.png', '265465654@qq.com', '', '', '', '男', '201324164456', '1');
INSERT INTO `student` VALUES ('4f9a41d9-56ab-4a83-a699-19a226c5e44c', '201324164457', '项羽', '13577994561', './image/default.png', '213654665@qq.com', '', '', '', '男', '201324164457', '1');
INSERT INTO `student` VALUES ('39e09a3e-89b3-4a08-ae63-deb1d94faf53', '201324164458', '诸葛亮', '14533665555', './image/default.png', '6546522313@qq.com', '', '', '', '男', '201324164458', '1');
INSERT INTO `student` VALUES ('b2bc4ae2-f6cb-4bc0-a5fe-8d823690796a', '201324164459', '曹操', '16855664422', './image/default.png', '987421332@163.com', '', '', '', '男', '201324164459', '1');
INSERT INTO `student` VALUES ('5422fc68-de78-4e26-99bb-d82fd2f86d02', '201324164460', '许露娜', '18799645523', './image/default.png', '6456546656@qq.com', '', '', '', '女', '201324164460', '1');
INSERT INTO `student` VALUES ('93739435-e784-402e-9dc5-b0b937ebc4d7', '201324164461', '黄贯中', '13645845699', './image/default.png', '654652132@qq.com', '', '', '', '男', '201324164461', '1');
INSERT INTO `student` VALUES ('f4cf3e87-2351-461a-b698-cdc2e7d690a2', '201324164462', '邓紫棋', '16644855954', './image/default.png', '453534623@qq.com', '', '', '', '女', '201324164462', '1');
INSERT INTO `student` VALUES ('2c9b6b6a-01d5-46b5-a615-15d73eeb117e', '201324164463', '黄骊山', '18475623356', './image/default.png', '98776562@163.com', '', '', '', '女', '201324164463', '1');
INSERT INTO `student` VALUES ('68eb636a-86a3-4135-a45e-73a365a5036d', '201324164464', '李白', '15644895652', './image/default.png', '98765465@qq.com', '', '', '', '男', '201324164464', '1');
INSERT INTO `student` VALUES ('b00c88f0-eac9-4c84-a54f-c7db6cc52501', '201624164465', '学生1', '15644895653', './image/default.png', '98765466@qq.com', '', '', '', '女', '201624164465', '1');
INSERT INTO `student` VALUES ('8f26f820-2462-40b1-aa65-662b4dd06d00', '201624164466', '学生2', '15644895654', './image/default.png', '98765467@qq.com', '', '', '', '男', '201624164466', '1');
INSERT INTO `student` VALUES ('e7bd0ffe-0d69-46a0-9643-391bfe0737a1', '201624164467', '学生3', '15644895655', './image/default.png', '98765468@qq.com', '', '', '', '女', '201624164467', '1');
INSERT INTO `student` VALUES ('ecad8813-3e3c-417e-ad57-00aed1bf5efe', '201624164468', '学生4', '15644895656', './image/default.png', '98765469@qq.com', '', '', '', '男', '201624164468', '1');
INSERT INTO `student` VALUES ('e6f0e7a4-1146-49f5-8c14-f2e569a0d6b8', '201624164469', '学生5', '15644895657', './image/default.png', '98765470@qq.com', '', '', '', '女', '201624164469', '1');
INSERT INTO `student` VALUES ('898562a1-0c78-43fc-b0c6-cb8b357ab62e', '201624164470', '学生6', '15644895658', './image/default.png', '98765471@qq.com', '', '', '', '男', '201624164470', '1');
INSERT INTO `student` VALUES ('2b0ffc90-ab20-4a33-b357-14ef4854fd26', '201624164471', '学生7', '15644895659', './image/default.png', '98765472@qq.com', '', '', '', '女', '201624164471', '1');
INSERT INTO `student` VALUES ('878e73b5-96c5-438b-904f-78197b3b3a79', '201624164472', '学生8', '15644895660', './image/default.png', '98765473@qq.com', '', '', '', '男', '201624164472', '1');
INSERT INTO `student` VALUES ('0756d99f-67c1-4a69-9fb5-fa34537b2d38', '201624164473', '学生9', '15644895661', './image/default.png', '98765474@qq.com', '', '', '', '女', '201624164473', '1');
INSERT INTO `student` VALUES ('bf99bd0f-0fa0-4c04-9f92-5c700f76a044', '201624164474', '学生10', '15644895662', './image/default.png', '98765475@qq.com', '', '', '', '男', '201624164474', '1');
INSERT INTO `student` VALUES ('d0a41012-21a6-43d5-b093-cdc414a3d69b', '201624164475', '学生11', '15644895663', './image/default.png', '98765476@qq.com', '', '', '', '女', '201624164475', '1');
INSERT INTO `student` VALUES ('bdf15fba-d90c-4ea2-a302-61f9fd12f33d', '201624164476', '学生12', '15644895664', './image/default.png', '98765477@qq.com', '', '', '', '男', '201624164476', '1');
INSERT INTO `student` VALUES ('c648cc5a-97f4-4bef-bbfd-c77dba88e72c', '201624164477', '学生13', '15644895665', './image/default.png', '98765478@qq.com', '', '', '', '女', '201624164477', '1');
INSERT INTO `student` VALUES ('e9bb12f1-5cba-4b61-9599-cd7a05743308', '201624164478', '学生14', '15644895666', './image/default.png', '98765479@qq.com', '', '', '', '男', '201624164478', '1');
INSERT INTO `student` VALUES ('616e222d-bb35-4e70-a4a0-8f769159a1ce', '201624164479', '学生15', '15644895667', './image/default.png', '98765480@qq.com', '', '', '', '女', '201624164479', '1');
INSERT INTO `student` VALUES ('f3f0abaf-73d8-4629-9943-397283395874', '201624164480', '学生16', '15644895668', './image/default.png', '98765481@qq.com', '', '', '', '男', '201624164480', '1');
INSERT INTO `student` VALUES ('b13092d7-9375-4594-a6f2-e142a58be03b', '201624164481', '学生17', '15644895669', './image/default.png', '98765482@qq.com', '', '', '', '女', '201624164481', '1');
INSERT INTO `student` VALUES ('6e40c26c-69a3-4d89-a58f-61510e412e5e', '201624164482', '学生18', '15644895670', './image/default.png', '98765483@qq.com', '', '', '', '男', '201624164482', '1');
INSERT INTO `student` VALUES ('dcd762b6-3e0d-4102-b14d-8b1d235d6acd', '201624164483', '学生19', '15644895671', './image/default.png', '98765484@qq.com', '', '', '', '女', '201624164483', '1');
INSERT INTO `student` VALUES ('96615ee0-b9e5-403c-966f-7194c221ae51', '201324164456', '关羽', '13566441123', './image/default.png', '265465654@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201324164456', '1');
INSERT INTO `student` VALUES ('435f9465-86ff-4275-a4a4-3451d85cbe75', '201324164457', '项羽', '13577994561', './image/default.png', '213654665@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201324164457', '1');
INSERT INTO `student` VALUES ('1a729602-f59b-4352-9890-33319588ab0e', '201324164458', '诸葛亮', '14533665555', './image/default.png', '6546522313@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201324164458', '1');
INSERT INTO `student` VALUES ('b1179fce-9659-48de-b0ae-cb4822b2d4d8', '201324164459', '曹操', '16855664422', './image/default.png', '987421332@163.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201324164459', '1');
INSERT INTO `student` VALUES ('9075be5c-ada0-4877-a85a-fe6ebe519880', '201324164460', '许露娜', '18799645523', './image/default.png', '6456546656@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201324164460', '1');
INSERT INTO `student` VALUES ('c35c8b58-36be-4e8a-b18c-219a15956951', '201324164461', '黄贯中', '13645845699', './image/default.png', '654652132@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201324164461', '1');
INSERT INTO `student` VALUES ('97f66fdc-c4dd-450c-8546-b56c7dc0feab', '201324164462', '邓紫棋', '16644855954', './image/default.png', '453534623@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201324164462', '1');
INSERT INTO `student` VALUES ('e95bf657-e383-4e9a-a6b3-dacff3297091', '201324164463', '黄骊山', '18475623356', './image/default.png', '98776562@163.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201324164463', '1');
INSERT INTO `student` VALUES ('9a760c47-160e-4704-a70e-e90d1b84a711', '201324164464', '李白', '15644895652', './image/default.png', '98765465@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201324164464', '1');
INSERT INTO `student` VALUES ('ab737100-c0f1-4825-9dfb-b11dfc68eb41', '201624164465', '学生1', '15644895653', './image/default.png', '98765466@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201624164465', '1');
INSERT INTO `student` VALUES ('5b18c1ad-cf1a-47a2-b1ff-e1bc15467cb7', '201624164466', '学生2', '15644895654', './image/default.png', '98765467@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201624164466', '1');
INSERT INTO `student` VALUES ('fbb75d1e-5e8a-4d76-bc95-e2c699423ebe', '201624164467', '学生3', '15644895655', './image/default.png', '98765468@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201624164467', '1');
INSERT INTO `student` VALUES ('79bdafe3-d43d-47c0-b245-5c9232591bce', '201624164468', '学生4', '15644895656', './image/default.png', '98765469@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201624164468', '1');
INSERT INTO `student` VALUES ('75cb1039-7dc2-495f-a1ea-b76c145ccf09', '201624164469', '学生5', '15644895657', './image/default.png', '98765470@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201624164469', '1');
INSERT INTO `student` VALUES ('1520aeee-2183-4644-9ecf-aeccc499415c', '201624164470', '学生6', '15644895658', './image/default.png', '98765471@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201624164470', '1');
INSERT INTO `student` VALUES ('63b55ef4-7f41-4925-8f1a-323613607066', '201624164471', '学生7', '15644895659', './image/default.png', '98765472@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201624164471', '1');
INSERT INTO `student` VALUES ('aba890e1-1a18-4894-a83d-a4c340b5c821', '201624164472', '学生8', '15644895660', './image/default.png', '98765473@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201624164472', '1');
INSERT INTO `student` VALUES ('20c7f52a-ca08-4d70-9929-a599e516b68e', '201624164473', '学生9', '15644895661', './image/default.png', '98765474@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201624164473', '1');
INSERT INTO `student` VALUES ('6648c682-c428-420e-b814-bf0c2675aaae', '201624164474', '学生10', '15644895662', './image/default.png', '98765475@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201624164474', '1');
INSERT INTO `student` VALUES ('2894ae86-e900-4189-97ae-84d3cf8fc209', '201624164475', '学生11', '15644895663', './image/default.png', '98765476@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201624164475', '1');
INSERT INTO `student` VALUES ('a8d9ec04-60ca-49ce-adba-686cbf3c9f76', '201624164476', '学生12', '15644895664', './image/default.png', '98765477@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201624164476', '1');
INSERT INTO `student` VALUES ('8757e036-84a0-4232-8b97-cbc6ed37d6e8', '201624164477', '学生13', '15644895665', './image/default.png', '98765478@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201624164477', '1');
INSERT INTO `student` VALUES ('21352e7f-c32b-401e-b0a0-af59e6488311', '201624164478', '学生14', '15644895666', './image/default.png', '98765479@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201624164478', '1');
INSERT INTO `student` VALUES ('cadb395a-60ad-4f2e-a05a-2be27bb208a2', '201624164479', '学生15', '15644895667', './image/default.png', '98765480@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201624164479', '1');
INSERT INTO `student` VALUES ('c9f4c446-76bb-4689-a7a0-a569f9e15abe', '201624164480', '学生16', '15644895668', './image/default.png', '98765481@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201624164480', '1');
INSERT INTO `student` VALUES ('db2d263c-880b-4435-9a7b-760e969e9caa', '201624164481', '学生17', '15644895669', './image/default.png', '98765482@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201624164481', '1');
INSERT INTO `student` VALUES ('6f36c37d-8d53-4342-8615-5b0bcabaa7e5', '201624164482', '学生18', '15644895670', './image/default.png', '98765483@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '男', '201624164482', '1');
INSERT INTO `student` VALUES ('4a7a2d87-64d6-4f9b-946e-1b50d2e91bbe', '201624164483', '学生19', '15644895671', './image/default.png', '98765484@qq.com', '1', '342660ca-b191-4dc2-bf6a-56a7141d18a8', 'c52631fc-e923-4485-ac48-a12ecb9e0786', '女', '201624164483', '1');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` varchar(50) NOT NULL,
  `t_no` varchar(20) DEFAULT NULL,
  `t_name` varchar(10) DEFAULT NULL,
  `t_tell` varchar(15) DEFAULT NULL,
  `t_picture` varchar(255) DEFAULT NULL,
  `t_mail` varchar(20) DEFAULT NULL,
  `t_degree` varchar(20) DEFAULT NULL,
  `t_expression` varchar(255) DEFAULT NULL,
  `institute_no` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `status` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('10b7ec1a-efc6-423d-b5a8-a3d06fdfde51', '201224131110', '伊鲁卡', '13566448421', '../teacherPic/1492406044390.jpg', '641324655@163.com', '3', '我是博士，毕业于肇庆学院，5年工作经验', '1', '201224131110', '1');
INSERT INTO `teacher` VALUES ('3f63185e-b6ce-4c84-ab10-6e4555345f86', '203326465412', '卡卡西', '13547786654', '../teacherPic/1492405834527.jpg', '34654132@qq.com', '1', '一个神秘的老师，爱神的箭法兰克伺服电机', '1', '203326465412', '0');
INSERT INTO `teacher` VALUES ('74d215ec-18d6-419c-8ac5-5a2b730a5c13', '201445554452', '夏冬', '13564778922', '../teacherPic/1492532999929.jpg', '98465132@11.com', '5', '我最亲爱的，你过得怎么样，让我亲一亲，像过去一样', '1', '201445554452', '1');
INSERT INTO `teacher` VALUES ('792438de-3796-4f6d-b8d6-86e10e0106da', '201224131112', '陈龙', '13645466231', '../teacherPic/1492420388867.jpg', '12341234@qq.com', '6', '我是学士，毕业于肇庆学院，7年工作经验', '1', '201224131112', '1');
INSERT INTO `teacher` VALUES ('931d09cf-c35e-402c-8def-87ae240d9564', '201155447789', '萧敬腾', '13624455669', '../teacherPic/1492568430289.jpg', '3123456465', '5', '茪是的发送到发送到大方公开', '1', '201155447789', '1');
INSERT INTO `teacher` VALUES ('968160a2-3ecf-4006-8aa8-a2523990ec09', '2132456633214', '梁士大', '13045577894', '../teacherPic/1492568299705.jpg', '9431323@qq.com', '2', '欧迪芬较为料未来的是达芬奇未确认', '1', '2132456633214', '1');
INSERT INTO `teacher` VALUES ('ac2d21a9-1563-45ee-bfb0-79e114cc9599', '201224131118', '李逵', '123412341234', '../teacherPic/1492420490202.jpg', '4879879546@qq.com', '5', '我是研究生，毕业于肇庆学院，13年工作经验', '1', '201224131118', '1');
INSERT INTO `teacher` VALUES ('b698f8da-7c2a-44f3-b011-c710b52f5212', '203311123211', 'Tom', '13046546565', '../teacherPic/1492442685147.jpg', '987954665@qq.com', '5', '傲视的激发了斯柯达', '10', '203311123211', '1');
INSERT INTO `teacher` VALUES ('b866052a-329a-45a3-b19f-bf958f471827', '201224131114', '卓青梅', '13665548954', '../teacherPic/1492420544190.jpg', '12341234@163.com', '3', '我是博士，毕业于肇庆学院，9年工作经验', '1', '201224131114', '1');
INSERT INTO `teacher` VALUES ('df4846ce-f675-4dbc-9ac4-7f13280355a4', '201355488794', '张慧梅', '15566423211', '../teacherPic/1492532999929.jpg', '9874651332@163.com', '2', '喜欢唱歌，喜欢旅游。毕业于北京大学，所学专业为电子工业。', '2', '201355488794', '1');
INSERT INTO `teacher` VALUES ('e31efb61-342c-4be4-a13c-b3e8ac67a42f', '201224131115', '卓别林', '12312312312', '../teacherPic/1492420618483.jpg', '1234123434@qq.com', '1', '我是教授，毕业于肇庆学院，10年工作经验', '1', '201224131115', '1');
INSERT INTO `teacher` VALUES ('e469a9e8-7181-49c4-8743-c985776c251c', '201224131113', '关东煮', '1365422124', '../teacherPic/1492420667273.jpg', '65432133@qq.com', '5', '我是研究生，毕业于肇庆学院，8年工作经验', '1', '201224131113', '1');
INSERT INTO `teacher` VALUES ('f06405d0-e98f-4625-b9d5-22f25aec73a2', '201224131111', '张婕', '13545634563', '../teacherPic/1492533311241.jpeg', '46513298@163.com', '2', '我是副教授，毕业于肇庆学院，6年工作经验', '1', '201224131111', '1');
