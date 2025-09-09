<template>
    <div class="links-page">
        <dl v-if="!loading">
            <div v-for="link in links" :key="link.url" class="link-item">
                <dt>{{ link.site }}</dt>
                <dd>
                    <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.url }}</a>
                </dd>
            </div>
        </dl>
        <p v-else class="loading">読み込み中...</p>
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
            const res = await axios.get('/link');
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
    text-align: left;
    background: #fff;
    border-radius: 25px;
    padding: 20px;
    width: 95%;
    max-width: 400px;
    box-shadow: 0 5px 20px rgba(255, 105, 180, 0.3);
}
dl {
    margin: 0;
}
dt {
    font-weight: bold;
    color: #fff;
    background: #ff69b4;
    display: inline-block;
    padding: 6px 12px;
    border-radius: 12px;
    margin-top: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
dd {
    margin: 6px 0 15px 0;
    padding-left: 10px;
    color: #333;
    border-left: 3px solid #ffb6c1;
}
a {
    color: #ff69b4;
    text-decoration: none;
    transition: 0.2s;
}
a:hover {
    color: #ff1493;
}
.loading {
    text-align: center;
    color: #ff1493;
}
</style>
