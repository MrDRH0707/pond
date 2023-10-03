/**
* 自定义底部切换
*/
<template>
	<view class="footer">
		<view v-for="(item,i) in tabList" :key="i" @click="changTab(item.link)">
			<image :src="index == i?item.img_active:item.img"></image>
			<!-- <p>{{item.name}}</p> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: ['index'],
		data() {
			return {
				tabList: [{
						img: require('@/static/images/home.png'),
						img_active: require('@/static/images/home_acitve.png'),
						link: '/pages/homepage/homepage'
					},
					{
						img: require('@/static/images/shares.png'),
						img_active: require('@/static/images/shares_active.png'),
						link: '/pages/shares/shares'
					},
					{
						img: require('@/static/images/starred.png'),
						img_active: require('@/static/images/starred_active.png'),
						link: '/pages/starred/starred'
					},
					{
						img: require('@/static/images/account.png'),
						img_active: require('@/static/images/account_active.png'),
						link: '/pages/account/account'
					},
				],
			}
		},
		methods: {
			// 切换tab栏
			changTab(url) {
				uni.switchTab({
					url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.footer {
		width: 100%;
		padding: 5px 0 1px;
		border-top: 1px solid rgba(0, 0, 0, 0.19);
		z-index: 99;
		display: flex;
		justify-content: space-around;
		align-items: center;

		view {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 24px;
				height: 24px;
				margin-bottom: 3px;
			}

			p {
				font-size: 12px;
				color: rgb(122, 126, 131);
			}
		}
	}
</style>