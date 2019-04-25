# -*- coding: utf-8 -*- 
import os
import sys
import string 
import time
import json
from xml.dom.minidom import parse
import xml.dom.minidom
import shutil

## 根据当前时间戳获取版本号
def getVersionByTime():
	return time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
	
## 修改文件函数
def modifyFile(mFile, mKey, mContent):
	with open("./" + mFile, "r") as f:
		lines = f.readlines() 
	# 开始替换	
	with open("./" + mFile, "w") as f_w:
		for line in lines:
			if mKey in line:
				line = mContent
			f_w.write(line)
	print "Modify File" + mFile + "==" + mKey
	
## 修改项目配置文件
def modifyEgretProperties():
	print "Modify egretProperties.json"
	## 读取文件
	with open("./egretProperties.json", "r") as f:
		lines = f.readlines()
	## 将文件内容转成一个字符串
	wholeStr = ""
	for i in lines:
		wholeStr += i
	## 将字符串转换成json对象
	jsonObj = json.loads(wholeStr)
	## 获取版本号
	curr_version = jsonObj["egret_version"]
	if curr_version != "4.0.1":
		print "你的工程版本号为：" + curr_version + ",请使用4.0.1"
	## 删除dragonbones模块
	modules = jsonObj["modules"]
	for j in range(len(modules)):
		if modules[j]["name"] == "dragonbones":
			del modules[j]
			break
	resultStr = json.dumps(jsonObj)
	## 将修改后的配置内容写入文件
	with open("./egretProperties.json", "w") as f_w:	
		f_w.write(resultStr);
	

## 修改PlatformManager.ts文件
def modifyPlatformManager(key):
	print "Modify PlatformManager.ts"
	## 读取文件
	with open("./src" + os.sep + "platform" + os.sep + "PlatformManager.ts", "r") as f:
		lines = f.readlines()
	# 开始修改，将非key渠道的逻辑注释	
	with open("./src" + os.sep + "platform" + os.sep + "PlatformManager.ts", "w") as f_w:
		for line in lines:
			if "//@@_" in line:
				if "//@@_" + key in line:
					continue
				elif "_start" in line:
					line = "/**"
				elif "_end" in line:
					line = "*/"
			f_w.write(line)
	
# 修改PaymentManager.ts文件
def modifyPaymentManager(key):
	print "Modify PaymentManager.ts"
	## 读取文件
	with open("./src" + os.sep + "platform" + os.sep + "PaymentManager.ts", "r") as f:
		lines = f.readlines()
	# 开始修改，将非key渠道的逻辑注释	
	with open("./src" + os.sep + "platform" + os.sep + "PaymentManager.ts", "w") as f_w:
		for line in lines:
			if "//@@_" in line:
				if "//@@_" + key in line:
					continue
				elif "_start" in line:
					line = "/**"
				elif "_end" in line:
					line = "*/"
			f_w.write(line)

## 修改DragonBonesUtil 屏蔽龙骨相关
def modifyDragonFile():
	print "Modify DragonBonesUtil.ts"
	## 读取文件
	with open("./src"+ os.sep +"game"+ os.sep +"util"+ os.sep + "DragonBonesUtil.ts", "r") as f:
		lines = f.readlines()
	# 开始修改，注释
	with open("./src"+ os.sep +"game"+ os.sep +"util"+ os.sep + "DragonBonesUtil.ts", "w") as f_w:
		for line in lines:
			if "//flag_dragon_start" in line:
				line = "/**"
			elif "//flag_dragon_end" in line:
				line = "*/"
			f_w.write(line)

## 修改发布后index 屏蔽无关渠道
def modifyIndexPlatformFile(dir,key):
	print "Modify bin-release/web/"+ dir +"/index.html"
	## 读取文件
	with open("./bin-release" + os.sep + "web" + os.sep + dir + os.sep + "index.html", "r") as f:
		lines = f.readlines()
	# 开始修改，将非key渠道的逻辑注释	
	with open("./bin-release" + os.sep + "web" + os.sep + dir + os.sep + "index.html", "w") as f_w:
		for line in lines:
			if "//indexFlag_"+ key +"_start" in line:
				line = "/**"
			elif "//indexFlag_"+ key +"_end" in line:
				line = "*/"
			f_w.write(line)

## 修改game_config.js 屏蔽龙骨相关
def modifyGameConfigFile():
	print "Modify game_config.js"
	## 读取文件
	with open("./resource"+ os.sep +"script"+ os.sep + "game_config.js", "r") as f:
		lines = f.readlines()
	# 开始修改，注释
	with open("./resource"+ os.sep +"script"+ os.sep + "game_config.js", "w") as f_w:
		for line in lines:
			if "//flag_dragon_start" in line:
				line = "/**"
			elif "//flag_dragon_end" in line:
				line = "*/"
			f_w.write(line)

