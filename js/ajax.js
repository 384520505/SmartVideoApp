// 网络请求

function AjaxObj() {
	// get AccessToken
	const getAccessToken = () => {
		return new Promise((resolve, reject) => {
			mui.ajax(TokenUrl, {
				data: {
					appKey,
					appSecret
				},
				type: 'post',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					const {
						code,
						msg,
						data
					} = res;
					console.log(msg);
					if (code !== '200') {
						reject(msg);
						return;
					} else {
						resolve(data);
						return;
					}
				},
				error: (xhr, type, errorThrown) => {
					reject(type);
				}
			})
		});
	}

	// 停止云台控制
	/* 操作命令：direction
		0-上，
		1-下，
		2-左，
		3-右，
		4-左上，
		5-左下，
		6-右上，
		7-右下，
		8-放大，
		9-缩小，
		10-近焦距，
		11-远焦距
	*/
	const stopContral = (direction) => {
		return new Promise((resolve, reject) => {
			mui.ajax(stopContralUrl, {
				data: {
					accessToken: 'ra.88wr954j5uzbayfa92yl0kmt52vlay5c-9nz3j8sxso-0a34iia-twmj4b6nk',
					deviceSerial: 'G39444019',
					channelNo: 1,
					direction,
				},
				type: 'post',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					const {
						code,
						msg
					} = res;
					if (code === '200') {
						resolve(msg)
						console.log(msg)
					}

				},
				error: (xhr, type, errorThrown) => {
					reject(type);
				}
			});
		});
	}

	// 开始云台控制
	/* 操作命令：direction
		0-上，
		1-下，
		2-左，
		3-右，
		4-左上，
		5-左下，
		6-右上，
		7-右下，
		8-放大，
		9-缩小，
		10-近焦距，
		11-远焦距
	*/
	const startContral = (direction, speed) => {
		return new Promise((resolve, reject) => {
			mui.ajax(startContralUrl, {
				data: {
					accessToken: 'ra.88wr954j5uzbayfa92yl0kmt52vlay5c-9nz3j8sxso-0a34iia-twmj4b6nk',
					deviceSerial: 'G39444019',
					channelNo: 1,
					direction,
					speed,
				},
				type: 'post',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				success: (res) => {
					const {
						code,
						msg
					} = res;
					if (code === '200') {
						resolve(msg)
						console.log(msg)
					}

				},
				error: (xhr, type, errorThrown) => {
					reject(type);
				}
			});
		});
	}

	return {
		getAccessToken,
		stopContral,
		startContral
	}
}
