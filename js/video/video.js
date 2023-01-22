const App = new Vue({
	el: '#app',
	data() {
		return {
			app: 'smartVideo',
			accessToken: '',
			player: '',

		}
	},
	mounted() {
		mui.plusReady(async () => {

			const {
				printLog,
				writeFile,
				getNetStaus,
				initPage,
				initVideo,
				imgToggle
			} = Tools();

			mui.init({});

			// 获取网络状态
			const net = getNetStaus();
			// 根据网络显示对应的图标
			if(net === 'no'){
				imgToggle('net', '../static/img/no-net.png');
			}
			// 设置HD图标
			this.setHD();
			

			// 初始化视频
			this.player = await initVideo();

			initPage('pages/setting.html', 'setting');

			window.addEventListener('videoQuality', event => {
				console.log(event.detail.quality)
				if(event.detail.quality){
					imgToggle('HD', '../static/img/hd-on.png');
					printLog({text:'HD显示！'});
				} else{
					imgToggle('HD', '../static/img/hd-off.png');
					printLog({text:'取消HD显示！'});
				}
				let loading = plus.nativeUI.showWaiting()
				this.player.changePlayUrl({
						type: 'live',
						deviceSerial: 'G39444019',
						channelNo: 1,
						hd: event.detail.quality,
					})
					.then(() => {
						console.log("切换成功")
						loading.close()
						loading = null;
					});
				return;

			})
		})
	},
	// 监听器
	watch: {

	},
	methods: {

		
		// 根据视频质量显示图标
		setHD:async ()=>{
			const { readFile, imgToggle, printLog } = Tools();
			const quality = await readFile()
				.then(res => {
					const { quality } = JSON.parse(res);
					return quality;
				})
				.catch(err => {
					console.log(err)
					return 'false'; //视频画质默认为标清
				})
			if (quality === 'true'){
				imgToggle('HD', '../static/img/hd-on.png');
				printLog({text:'HD显示！'});
			}
		},
		setting() {
			let settingPage = plus.webview.getWebviewById('setting')
			settingPage.show();
			let curPage = plus.webview.currentWebview();
			curPage.setStyle({
				mask: "rgba(0,0,0,0.5)",
			})
			curPage.addEventListener('maskClick', function() {
				settingPage.hide();
				curPage.setStyle({
					mask: 'none'
				});
			}, false);
		}
	},

})
