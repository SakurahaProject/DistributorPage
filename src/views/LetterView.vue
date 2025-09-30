<!-- Letter.vue -->
<template>
    <div class="letter-page">
        <h2 class="title">おたよりを送る📮</h2>
        <form @submit.prevent="submitLetter">
            <div class="form-group">
                <label for="name">お名前</label>
                <input v-model="form.name" id="name" type="text" required />
            </div>
            <div class="form-group">
                <label for="message">メッセージ</label>
                <textarea v-model="form.message" id="message" rows="5" required></textarea>
            </div>
            <button type="submit">送信する</button>
        </form>

        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            form: {
                name: '',
                message: '',
            },
            successMessage: '',
            errorMessage: '',
        };
    },
    methods: {
        async submitLetter() {
            this.successMessage = '';
            this.errorMessage = '';
            try {
                await axios.post('https://api.sakurahaarisu.net/v1/message', this.form);
                this.successMessage = 'おたよりを送信しました！ありがとうございます💕';
                this.form.name = '';
                this.form.message = '';
            } catch (error) {
                console.error('送信エラー:', error);
                this.errorMessage = '送信に失敗しました。入力内容をご確認ください。';
            }
        },
    },
});
</script>

<style scoped>
.letter-page {
    background: #fff;
    border-radius: 25px;
    padding: 20px;
    width: 95%;
    max-width: 400px;
    box-shadow: 0 5px 20px rgba(255, 105, 180, 0.3);
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
}
.title {
    color: #ff1493;
    text-align: center;
    margin-bottom: 20px;
}
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}
label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #ff69b4;
}
input,
textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 2px solid #ffb6c1;
    border-radius: 8px;
    font-size: 14px;
}
button {
    width: 100%;
    padding: 10px;
    background: #ff69b4;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.2s;
}
button:hover {
    background: #ff1493;
}
.success {
    color: green;
    margin-top: 15px;
    font-weight: bold;
    text-align: center;
}
.error {
    color: red;
    margin-top: 15px;
    font-weight: bold;
    text-align: center;
}
</style>