# 修改index.html
def modifyIndexPage(key, pId):
	print "Modify index.html"
	## 读取文件
	with open("./bin-release" + os.sep + "web" + os.sep + key + os.sep + "index.html", "r") as f:
		lines = f.readlines()
	# 开始修改，将非key渠道的逻辑注释	
	with open("./bin-release" + os.sep + "web" + os.sep + key + os.sep + "index.html", "w") as f_w:
		isDelete = "false"
		for line in lines:
			if "publish_Start" in line:
				isDelete = "true"
			elif "publish_End" in line:
				isDelete = "false"
				
			if isDelete == "true":
				line = ""
				
			if "var isDebug = " in line:
				line = "var isDebug = false;\n"
			if "\"platformId\":" in line:
				line = "\"platformId\":" + pId + "\n";
			f_w.write(line)
			
## 删除index.html中其他渠道内容
def deleteOtherChannlOfIndex(dir, key):
	print "Modify index.html delete other needless code."
	## 读取文件
	with open("./bin-release" + os.sep + "web" + os.sep + dir + os.sep + "index.html", "r") as f:
		lines = f.readlines()
	# 开始修改，将非key渠道的逻辑注释	
	with open("./bin-release" + os.sep + "web" + os.sep + dir + os.sep + "index.html", "w") as f_w:
		isDelete = "false"
		for line in lines:
			if "<!--flag_" in line:
				if "<!--flag_" + key + "_start-->" in line:
					continue
				elif "<!--flag_" + key + "_end-->" in line:
					continue
				elif "_start-->" in line:
					isDelete = "true"
				elif "_end-->" in line:
					isDelete = "false"
			else:
				if isDelete == "true":
					line = ""
			f_w.write(line)

## 修改主题配置文件default.thm.json
def modifyThmJsonFile(key, fileName, prefix):
	print "Modify" + fileName
	## 读取文件
	with open("./bin-release" + os.sep + "web" + os.sep + key + os.sep + "resource" + os.sep + fileName, "r") as f:
		lines = f.readlines()
	# 开始修改，替换目录前缀
	with open("./bin-release" + os.sep + "web" + os.sep + key + os.sep + "resource" + os.sep + fileName, "w") as f_w:
		for line in lines:
			if "\"resource/" in line:
				line = line.replace("\"resource/", "\"" + prefix + key + "/resource/")
			f_w.write(line)

def moveFileto(sourceDir,  targetDir):
	shutil.copyfile(sourceDir,  targetDir)

## 修改T_Change表，删除无用渠道
def modifyTChangeFile(platformId):
	print "Modify T_Charge.ts , Reserve platform:"+ str(platformId)
	## 读取文件
	with open("./src" + os.sep + "game" + os.sep + "data" + os.sep + "T_Charge.ts", "r") as f:
		lines = f.readlines()
	## 开始修改
	checkName = "platform:" + str(platformId) + ",},"
	with open("./src" + os.sep + "game" + os.sep + "data" + os.sep + "T_Charge.ts", "w") as f_w:
		for line in lines:
			if "{id:" in line and not(checkName in line) and ",type:3" in line:
				line = ""
			f_w.write(line)

