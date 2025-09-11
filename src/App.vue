<template>
    <div class="app-container">
        <nav class="main-nav">
            <router-link to="/">トップページ</router-link>
            <router-link to="/profile">プロフィール</router-link>
            <router-link to="/schedule">スケジュール</router-link>
            <router-link to="/letter">おたより</router-link>
            <router-link to="/links">サイトリンク</router-link>
        </nav>
        <router-view />
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.app-container {
    background: #fff0f5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}
.main-nav {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}
.main-nav a {
    background: #ff69b4;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    cursor: pointer;
    text-decoration: none;
}
.main-nav a.router-link-exact-active {
    background: #ff1493;
}
</style>
