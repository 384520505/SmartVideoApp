;
(function(global, factory) {
	if (typeof define === 'function' && define.amd) {
		// 如果使用AMD规范定义模块
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		// 如果在Node环境中
		module.exports = factory();
	} else {
		// 在浏览器环境中（global 为 window）
		global.FileCRUD = factory();
	}
}(typeof self !== 'undefined' ? self : this, ()=>{
	'use strict'

	// 判断是否为对象类型数据
	var isObj = function(obj) {
		if (typeof obj !== 'object' && obj !== 'undefined') throw new Error('data type failed');
	};

	/**
	 * obj: 
	 * 	type:type指定获取文件系统的类型,
	 * 	return 
	 */
	var FileCRUD = function(obj) {
		isObj(obj);
		const {
			type,
			fileName,
		} = obj || {};
		this.type = type || plus.io.PRIVATE_DOC;
		if(!fileName) throw new Error('fileName is undefined');
		this.fileName = fileName;
		
		this.fileSystem = null;
		this.fileEntry = null;
		this.init(this.type, this.fileName);
	};

	FileCRUD.prototype = {
		// 初始化FileCRUD对象
		// 返回fileSystem对象
		init: (type, fileName) => {
			const { createFile } = this;
			// 获取本地文件系统对象
			plus.io.requestFileSystem(type, (fileSystem) => {
				this.fileSystem = fileSystem;
				fileSystem.root.getFile(fileName, {
					create: true,
					exclusive: false
				}, (fileEntry) => {
					this.fileEntry = fileEntry;
					console.log(fileName + ' is created');
				}, (error) => {
					throw new Error(fileName + ' create fail '+JSON.stringify(error));
				});
			}, (error) => {
				console.log('get fileSystem failed ' + error);
				throw new Error('get fileSystem failed ' + JSON.stringify(error));
			})
		},
		// 判断指定文件是否存在
		/**
		 * url: file url
		 * return { code, msg }
		 * code: 1:成功， 0:失败
		 */
		isFileExist: (url) => {
			return new Promise((resolve, reject) => {
				plus.io.resolveLocalFileSystemURL(url, () => {
					resolve({
						code: 1,
						msg: `${url} is exist`
					});
				}, error => {
					reject(error);
					throw new Error(url + ' is not exist ' + JSON.stringify(error));
				})
			});
		},
		//创建文件
		createFile: (fileName) => {
			console.log(this.fileSystem)
			return new Promise((resolve, reject) => {
				this.fileSystem.root.getFile(fileName, {
					create: true,
					exclusive: false
				}, (fileEntry) => {
					this.fileEntry = fileEntry;
					resolve(fileEntry);
				}, (error) => {
					reject(error);
					throw new Error(fileName + ' create fail '+JSON.stringify(error));
				});
			});
		},
		// 向文件中写内容
		// text:为json对象
		writeConToFile: (text) => {
			const fileEntry = this.fileEntry;
			if (!fileEntry) throw new Error('fileEntry is undefined');
			if (!text) text = {};
			return new Promise((resolve, reject) => {
				fileEntry.createWriter((writer) => {
					writer.write(JSON.stringify(text));
					writer.onwrite = () => {
						resolve({
							code: 1,
							msg: 'write success'
						});
					};
					writer.onerror = (error) => {
						reject(error);
						throw new Error('write file fail '+JSON.stringify(error));
					};
				}, error => {
					reject(error);
					throw new Error('write file fail '+JSON.stringify(error));
				});
			});
		},
		// 读取文件内容
		// 读取的内容以json对象返回
		// measure: undefined:all data; key: value;
		readConOfFile: (measure) => {
			const fileEntry = this.fileEntry;
			if (!fileEntry) throw new Error('fileEntry is undefined');
			return new Promise((resolve, reject) => {
				fileEntry.file(file => {
					const reader = new plus.io.FileReader();
					reader.readAsText(file, 'utf-8');
					reader.onloadend = (evt) => {
						const {
							result
						} = evt.target;
						let data = JSON.parse(result);
						if(!measure) resolve(data);
						else{
							let lData = {};
							measure.map(item=>{
								lData[item] = data[item] || undefined;
							});
							resolve(lData);
						}
						
					};
					reader.onerror = error => {
						reject(error);
						throw new Error('read file fail '+ JSON.stringify(error));
					}
				}, error => {
					reject(error);
					throw new Error('get file fail '+JSON.stringify(error));
				});
			});
		},
		// 修改文件内容
		updataConToFile:(obj)=>{
			return new Promise(async (resolve, reject)=>{
				// 读取旧的内容
				let oldData = await FileCRUD.prototype.readConOfFile();
				let newData = { ...oldData, ...obj };
				const res = await FileCRUD.prototype.writeConToFile(newData);
				const { code } = res;
				if(code) resolve({code:1, msg:'updata success'});
				else{
					reject(res);
					throw new Error('updata fail '+JSON.stringify(res));
				}
			})
		},
		
		// 删除文件内容
		// measure为空，删除所有内容，为['name'],删除name字段
		deletedConToFile:(measure)=>{
			return new Promise(async (resolve, reject)=>{
				// 读取旧的内容
				let oldData = await FileCRUD.prototype.readConOfFile();
				let newData = {};
				if(measure){
					measure.forEach((key,index)=>{
						newData[key] = undefined;
					})
					newData = { ...oldData, ...newData };
				}
				const res = await FileCRUD.prototype.writeConToFile(newData);
				const { code } = res;
				if(code) resolve({code:1, msg:'updata success'});
				else{
					reject(res);
					throw new Error('updata fail '+JSON.stringify(res));
				}
			})
		},

	};

	// 返回插件
	return FileCRUD;
}));