## 脚本主函数
def run():
	## 解析渠道
	DOMTree = xml.dom.minidom.parse("publishConfig.xml")
	collection = DOMTree.documentElement
	channels = collection.getElementsByTagName("channel")
	channel_dict = {}
	for channel in channels:
		id = channel.getAttribute("id")
		platformId = channel.getElementsByTagName('platformId')[0]
		p_name = channel.getElementsByTagName('name')[0]
		p_addr = channel.getElementsByTagName('LOGIN_ADDR')[0]
		p_desc = channel.getElementsByTagName('description')[0]
		p_reyun = channel.getElementsByTagName('reyunId')[0]
		## [platformId, 渠道名称, 登录服务器地址]
		paramList = [platformId.childNodes[0].data, p_name.childNodes[0].data, p_addr.childNodes[0].data, p_desc.childNodes[0].data, p_reyun.childNodes[0].data]
		channel_dict[id] = paramList
	
	print "-----渠道列表-----"
	print "序号     渠道名称"
	for cha in channel_dict.iterkeys(): 
		tempList = channel_dict[cha]
		print "  " + cha + "      " + tempList[3]
		
	## 渠道
	p_channel = ""
	p_channel = raw_input("请输入要发布的渠道：");
	## 当前所选择的渠道 
	selected_channel = channel_dict[p_channel]
	## 开始修改文件：config.ts
	modifyFile("src" + os.sep + "config.ts", "static DEBUG", "\tstatic DEBUG = false;\n")
	modifyFile("src" + os.sep + "config.ts", "static logAppID", "\tstatic logAppID = \""+ selected_channel[4] +"\";\n")
	modifyFile("src" + os.sep + "config.ts", "static LOGIN_ADDR", "\tstatic LOGIN_ADDR = \"" + selected_channel[2] + "\";\n")
	## modifyFile("src" + os.sep + "config.ts", "static PLATFORM_ID", "\tstatic PLATFORM_ID = " + selected_channel[0] + ";\n")
	if selected_channel[3] == "Combunet_web":
		modifyFile("src" + os.sep + "config.ts", "static IS_WEB", "\tstatic IS_WEB = true;\n")
	## 所有渠道打开音乐
	modifyFile("src" + os.sep + "config.ts", "static isOpenMusic", "\tstatic isOpenMusic = true;\n")
	## 开始修改文件：PlatformManager.ts
	modifyPlatformManager(selected_channel[1])
	## 开始修改文件：PaymentManager.ts
	modifyPaymentManager(selected_channel[1])
	## 开始修改文件 T_Change.ts
	modifyTChangeFile(selected_channel[0])
	## 开始修改文件：egretProperties.json
	if selected_channel[3] != "Combunet_web":
		modifyEgretProperties()
		modifyDragonFile()
		modifyGameConfigFile()
		
	
	## 版本号
	p_version = ""
	p_version = raw_input("请输入版本号(默认为时间戳)：");
	## 发布环境
	p_runtime = "html5"
	##解压密码
	p_password = "ranshao"
	
	if p_version == "":
		p_version = getVersionByTime()
	print "======================================================="
	os.system("egret info")
	print "======================================================="
	print "开始编译..."
	os.system("egret build")
	print "======================================================="
	print "开始发布..."
	os.system("egret publish --version " + p_version + " --runtime " + p_runtime + " --password " + p_password)
	
	## 修改index.html界面
	modifyIndexPage(p_version, selected_channel[0])
	deleteOtherChannlOfIndex(p_version, selected_channel[1])

	## 非web版本 将退出页面提示框屏蔽
	if selected_channel[3] != "Combunet_web":
		deleteOtherChannlOfIndex(p_version, "webalert")
	if selected_channel[3] == "Freedom":
		print "move file ziyouIndex/index.html to web publish"
		os.remove("./bin-release" + os.sep + "web" + os.sep + p_version + os.sep + "index.html")
		moveFileto("./ziyouIndex" + os.sep + "index.html","./bin-release" + os.sep + "web" + os.sep + p_version + os.sep + "index.html");
	
	## 亿玩堂index中相关修改
	if selected_channel[3] == "YiWanTang":
		modifyIndexPlatformFile(p_version,"normal")
	else:
		modifyIndexPlatformFile(p_version,"yiwantang")

	## 修改主题配置文件default.thm.json
	# p_res_prefix = raw_input("请输入要发布的资源目录：");
	# if p_res_prefix != "":
	if selected_channel[3] == "Combunet_web":
		modifyThmJsonFile(p_version, "default.thm.json", "http://res.s1.fishing.combunet.com/combunet/")
		modifyThmJsonFile(p_version, "login.thm.json", "http://res.s1.fishing.combunet.com/combunet/")
	if selected_channel[3] == "Combunet_h5":
		modifyThmJsonFile(p_version, "default.thm.json", "http://res.s1.fishing.combunet.com/combunet/")
		modifyThmJsonFile(p_version, "login.thm.json", "http://res.s1.fishing.combunet.com/combunet/")
	if selected_channel[3] == "YiWanTang":
		modifyThmJsonFile(p_version, "default.thm.json", "http://res.s1.fishing.combunet.com/yiwantang/")
		modifyThmJsonFile(p_version, "login.thm.json", "http://res.s1.fishing.combunet.com/yiwantang/")




## ===========================================================================================================================
## ******* 脚本从此开始运行 ********	
## 判断是否需要更新svn
isSVN = raw_input("是否进行svn更新?(y/n)：");
if isSVN == "y":
	print "删除 egretProperties.json / config.ts / PaymentManager.ts / PlatformManager.ts / DragonBonesUtil.ts ..."
	os.remove("egretProperties.json")
	os.remove("./src" + os.sep + "config.ts")
	os.remove("./src" + os.sep + "platform" + os.sep + "PaymentManager.ts")
	os.remove("./src" + os.sep + "platform" + os.sep + "PlatformManager.ts")
	os.remove("./src" + os.sep + "game" + os.sep + "util" + os.sep + "DragonBonesUtil.ts")
	os.remove("./src" + os.sep + "game" + os.sep + "data" + os.sep + "T_Charge.ts")
	os.remove("./resource" + os.sep + "script" + os.sep + "game_config.js")
	print "======================================================="
	## 更新项目文件
	print "SVN更新项目文件..."
	os.system("svn update")
	
## 开始发布
run()
print "Publish is over."
## 发布结束后恢复配置
##print "Reset project config."

# OVER
os.system('pause')