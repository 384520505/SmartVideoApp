const App = new Vue({
	el: '#app',
	data() {
		return {
			app: 'smartVideo',
			accessToken: '',
			player:'',

		}
	},
	mounted() {
		mui.plusReady(async () => {
			// // 强制app横屏显示
			// plus.screen.lockOrientation("landscape-primary");
			// // 全屏显示，隐藏手机状态栏
			// plus.navigator.setFullscreen(true);
			
			const { writeFile, getNetStaus, initVideo, initPage } = Tools();

			mui.init({});
			
			// 获取网络状态
			getNetStaus();

			// 初始化视频
			// this.player = await initVideo();
			this.initVideo();
			
			initPage('pages/setting.html', 'setting');
			window.addEventListener("orientationchange", function ()
				
			    {
					console.log('屏幕翻转')
					const width = document.documentElement.clientWidth;
					const height = document.documentElement.clientHeight;
					console.log(width)
					console.log(height)
					// if (window.innerWidth < window.innerHeight)
					// {
					// 	// alert('横屏状态!');
					// 	plus.navigator.setFullscreen(true);
					// }
					// else
					// {
					// 	// alert('竖屏状态!');
					// 	plus.navigator.setFullscreen(false);
					// }
			});
			
			window.addEventListener('videoQuality',event=>{
				console.log(event.detail.quality)
				if(event.detail.quality){
					let loading = plus.nativeUI.showWaiting()
					this.player.changePlayUrl({
						type:'live',
						deviceSerial:'G82459505',
						channelNo:1,
						hd:true,
					})
					  .then(()=>{
					    console.log("切换成功")
						loading.close()
						loading = null;
					  });
				}
				return;
				
			})
		})
	},
	// 监听器
	watch:{
		
	},
	methods: {
		
		initVideo(){
			const width = document.documentElement.clientWidth;
			const height = document.documentElement.clientHeight;
			console.log(width)
			console.log(height)
			this.player = new EZUIKit.EZUIKitPlayer({
				autoplay: true, // 默认播放
				id: "ezvizvideo",
				accessToken:'ra.a01quwc35d81agna1eq98w3985dbm0rk-32h9fkk3by-0m42h7i-oygggbobi',
				url:'ezopen://open.ys7.com/G39444019/1.live',
				template: "simple",
				width,
				height,
				handleSuccess: (e) => {}
			});
		},
		
		bluetooth(){
			console.log('bluetooth')
			
		},
		bluetooth1(){
			console.log('bluetooth')
			let loading = plus.nativeUI.showWaiting()
			this.player.changePlayUrl({
				type:'live',
				deviceSerial:'G82459505',
				channelNo:1,
				hd:false,
			})
			  .then(()=>{
			    console.log("切换成功")
				loading.close()
				loading = null;
			  });
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
