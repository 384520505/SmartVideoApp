function UsrCloud_Tools() {
	// jssdk初始化
	/**
	 * appKey:需要初始化设备的appKey
	 * appSecret:需要初始化设备的appSecret
	 */
	const initUsrSDK = (appKey, appSecret) => {
		return new Promise((resolve, reject) => {
			window.jssdk.init({
				appKey,
				appSecret
			}).then(res => {
				console.log("init complete");
				resolve({
					code: 200,
					msg: 'init SDK success'
				});
			}).catch(error => {
				//初始化失败后会执行
				console.log("error:" + error);
				reject(error);
			});
		})
	};

	// 监听设备透传数据
	/**
	 * deviceNos为数组类型，具体参考有人云二次开发文档 http://cloud.usr.cn/document/623.html
	 */
	const listenDataOfDevice = (deviceNos, callback) => {
		const name = 't';//具体参考有人云二次开发文档 http://cloud.usr.cn/document/623.html
		window.jssdk.addListener(name, {
				'deviceNos': deviceNos,
			},
			(deviceNo, data) => {
				var string = new TextDecoder('utf-8').decode(data);
				console.log(string);
				callback({ code:200, data:string });
			});

	};
	
	// 监听设备电量
	/**
	 * deviceNos为数组类型，具体参考有人云二次开发文档 http://cloud.usr.cn/document/623.html
	 */
	const listenBattery = (deviceNos, callback)=>{
		const name ='qqE';
		window.jssdk.addListener(name, {
				'deviceNos': deviceNos,
			},
			(deviceNo, data) => {
				console.log(JSON.stringify(data));
				
				callback({ data });
			});
	};
	
	// 监听设备网络状态
	const listenNetStatus = (deviceNos, callback)=>{
		const name = 'qn';
		window.jssdk.addListener(name, {
				'deviceNos': deviceNos,
			},
			(deviceNo, data) => {
				console.log(JSON.stringify(data));
				
				callback({ data });
			});
	};
	
	// 发送数据到设备上
	/**
	 * deviceNo：设备编号，
	 * data：string类型，需要发送的数据
	 */
	const sendDataToDevice = (deviceNo, data) => {
		window.jssdk.tSend(deviceNo, data);
	};
	
	// 查询设备电量
	const quertDeviceBattery = (deviceNo)=>{
		window.jssdk.qdEQuery(deviceNo);
	};
	
	// 查询网络状态
	const quertNetStatus = (deviceNo)=>{
		window.jssdk.qnQuery(deviceNo);
	}

	return {
		initUsrSDK,
		listenDataOfDevice,
		listenBattery,
		listenNetStatus,
		sendDataToDevice,
		quertDeviceBattery,
		quertNetStatus
	}
};
