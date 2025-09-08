<template>
    <div class="profile">
        <dl>
            <template v-for="item in profile" :key="item.column">
                <dt class="profile-column">{{ item.column }}</dt>
                <dd class="profile-content">
                    <template v-if="Array.isArray(item.content)">
                        <ul>
                            <li v-for="(c, idx) in item.content" :key="idx">{{ c }}</li>
                        </ul>
                    </template>
                    <template v-else>
                        {{ item.content }}
                    </template>
                </dd>
            </template>
        </dl>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            profile: [],
        };
    },
    methods: {
        async fetchProfile() {
            try {
                const response = await axios.get('/api/v1/profile');
                this.profile = response.data;
            } catch (error) {
                console.error('プロフィール取得エラー:', error);
                this.profile = [];
            }
        },
    },
    mounted() {
        this.fetchProfile();
    },
};
</script>

<style scoped>
.profile {
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
ul {
    margin: 5px 0 0 0;
    padding-left: 20px;
    list-style-type: disc;
    color: #555;
}
li {
    margin-bottom: 4px;
}
</style>
