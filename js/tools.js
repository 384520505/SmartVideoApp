function Tools() {
	// 日志打印
	/*
	日志等级 ：level: device, error, message, 
	device:橙色字体， class:log-device
	error:红色字体，class:log-error
	message:白色字体，class:log-message
	*/
	const printLog = (obj)=>{
		let { level, text } = obj;
		level = level || 'message';
		const log = document.getElementById('log');
		const span = document.createElement('span');
		span.innerText = `->${text}`;
		switch (level){
			case 'device':
				span.setAttribute('class', 'log-device');
				break;
			case 'error':
				span.setAttribute('class', 'log-error');
				break;
			case 'message':
				span.setAttribute('class', 'log-message');
				break;
			default:
				break;
		}
		if(!span) return;
		log.appendChild(span);
		log.scrollTop = log.scrollHeight;
	}
	
	// 获取网络状态
	const getNetStaus = () => {
		const netType = plus.networkinfo.getCurrentType();
		let net = null;
		if (netType === plus.networkinfo.CONNECTION_NONE) {
			net = 'no net';
			mui.toast("无网络连接！", {
				duration: 1500,
				type: "div"
			})
		} else if (netType === plus.networkinfo.CONNECTION_CELL2G || netType === plus.networkinfo
			.CONNECTION_CELL3G) {
			net = '3G';
			mui.toast("当前网络状态较差！", {
				duration: 1500,
				type: "div"
			})
		} else {
			net = 'net is connected';
			mui.toast("网络状态良好！", {
				duration: 1500,
				type: "div"
			})
		}
		printLog({level:'device', text:net});
		return net;
	};
	
	// 图标切换器
	const imgToggle = (id, newImgUrl)=>{
		const el = document.getElementById(id);
		el.setAttribute('src',newImgUrl);
		return;
	};

	// 初始化页面
	const initPage = (url, id) => {
		let SidePage = mui.preload({
			url,
			id,
			styles:{
				right: '0',
				width: "40%",
			},
			show: {
				autoShow: false,
				aniShow: "slide-in-right",
			},
			waiting: {
				autoShow: false,
			}
		});
	}



	// 判断文件是否存在
	const isExist = (url) => {
		return new Promise((resolve, reject) => {
			plus.io.resolveLocalFileSystemURL(url, fileEntry => {
				resolve(true)
			}, err => {
				resolve(false)
			});
		});
	}

	// 写文件
	const writeFile = (data) => {
		return new Promise((resolve, reject) => {
			plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
				fs.root.getFile('setting.json', {
					create: true
				}, fileEntry => {
					// 写文件
					fileEntry.createWriter(writer => {
						writer.write(JSON.stringify(data))
						resolve('写入成功')
					}, error => {
						console.log(error.message)
						resolve('写入失败')
					})
				})
			}, (err) => {
				console.log(err.message);
				reject('获取文件系统失败');
			})
		})
	};

	// 读取文件
	const readFile = () => {
		return new Promise((resolve, reject) => {
			plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
				// 获取文件
				fs.root.getFile('setting.json', {
					create: true
				}, (fileEntry) => {
					fileEntry.file((file) => {
						console.log(JSON.stringify(file))
						const fileReader = new plus.io.FileReader();
						fileReader.readAsText(file, 'utf-8');
						fileReader.onloadend = event => {
							console.log(event.target.result);
							resolve(JSON.parse(event.target.result))
						}
					}, (error) => {
						reject('获取文件失败')
					});
				}, (error) => {
					reject('获取文件系统失败')
				})
			})
		})
	};

	// 更新内容内容到文件中
	const updateContentToFile = (obj, value) => {
		return new Promise(async (resolve, reject) => {
			const data = await readFile();
			const oldcontent = JSON.parse(data);
			console.log(oldcontent.quality);
			// 更新内容到文件
			oldcontent[obj] = value;
			console.log(oldcontent[obj])
			const msg = await writeFile(JSON.stringify(oldcontent));
			resolve(msg);
		})
	};

	// 初始化开关状态
	const initSwitchStatus = () => {
		readFile()
			.then(res => {
				const { quality, openBluetooth } = JSON.parse(res);
				if (quality === 'true') document.getElementById('quality').classList.add('mui-active')
				if (openBluetooth === 'true') mui("#openBluetooth").switch().toggle();
			})
			.catch(err => {
				console.log(err)
			})
	};
	
	// 初始化视频
	const initVideo = async ()=>{
		const width = document.documentElement.clientWidth;
		const height = document.documentElement.clientHeight;
		let url = VideoUrl;
		let player = null;
		
		// 获取视频的token
		// const { getAccessToken }  = AjaxObj();
		// const { accessToken } = await getAccessToken;
		// const Token = accessToken;
		
		// 读取视频画质
		const quality = await readFile()
			.then(res => {
				const { quality } = JSON.parse(res);
				return quality;
			})
			.catch(err => {
				console.log(err)
				return 'false'; //视频画质默认为标清
			})
		console.log(quality);
		if (quality === 'true'){
			url = VideoUrlHD;
		}
		player = new EZUIKit.EZUIKitPlayer({
			autoplay: true, // 默认播放
			id: "ezvizvideo",
			accessToken:'ra.5ad366gj0rhftupybfswuxkl05at60dc-709mw1t2bu-1hbsqpw-dxabhgcpk',
			url:'ezopen://open.ys7.com/G39444019/1.live',
			template: "simple",
			width,
			height,
			handleSuccess: (e) => {
				printLog({ text:'视频初始化成功！'})
			}
		});
		return player;
	};
	
	

	return {
		printLog,
		getNetStaus,
		initPage,
		isExist,
		writeFile,
		readFile,
		updateContentToFile,
		initSwitchStatus,
		initVideo,
		imgToggle
	};
}
