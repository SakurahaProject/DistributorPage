<!-- Links.vue -->
<template>
    <div class="links-page">
        <h2 class="title">関連リンク🔗</h2>
        <div v-if="loading" class="loading">読み込み中...</div>
        <ul v-else class="links-list">
            <li v-for="link in links" :key="link.url">
                <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.site }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            links: [],
            loading: true,
        };
    },
    async mounted() {
        try {
            const res = await axios.get('/api/v1/link');
            this.links = res.data;
        } catch (e) {
            console.error('リンク取得エラー', e);
        } finally {
            this.loading = false;
        }
    },
};
</script>

<style scoped>
.links-page {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    text-align: center;
}
.title {
    color: #ff1493;
    margin-bottom: 20px;
}
.links-list {
    list-style: none;
    padding: 0;
}
.links-list li {
    margin-bottom: 10px;
}
.links-list a {
    color: #ff69b4;
    text-decoration: none;
    font-weight: bold;
    transition: 0.2s;
}
.links-list a:hover {
    color: #ff1493;
}
.loading {
    color: #ff1493;
    text-align: center;
}
</style>
